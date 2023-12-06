<script>
import Divider from "./Divider.svelte";
import { chordToDividerConfig } from "./config_mapping";
import { MAJOR_THIRTEEN } from "./synth/chords";

const onRescale = (event) => {
    console.log(event.detail);
};

const initialConfig = chordToDividerConfig(MAJOR_THIRTEEN);
</script>

<style>
    .container {
        width: 700px;
        height: 700px;
    }
</style>

<main>
    <div class="container">
        <Divider config={initialConfig} on:rescale={onRescale} />
    </div>
</main>