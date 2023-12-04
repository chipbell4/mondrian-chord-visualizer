export class Generator {
    context: AudioContext;

    oscillator: OscillatorNode;
    adsrGain: GainNode;
    gain: GainNode;

    constructor(context: AudioContext) {
        this.context = context;

        this.oscillator = new OscillatorNode(this.context, {
            frequency: 256,
            type: "square",
        })
        this.adsrGain = new GainNode(this.context, {
            gain: 0,
        })
        this.gain = new GainNode(this.context, {
            gain: 0.1,
        })

        this.oscillator.connect(this.adsrGain);
        this.adsrGain.connect(this.gain);
        this.gain.connect(this.context.destination);

        this.oscillator.start(0);
    }

    noteOn(frequency: number) {
        // Cancel any previous note on
        this.adsrGain.gain.cancelScheduledValues(0);
        this.adsrGain.gain.value = 0;

        // Reschedule a fade in
        const ATTACK = 0.75;
        this.adsrGain.gain.linearRampToValueAtTime(1.0, this.context.currentTime + ATTACK);
    }
}