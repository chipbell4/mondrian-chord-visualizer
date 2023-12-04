import App from './App.svelte';
import { Pad } from './synth/Pad';

const app = new App({
    target: document.getElementById("app"),
});

let context = undefined;
let pad;
let noteIsOn = false;

document.addEventListener("click", () => {
    // only create the oscillator the first time through
    if (context === undefined) {
        context = new AudioContext();
        pad = new Pad(context);
    }
    
    if (!noteIsOn) {
        pad.play([220, 220 * 4 / 3, 220 * 3 / 2]);
        noteIsOn = true;
    } else {
        pad.noteOff();
        noteIsOn = false;
    }
    
});


export default app;