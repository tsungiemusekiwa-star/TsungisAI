import type { AudioDiskType } from "./audio-learning.types";


declare module "@/firebase/revisionSummaries.js" {
    export function fetchAllAudioFiles(
        basePath?: string
    ): Promise<
        AudioDiskType[]
    >;
};

declare module '@/firebase/revisionSummaries.js' {
    export function getRevisionSummaries(
        setResultsState: (state: ResultsStateType) => void
    ): Promise<void>;
}