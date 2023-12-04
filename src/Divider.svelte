<script>
import { createEventDispatcher } from 'svelte';

import { MONDRIAN_BLUE, MONDRIAN_RED, MONDRIAN_YELLOW } from "./colors";
import { HORIZONTAL, VERTICAL } from "./divider_direction";

export let config = {
    direction: HORIZONTAL,
    first: {
        color: MONDRIAN_BLUE,
        weight: 1,
    },
    second: {
        color: MONDRIAN_RED,
        weight: 1,
        children: null,
    }
}

const dispatch = createEventDispatcher();

let container;
let divider;

let dividerClicked = false;
let offset = 0;
const markDividerClicked = (e) => {
    dividerClicked = true;
    if (config.direction === VERTICAL) {
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

    if (config.direction === VERTICAL) {
        const desiredDividerPosition = e.clientY - offset;
        config.first.weight = desiredDividerPosition;
        config.second.weight = containerRect.height - 20 - desiredDividerPosition;
    } else {
        const desiredDividerPosition = e.clientX - offset;
        config.first.weight = desiredDividerPosition;
        config.second.weight = containerRect.width - 20 - desiredDividerPosition;
    }

    dispatch("rescale", {
        first: config.first.weight,
        second: config.second.weight,
    });
};

</script>

<style lang="scss">
.container {
    width: 100%;
    height: 100%;
    display: flex;
    
    user-select: none;
    -webkit-user-select: none;
}

.container.VERTICAL {
    flex-direction: column;

    > .divider {
        height: 20px;
        width: 100%;
    }
}

.container.HORIZONTAL {
    flex-direction: row;

    > .divider {
        width: 20px;
    }
}

.divider {
    background: #111;

    &:active {
        background: #222;
    }
}
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container {config.direction}" bind:this={container}
    on:mouseup={markDividerUnclicked}
    on:mouseleave={markDividerUnclicked}
    on:mousemove={moveDivider}
    >
    <div class="left" style="flex: {config.first.weight}; background: {config.first.color}">
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
    <div class="right" style="flex: {config.second.weight}; background: {config.second.color}">
        {#if config.second.children !== null && config.second.children !== undefined}
            <svelte:self config={config.second.children} />
        {/if}
    </div>
</div>  