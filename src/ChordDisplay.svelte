<script>
import { onMount } from "svelte";
import { Renderer, Stave, Formatter, Voice } from "vexflow";

import { currentFrequencies } from "./stores/chord-store";
import { chordToStaveNote } from "./frequency-mapping";

let container;
let context;
let stave;

onMount(() => {
    const renderer = new Renderer(container, Renderer.Backends.SVG);

    renderer.resize(500, 500);
    context = renderer.getContext();

    stave = new Stave(10, 40, 400);
    stave.addClef("treble")
    stave.setContext(context).draw();
});

currentFrequencies.subscribe((frequencies) => {
    if (!context || !stave) {
        return;
    }

    // Create the notes
    const notes = [
        chordToStaveNote(frequencies),
        /*
        new StaveNote({
            keys: ['a/5', 'e/5', 'g/5', 'b/5'],
            duration: 'w'
        })
        .addModifier(new Accidental('b'), 0)
        .addModifier(new Accidental('++'), 1)
        .addModifier(new Accidental('#'), 2)
        */
    ];

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 350);

    // Render voice
    voice.draw(context, stave);
});

</script>

<div bind:this={container}></div>