<script>
import Divider from "./Divider.svelte";
    import { MONDRIAN_BLUE, MONDRIAN_RED, MONDRIAN_WHITE } from "./colors";
import { HORIZONTAL, VERTICAL } from "./divider_direction";

const onRescale = (event) => {
    console.log(event);
};

const initialConfig = {
    direction: HORIZONTAL,
    first: {
        color: MONDRIAN_BLUE,
        weight: 3,
        children: {
            direction: VERTICAL,
            first: {
                color: MONDRIAN_BLUE,
                weight: 1,
            },
            second: {
                color: MONDRIAN_RED,
                weight: 1,
            }
        }
    },
    second: {
        color: MONDRIAN_WHITE,
        weight: 1,
    }
}

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