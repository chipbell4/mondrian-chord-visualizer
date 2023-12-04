import { Lfo } from "./Lfo";

export class Generator {
    context: AudioContext;

    oscillator: OscillatorNode;
    lfo: Lfo;
    filter: BiquadFilterNode;
    adsrGain: GainNode;
    gain: GainNode;

    constructor(context: AudioContext) {
        this.context = context;

        this.oscillator = new OscillatorNode(this.context, {
            frequency: 256,
            type: "square",
        });
        this.lfo = new Lfo(this.context);
        this.filter = new BiquadFilterNode(this.context, {
            type: "lowpass",
            frequency: 1000,
        });
        this.lfo.connect(this.filter.frequency);
        this.adsrGain = new GainNode(this.context, {
            gain: 0,
        })
        this.gain = new GainNode(this.context, {
            gain: 0.1,
        })

        setInterval(() => {
            console.log("FILTER FREQUENCY:", this.filter.frequency.value);
        }, 500);

        this.oscillator.connect(this.filter);
        this.filter.connect(this.adsrGain);
        this.adsrGain.connect(this.gain);
        this.gain.connect(this.context.destination);

        this.oscillator.start(0);
    }

    noteOn(frequency: number) {
        // Cancel any previous note on
        this.noteOff();

        // Reschedule a fade in
        const ATTACK = 0.75;
        this.adsrGain.gain.linearRampToValueAtTime(1.0, this.context.currentTime + ATTACK);
    }

    noteOff() {
        this.adsrGain.gain.cancelScheduledValues(0);
        this.adsrGain.gain.value = 0;
    }
}