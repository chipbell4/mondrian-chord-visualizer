// I'm pretty much mixing up tuning systems here...
export const MINOR_SECOND = 16 / 15;
export const MAJOR_SECOND = 9 / 8;
export const MINOR_THIRD = 6 / 5;
export const MAJOR_THIRD = 5 / 4;
export const PERFECT_FOURTH = 4 / 3;
export const TRITONE = 729 / 512;
export const PERFECT_FIFTH = 3 / 2;
export const MINOR_SIXTH = 8 / 5;
export const MAJOR_SIXTH = 5 / 3;
export const MINOR_SEVENTH = 16 / 9;
export const MAJOR_SEVENTH = 15 / 8;
export const OCTAVE = 2;

function shuffle(chord: number[]): number[] {
    return chord.sort(() => Math.random() - 0.5);
}

function revoice(chord: number[]): number[] {
    // raise half of the chord tones by an octave
    const revoiced = chord.map(note => note);
    for (let i = 0; i < revoiced.length; i++) {
        if (Math.random() > 0.5) {
            revoiced[i] *= 2;
        }
    }
    return revoiced;
}

export const MAJOR_SEVEN = [
    1,
    MAJOR_THIRD,
    PERFECT_FIFTH,
    MAJOR_SEVENTH,
]

export const MAJOR_THIRTEEN = [
    1,
    MAJOR_THIRD,
    PERFECT_FIFTH,
    MINOR_SEVENTH,
    OCTAVE * MAJOR_SECOND,
    OCTAVE * TRITONE,
    OCTAVE * MAJOR_SIXTH,
]