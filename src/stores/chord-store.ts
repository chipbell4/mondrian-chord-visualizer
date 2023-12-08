import { derived } from "svelte/store";

type ChordState = Record<string, number>;
type ChordStateSubscriber = (state: ChordState) => void;

export class ChordStore {
    state: ChordState = {};
    labels: string[] = [];
    subscribers: ChordStateSubscriber[] = [];

    get isReady(): boolean {
        return this.labels.length !== 0 && this.labels.every((label) => this.state[label] !== undefined);
    }

    set chordLabels(labels: string[]) {
        this.labels = labels;
    }

    subscribe(subscription: ChordStateSubscriber): () => void {
        this.subscribers.push(subscription);

        return this.unsubscribe.bind(this, subscription);
    }

    unsubscribe(subscription: ChordStateSubscriber) {
        const index = this.subscribers.indexOf(subscription);
        if (index >= 0) {
            this.subscribers.splice(index, 1);
        }
    }

    updateChordArea(label: string, area: number) {
        this.state[label] = area;

        if (!this.isReady) {
            return;
        }

        for (const subscriber of this.subscribers) {
            subscriber(this.state);
        }
    }
}

export const currentChord = new ChordStore();

export const currentFrequencies = derived(currentChord, ($state: ChordState) => {
    if ($state === undefined || $state.root === undefined) {
        return [];
    }

    const root = $state.root;
    const otherKeys = Object.keys($state).filter(key => key !== "root");

    const frequencies = [256];
    for (const toneLabel of otherKeys) {
        const ratio = root / $state[toneLabel];
        frequencies.push(ratio * 256);
    }

    return frequencies;
});