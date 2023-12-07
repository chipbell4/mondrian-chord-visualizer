import { writable } from "svelte/store";
import { MAJOR_THIRTEEN } from "../synth/chords";

type ChordAreaSubscriber = (label: string, area: number) => void;

const subscribers: ChordAreaSubscriber[] = [];

let cache: Record<string, number> = {};
let labels: string[] = [];

export function setListOfLabels(newList: string[]) {
    labels = newList;
    cache = {}; // clear the cache
}

export function cacheIsReady(): boolean {
    return labels.every((label) => cache[label] !== undefined);
}

export function onChordAreaChanged(subscriber: ChordAreaSubscriber) {
    subscribers.push(subscriber);
}

export function updateChordArea(label: string, area: number) {
    cache[label] = area;

    for (const subscriber of subscribers) {
        subscriber(label, area);
    }
}

export function getCache() {
    return cache;
}