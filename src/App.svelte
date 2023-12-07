<script>
import Divider from "./Divider.svelte";
import { chordToDividerConfig } from "./config_mapping";
import { MAJOR_THIRTEEN } from "./synth/chords";
import { onChordAreaChanged, cacheIsReady, getCache, setListOfLabels } from "./stores/chord-store";



onChordAreaChanged(() => {
    if (!cacheIsReady()) {
        return;
    }

    console.log("CACHE IS READY:", getCache());
});

const initialConfig = chordToDividerConfig(MAJOR_THIRTEEN);
setListOfLabels(MAJOR_THIRTEEN.map(tone => tone.label));
</script>

<style>
    .container {
        width: 700px;
        height: 700px;
    }
</style>

<main>
    <div class="container">
        <Divider config={initialConfig} />
    </div>
</main>