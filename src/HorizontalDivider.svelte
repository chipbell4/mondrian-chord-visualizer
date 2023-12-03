<script>
import { MONDRIAN_BLUE, MONDRIAN_RED } from "./colors";

export let leftColor = MONDRIAN_BLUE;
export let rightColor = MONDRIAN_RED;

let container;
let divider;

let leftFlex = 1;
let rightFlex = 1;

let dividerClicked = false;
let yOffset = 0;
const markDividerClicked = (e) => {
    dividerClicked = true;
    yOffset = e.clientY - divider.getBoundingClientRect().top;
}
const markDividerUnclicked = () => dividerClicked = false;
const moveDivider = (e) => {
    if (!dividerClicked) {
        return;
    }

    const desiredDividerY = e.clientY - yOffset;

    const containerRect = container.getBoundingClientRect();

    leftFlex = desiredDividerY;
    rightFlex = containerRect.height - 20 - desiredDividerY;
};

</script>

<style>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    user-select: none;
    -webkit-user-select: none;
}

.left, .right, .divider {
    width: 100%;
}

.left {
    background: blue;
}

.right {
    background: red;
}

.divider {
    background: #111;
    max-height: 20px;
    height: 20px;
}

.divider:active {
    background: #222;
}
</style>

<div class="container" bind:this={container}
    on:mouseup={markDividerUnclicked}
    on:mouseleave={markDividerUnclicked}
    on:mousemove={moveDivider}
    >
    <div class="left" style="flex: {leftFlex}; background: {leftColor}"></div>
    <div class="divider"
        bind:this={divider}
        on:mousedown={markDividerClicked}
        role="button"
        tabindex="0"
        ></div>
    <div class="right" style="flex: {rightFlex}; background: {rightColor}"></div>
</div>  