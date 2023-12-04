import { Voice, VoiceConfig } from "./Voice";

export interface PolyphonicVoiceConfig {
    polyphony: number;
    voiceConfig: VoiceConfig;
}

export class PolyphonicVoice {
    context: AudioContext;
    config: PolyphonicVoiceConfig;

    voices: Voice[];

    constructor(context: AudioContext, config: PolyphonicVoiceConfig) {
        this.context = context;
        this.config = config;

        this.voices = [];
        for (let i = 0; i < this.config.polyphony; i++) {
            const voice = new Voice(context, this.config.voiceConfig);
            voice.mute();
            this.voices.push(voice);
        }
    }

    set frequencies(frequencies: number[]) {
        for (let i = 0; i < this.voices.length; i++) {
            if (i < frequencies.length) {
                this.voices[i].frequency = frequencies[i];
                this.voices[i].unmute();
            } else {
                this.voices[i].mute();
            }
        }
    }

    connect(node: AudioNode) {
        for (const voice of this.voices) {
            voice.connect(node);
        }
    }
}