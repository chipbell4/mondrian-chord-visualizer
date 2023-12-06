export const HORIZONTAL = "HORIZONTAL";
export const VERTICAL = "VERTICAL";
export type DividerDirection = "HORIZONTAL" | "VERTICAL";

export function oppositeDirectionOf(direction): DividerDirection {
    if (direction === HORIZONTAL) return VERTICAL;
    else return HORIZONTAL;
}