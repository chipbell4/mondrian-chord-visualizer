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

    maxGain: number;

    constructor(context: AudioContext, config: VoiceConfig) {
        this.context = context;
        this.config = config;
        this.maxGain = 1 / this.config.voices

        this.gainNode = new GainNode(context, {
            gain: this.maxGain,
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
            const frequency = f * Math.pow(2, halfSteps / 12);
            this.oscillators[i].frequency.value = frequency;
        }
    }

    mute() {
        this.gainNode.gain.value = 0;
    }

    unmute() {
        this.gainNode.gain.value = this.maxGain;
    }

    connect(node: AudioNode) {
        this.gainNode.connect(node);
    }
}