import { Chord } from "./synth/chords";
import { Accidental, StaveNote } from "vexflow";

const MIDDLE_C = 256;

export interface PitchDescription {
    frequency: number;
    name: string;
    accidental?: string;
}

interface PartialPitchDescription {
    name: string;
    accidental?: string;
}

const descriptionsNoOctave: PartialPitchDescription[] = [
    { name: "c" },
    { name: "c", accidental: "+"},
    { name: "d", accidental: "b"},
    { name: "d", accidental: "d"},
    { name: "d" },
    { name: "d", accidental: "+"},
    { name: "e", accidental: "b"},
    { name: "e", accidental: "d"},
    { name: "e" },
    { name: "f", accidental: "d"},
    { name: "f" },
    { name: "f", accidental: "+"},
    { name: "g", accidental: "b"},
    { name: "g", accidental: "d"},
    { name: "g" },
    { name: "g", accidental: "+"},
    { name: "a", accidental: "b"},
    { name: "a", accidental: "d"},
    { name: "a" },
    { name: "a", accidental: "+"},
    { name: "b", accidental: "b"},
    { name: "b", accidental: "d"},
    { name: "b" },
    { name: "b", accidental: "+"},
    
]

export function frequencyToPitchDescription(frequency: number): PitchDescription {
    // 2 ** (n / 24) * MIDDLE_C = frequency
    // n / 24 = log_2(frequency / MIDDLE_C)
    // n = 25 * log_2(frequency / MIDDLE_C)
    const quarterToneDistance = Math.round(24 * Math.log2(frequency / MIDDLE_C));

    const partialDescription = descriptionsNoOctave[(quarterToneDistance + 48) % 24];
    const octave = Math.floor(quarterToneDistance / 24) + 4;
    if (partialDescription === undefined) {
        console.log(frequency);
    }

    return {
        frequency,
        name: partialDescription.name + "/" + octave,
        accidental: partialDescription.accidental,
    };
}

export function chordToStaveNote(frequencies: number[]): StaveNote {
    const descriptions = frequencies.map(frequencyToPitchDescription);

    const note = new StaveNote({
        duration: "w",
        keys: descriptions.map(d => d.name),
    });

    descriptions.forEach((description: PitchDescription, index: number) => {
        if (description.accidental) {
            note.addModifier(new Accidental(description.accidental), index);
        }
    });

    return note;
}