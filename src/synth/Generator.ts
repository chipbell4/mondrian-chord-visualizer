import { Lfo } from "./Lfo";
import { PolyphonicVoice } from "./PolyphonicVoice";

export class Generator {
    context: AudioContext;

    voice: PolyphonicVoice;
    lfo: Lfo;
    filter: BiquadFilterNode;
    adsrGain: GainNode;
    gain: GainNode;

    constructor(context: AudioContext) {
        this.context = context;

        this.voice = new PolyphonicVoice(this.context, {
            polyphony: 10,
            voiceConfig: {
                voices: 8,
                detune: 0.3,
                type: "sawtooth",
            }
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
        });

        this.voice.connect(this.filter);
        this.filter.connect(this.adsrGain);
        this.adsrGain.connect(this.gain);
        this.gain.connect(this.context.destination);
    }

    play(frequencies: number[]) {
        // Cancel any previous note on
        this.pause();

        // set the next notes
        this.voice.frequencies = frequencies;

        // Reschedule a fade in
        const ATTACK = 0.75;
        this.adsrGain.gain.linearRampToValueAtTime(1.0, this.context.currentTime + ATTACK);
    }

    pause() {
        this.adsrGain.gain.cancelScheduledValues(0);
        this.adsrGain.gain.value = 0;
    }
}