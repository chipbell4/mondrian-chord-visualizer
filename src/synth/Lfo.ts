export class Lfo {
    context: AudioContext;

    oscillator: OscillatorNode;
    gainNode: GainNode;

    constructor(context: AudioContext) {
        this.context = context;

        this.oscillator = new OscillatorNode(this.context, {
            frequency: 1,
            type: "sine",
        });
        this.gainNode = new GainNode(this.context, {
            gain: 500,
        });
        
        this.oscillator.connect(this.gainNode);
        this.oscillator.start(0);
    }

    get frequency(): AudioParam {
        return this.oscillator.frequency;
    }

    get gain(): AudioParam {
        return this.gainNode.gain;
    }

    connect(node: AudioNode | AudioParam) {
        this.gainNode.connect(node);
    }
}