<script lang="typescript">
import { onMount } from "svelte";
import { MONDRIAN_BLUE, MONDRIAN_RED } from "./colors";
import { HORIZONTAL } from "./divider_direction";
import { currentChord } from "./stores/chord-store";

export let config = {
    direction: HORIZONTAL,
    first: {
        color: MONDRIAN_BLUE,
        weight: 1,
        children: null,
    },
    second: {
        color: MONDRIAN_RED,
        weight: 1,
        children: null,
    }
}

// Divider Event Handler
let container;
let divider;
let dividerClicked = false;
let offset = 0;
const markDividerClicked = (e) => {
    dividerClicked = true;
    if (config.direction === HORIZONTAL) {
        offset = e.clientY - divider.getBoundingClientRect().top;
    } else {
        offset = e.clientX - divider.getBoundingClientRect().left;
    }
}
const markDividerUnclicked = () => dividerClicked = false;
const moveDivider = (e) => {
    if (!dividerClicked) {
        return;
    }

    const containerRect = container.getBoundingClientRect();

    const localX = e.clientX - containerRect.left;
    const localY = e.clientY - containerRect.top;

    if (config.direction === HORIZONTAL) {
        const desiredDividerPosition = localY - offset;
        config.first.weight = desiredDividerPosition;
        config.second.weight = containerRect.height - 20 - desiredDividerPosition;
    } else {
        const desiredDividerPosition = localX - offset;
        config.first.weight = desiredDividerPosition;
        config.second.weight = containerRect.width - 20 - desiredDividerPosition;
    }
};

// Handling resizes
let first;
let second;

onMount(() => {
    const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
            if (!entry.contentBoxSize) {
                continue;
            }

            // figure out which label to use
            const label = entry.target.classList.contains("left") ? config.first.label : config.second.label;
            const area = entry.contentRect.width * entry.contentRect.height;

            currentChord.updateChordArea(label, area);
        }
    });

    if (!config.first.children) {
        // Report area initially as well
        const rect = first.getBoundingClientRect();
        currentChord.updateChordArea(config.first.label, rect.width * rect.height);

        observer.observe(first);
    }
    
    if (!config.second.children) {
        // report area initially as well
        const rect = second.getBoundingClientRect();
        currentChord.updateChordArea(config.second.label, rect.width * rect.height);

        observer.observe(second);
    }

    return () => {
        observer.unobserve(first);
        observer.unobserve(second);
    }
})

</script>

<style lang="scss">
.container {
    width: 100%;
    height: 100%;
    display: flex;
    
    user-select: none;
    -webkit-user-select: none;
}

.container.HORIZONTAL {
    flex-direction: column;

    > .divider {
        height: 20px;
        width: 100%;
    }
}

.container.VERTICAL {
    flex-direction: row;

    > .divider {
        width: 20px;
    }
}

.divider {
    background: #111;
    cursor: grab;

    &:active {
        background: #222;
        cursor: grabbing;
    }
}
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container {config.direction}" bind:this={container}
    on:mouseup={markDividerUnclicked}
    on:mouseleave={markDividerUnclicked}
    on:mousemove={moveDivider}
    >
    <div class="left" style="flex: {config.first.weight}; background: {config.first.color}" bind:this={first}>
        {#if config.first.children !== null && config.first.children !== undefined}
            <svelte:self config={config.first.children} />
        {/if}
    </div>
    <div class="divider"
        bind:this={divider}
        on:mousedown={markDividerClicked}
        role="button"
        tabindex="0"
        ></div>
    <div class="right" style="flex: {config.second.weight}; background: {config.second.color}" bind:this={second}>
        {#if config.second.children !== null && config.second.children !== undefined}
            <svelte:self config={config.second.children} />
        {/if}
    </div>
</div>  