<script>
import { MONDRIAN_BLUE, MONDRIAN_RED, MONDRIAN_YELLOW } from "./colors";
import { HORIZONTAL, VERTICAL, oppositeDirectionOf } from "./divider_direction";

export let direction = HORIZONTAL;
export let firstColor = MONDRIAN_BLUE;
export let secondColor = MONDRIAN_RED;

let container;
let divider;

let firstFlex = 1;
let secondFlex = 1;

let dividerClicked = false;
let offset = 0;
const markDividerClicked = (e) => {
    dividerClicked = true;
    if (direction === VERTICAL) {
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

    if (direction === VERTICAL) {
        const desiredDividerPosition = e.clientY - offset;
        firstFlex = desiredDividerPosition;
        secondFlex = containerRect.height - 20 - desiredDividerPosition;
    } else {
        const desiredDividerPosition = e.clientX - offset;
        firstFlex = desiredDividerPosition;
        secondFlex = containerRect.width - 20 - desiredDividerPosition;
    }
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
<div class="container {direction}" bind:this={container}
    on:mouseup={markDividerUnclicked}
    on:mouseleave={markDividerUnclicked}
    on:mousemove={moveDivider}
    >
    <div class="left" style="flex: {firstFlex}; background: {firstColor}">
        <slot name="first"></slot>
    </div>
    <div class="divider"
        bind:this={divider}
        on:mousedown={markDividerClicked}
        role="button"
        tabindex="0"
        ></div>
    <div class="right" style="flex: {secondFlex}; background: {secondColor}">
        <slot name="second"></slot>
    </div>
</div>  