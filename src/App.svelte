<script>
import Divider from "./Divider.svelte";
import { chordToDividerConfig } from "./config_mapping";
import { MAJOR_THIRTEEN, MAJOR_SEVEN } from "./synth/chords";
import { currentChord, currentFrequencies } from "./stores/chord-store";
import * as player from "./synth/player";

const initialConfig = chordToDividerConfig(MAJOR_SEVEN);
currentChord.chordLabels = MAJOR_SEVEN.map(tone => tone.label);

currentFrequencies.subscribe((frequencies) => player.play(frequencies));
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