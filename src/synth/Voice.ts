export interface VoiceConfig {
    detune: number;
    voices: number;
    type: "square" | "sawtooth" | "triangle";
}

export class Voice {
    context: AudioContext;
    config: VoiceConfig;

    oscillators: OscillatorNode[];
    gainNode: GainNode;

    constructor(context: AudioContext, config: VoiceConfig) {
        this.context = context;
        this.config = config;

        this.gainNode = new GainNode(context, {
            gain: 1 / this.config.voices,
        })
        this.oscillators = [];
        for (let i = 0; i < this.config.voices; i++) {
            const oscillator = new OscillatorNode(this.context, {
                frequency: 220,
                type: this.config.type,
            })
            this.oscillators.push(oscillator);
            oscillator.connect(this.gainNode);
            oscillator.start(0);
        }

        this.frequency = 220;
    }

    set frequency(f: number) {
        for (let i = 0; i < this.config.voices; i++) {
            const halfSteps = 2 * this.config.detune * ((i / this.config.voices) - 0.5) / this.config.voices;
            console.log(halfSteps);
            const frequency = f * Math.pow(2, halfSteps / 12);
            this.oscillators[i].frequency.value = frequency;
        }
    }

    get gain(): AudioParam {
        return this.gainNode.gain;
    }

    connect(node: AudioNode) {
        this.gainNode.connect(node);
    }
}