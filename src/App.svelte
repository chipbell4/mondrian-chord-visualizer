<script>
import Divider from "./Divider.svelte";
import { chordToDividerConfig } from "./config_mapping";
import { MAJOR_THIRTEEN } from "./synth/chords";
import { onChordAreaChanged, cacheIsReady, getCache, setListOfLabels } from "./stores/chord-store";
import * as player from "./synth/player";

onChordAreaChanged(() => {
    if (!cacheIsReady()) {
        return;
    }

    const cache = getCache();
    const root = cache.root;
    const otherKeys = Object.keys(cache).filter(key => key !== "root");

    const frequencies = [256];
    for (const toneLabel of otherKeys) {
        const ratio = root / cache[toneLabel];
        frequencies.push(ratio * 256);
    }

    player.play(frequencies);
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