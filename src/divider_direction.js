export const HORIZONTAL = "HORIZONTAL";
export const VERTICAL = "VERTICAL";

export function oppositeDirectionOf(direction) {
    if (direction === HORIZONTAL) return VERTICAL;
    else return HORIZONTAL;
}