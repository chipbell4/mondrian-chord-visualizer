<script>
import Divider from "./Divider.svelte";

const onRescale = (event) => {
    console.log(event);
};

</script>

<style>
    .container {
        width: 700px;
        height: 700px;
    }
</style>

<main>
    <div class="container">
        <Divider on:rescale={onRescale} />
    </div>
</main>