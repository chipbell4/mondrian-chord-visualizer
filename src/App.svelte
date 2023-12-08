<script>
import Divider from "./Divider.svelte";
import { chordToDividerConfig } from "./config_mapping";
import { MAJOR_THIRTEEN, MAJOR_SEVEN } from "./synth/chords";
import { currentChord, currentFrequencies } from "./stores/chord-store";
import * as player from "./synth/player";
    import ChordDisplay from "./ChordDisplay.svelte";

const initialConfig = chordToDividerConfig(MAJOR_SEVEN);
currentChord.chordLabels = MAJOR_SEVEN.map(tone => tone.label);

currentFrequencies.subscribe((frequencies) => player.play(frequencies));
</script>

<style>
    .container {
        display: flex;
    }

    .chord-display-container {
        flex: 1;
    }

    .divider-container {
        flex: 5;
        aspect-ratio: 1/1;
    }
</style>

<main>
    <div class="container">
        <div class="chord-display-container">
            <ChordDisplay />
        </div>
        <div class="divider-container">
            <Divider config={initialConfig} />
        </div>
    </div>
</main>