import { HORIZONTAL, DividerDirection, oppositeDirectionOf, VERTICAL } from "./divider_direction";
import { COLOR_WHEEL } from "./colors";
import { Chord, ChordTone } from "./synth/chords";

export interface SideConfig {
    label: string;
    color: string;
    weight: number;
    children?: DividerConfig;
}

export interface DividerConfig {
    direction: DividerDirection,
    first: SideConfig;
    second: SideConfig;
}

function splitArray<T>(ary: T[]): [T[], T[]] {
    const cloned = Array.from(ary);
    const middleIndex = Math.floor(ary.length / 2);
    const front = cloned.splice(0, middleIndex);
    return [front, cloned];
}

function chordWeight(chord: Chord): number {
    return chord
        .map(tone => tone.ratio)
        .map(c => 1 / c)
        .reduce((a, b) => a + b, 0);
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

export function pairToDividerConfig(first: ChordTone, second: ChordTone): DividerConfig {
    const total = (1 / first.ratio) + (1 / second.ratio);

    return {
        direction: randomDirection(),
        first: {
            label: first.label,
            color: randomColor(),
            weight: 1 / (first.ratio * total),
        },
        second: {
            label: second.label,
            color: randomColor(),
            weight: 1 / (second.ratio * total),
        }
    };
}

export function chordToDividerConfig(chord: Chord): DividerConfig {
    if (chord.length === 3) {
        return {
            direction: randomDirection(),
            first: {
                label: chord[0].label,
                color: randomColor(),
                weight: 1 / chord[0].ratio,
            },
            second: {
                label: chord[1].label,
                color: randomColor(),
                weight: 1 / chord[1].ratio + 1 / chord[2].ratio,
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