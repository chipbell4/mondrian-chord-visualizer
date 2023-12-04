<script>
import {HORIZONTAL, VERTICAL} from "./divider_direction";
import { MONDRIAN_BLUE, MONDRIAN_RED, MONDRIAN_WHITE, MONDRIAN_YELLOW } from "./colors";
import Divider from "./Divider.svelte";
</script>

<style>
    .container {
        width: 700px;
        height: 700px;
    }
</style>

<main>
    <div class="container">
        <Divider>
            <Divider slot="first" direction={VERTICAL} firstColor={MONDRIAN_WHITE} secondColor={MONDRIAN_YELLOW}
            />
        </Divider>
    </div>
</main>