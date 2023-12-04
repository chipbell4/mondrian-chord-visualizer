import App from './App.svelte';
import { Generator } from './synth/Generator';

const app = new App({
    target: document.getElementById("app"),
});

let context = undefined;
let generator;

document.addEventListener("click", () => {
    // only create the oscillator the first time through
    if (context === undefined) {
        context = new AudioContext();
        generator = new Generator(context);
    }
    
    generator.noteOn(220);
});


export default app;