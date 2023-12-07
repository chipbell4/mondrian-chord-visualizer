<script>
import { onMount } from "svelte";
import { Factory } from "vexflow";

let container;

onMount(() => {
    const vf = new Factory({
        renderer: {
            elementId: "chord-display",
        }
    });

    const score = vf.EasyScore();
    const system = vf.System();

    system.addStave({
        voices: [
            score.voice(score.notes('C#5/q, B4, A4, G#4')),
        ],
    }).addClef("treble");

    vf.draw();
});

</script>

<div bind:this={container} id="chord-display"></div>