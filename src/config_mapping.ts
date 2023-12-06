import { HORIZONTAL, DividerDirection, oppositeDirectionOf, VERTICAL } from "./divider_direction";
import { COLOR_WHEEL } from "./colors";

export interface SideConfig {
    color: string;
    weight: number;
    children?: DividerConfig;
}

export interface DividerConfig {
    direction: DividerDirection,
    first: SideConfig;
    second: SideConfig;
}

function splitArray(ary: number[]): [number[], number[]] {
    const cloned = Array.from(ary);
    const middleIndex = Math.floor(ary.length / 2);
    const front = cloned.splice(0, middleIndex);
    return [front, cloned];
}

function chordWeight(ary: number[]): number {
    return ary.map(c => 1 / c).reduce((a, b) => a + b, 0);
}

function randomElement<T>(ary: T[]): T {
    const index = Math.floor(ary.length * Math.random());
    return ary[index];
}

function randomDirection(): DividerDirection {
    return randomElement([HORIZONTAL, VERTICAL]);
}

function randomColor(): string {
    return randomElement(COLOR_WHEEL);
}

export function pairToDividerConfig(first: number, second: number): DividerConfig {
    const total = (1 / first) + (1 / second);

    return {
        direction: randomDirection(),
        first: {
            color: randomColor(),
            weight: 1 / (first * total),
        },
        second: {
            color: randomColor(),
            weight: 1 / (second * total),
        }
    };
}

export function chordToDividerConfig(chord: number[]): DividerConfig {
    if (chord.length === 3) {
        return {
            direction: randomDirection(),
            first: {
                color: randomColor(),
                weight: 1 / chord[0],
            },
            second: {
                color: randomColor(),
                weight: 1 / chord[1] + 1 / chord[2],
                children: pairToDividerConfig(chord[1], chord[2]),
            }
        };
    } else if (chord.length === 2) {
        return pairToDividerConfig(chord[0], chord[1]);
    }

    const [firstHalf, secondHalf] = splitArray(chord);

    return {
        direction: randomDirection(),
        first: {
            color: randomColor(),
            weight: chordWeight(firstHalf),
            children: chordToDividerConfig(firstHalf),
        },
        second: {
            color: randomColor(),
            weight: chordWeight(secondHalf),
            children: chordToDividerConfig(secondHalf),
        }
    };
}