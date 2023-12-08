import { Pad } from './Pad';

let context: AudioContext | undefined= undefined;
let pad: Pad | undefined = undefined;
let frequenciesScheduledToPlay: number[] | undefined= undefined;

document.addEventListener("click", () => {
    // only create the oscillator the first time through
    if (context === undefined) {
        context = new AudioContext();
        pad = new Pad(context);
    }
});

function playScheduledFrequencies() {
    if (pad === undefined) {
        console.log("Audio context not set up yet, cannot play anything");
        return;
    }

    if (frequenciesScheduledToPlay === undefined) {
        console.log("No notes scheduled to play");
        return;
    }

    pad.play(frequenciesScheduledToPlay);
    frequenciesScheduledToPlay = undefined;
}

export class NotePlayer {
    currentTimer: number = -1;
    isPlaying: boolean = false;

    scheduleNoteOff() {
        clearTimeout(this.currentTimer);
        this.currentTimer = setTimeout(() => this.stopPlaying(), 1000);
    }

    stopPlaying() {
        pad?.pause();
    }

    play(frequencies: number[]) {
        frequenciesScheduledToPlay = frequencies;
        playScheduledFrequencies();
        this.scheduleNoteOff();
    }

}

export const player = new NotePlayer();