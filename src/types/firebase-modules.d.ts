import type { AudioDiskType } from "./audio-learning.types";


declare module "@/firebase/revisionSummaries.js" {
    export function fetchAllAudioFiles(
        basePath?: string
    ): Promise<
        AudioDiskType[]
    >;
}