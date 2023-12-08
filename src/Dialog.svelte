<script>
    import { onMount } from "svelte";

    let dialog;

    onMount(() => {
        dialog.showModal();
    })
</script>

<style>
    ::backdrop {
        backdrop-filter: blur(6px);
    }
</style>

<dialog bind:this={dialog}>
    <p>Hello world!</p>
    <form method="dialog">
        <button>OK</button>
    </form>
</dialog>