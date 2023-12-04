export class Generator {
    context: AudioContext;

    oscillator: OscillatorNode;
    gain: GainNode;

    constructor(context: AudioContext) {
        this.context = context;

        this.oscillator = new OscillatorNode(this.context, {
            frequency: 256,
            type: "square",
        })
        this.gain = new GainNode(this.context, {
            gain: 0.1,
        })

        this.oscillator.connect(this.gain);
        this.gain.connect(this.context.destination);
    }

    set frequency(value: number) {
        this.oscillator.frequency.value = value;
    }

    start() {
        this.oscillator.start(0);
    }
}