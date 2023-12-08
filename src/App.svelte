<script>
import Divider from "./Divider.svelte";
import { chordToDividerConfig } from "./config_mapping";
import { MAJOR_SEVEN } from "./synth/chords";
import { currentChord, currentFrequencies } from "./stores/chord-store";
import { player } from "./synth/player";
import ChordDisplay from "./ChordDisplay.svelte";

const initialConfig = chordToDividerConfig(MAJOR_SEVEN);
currentChord.chordLabels = MAJOR_SEVEN.map(tone => tone.label);

currentFrequencies.subscribe((frequencies) => player.play(frequencies));
</script>

<style>
    .container {
        display: flex;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto
    }

    .chord-display-container {
        padding-left: 2em;
        flex: 1;
    }

    .divider-container {
        flex: 2;
        aspect-ratio: 1/1;
    }
</style>

<main>
    <div class="container">
        <div class="divider-container">
            <Divider config={initialConfig} />
        </div>
        <div class="chord-display-container">
            <ChordDisplay />
        </div>
    </div>
</main>