import App from './App.svelte';
import { Generator } from './synth/Generator';

const app = new App({
    target: document.getElementById("app"),
});

let context = undefined;
let generator;
let noteIsOn = false;

document.addEventListener("click", () => {
    // only create the oscillator the first time through
    if (context === undefined) {
        context = new AudioContext();
        generator = new Generator(context);
    }
    
    if (!noteIsOn) {
        generator.noteOn(220);
        noteIsOn = true;
    } else {
        generator.noteOff();
        noteIsOn = false;
    }
    
});


export default app;