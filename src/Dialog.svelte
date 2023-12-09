<script>
    import { onMount } from "svelte";

    let dialog;

    onMount(() => {
        dialog.showModal();
    })
</script>

<style>
    dialog {
        font-family: Arial, Helvetica, sans-serif;
        max-width: 600px;
    }

    h1 {
        text-align: center;
    }

    form {
        text-align: center;
    }

    ::backdrop {
        backdrop-filter: blur(6px);
    }
</style>

<dialog bind:this={dialog}>
    <h1>Mondrian Chord-Visualizer</h1>
    <p>
        This experiment visualizes microtonal chords using a Piet Mondrian-style generated image.
        On the left is a resizable image (click the black bars!).
        As the image proportions change, the notes in the chord change to reflect the new area of each sub-rectangle.
        On the right, we notate the actual chord being played.
    </p>
    <form method="dialog">
        <button>OK</button>
    </form>
</dialog>