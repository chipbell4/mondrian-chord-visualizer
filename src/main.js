import App from './App.svelte';
import { Generator } from './synth/Generator';

const app = new App({
    target: document.getElementById("app"),
});

document.addEventListener("click", () => {
    console.log("HELLO!");
    const context = new AudioContext();
    const generator = new Generator(context);
    
    generator.noteOn(220);
});


export default app;