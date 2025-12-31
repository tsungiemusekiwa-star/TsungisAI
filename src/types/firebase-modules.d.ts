declare module '@/firebase/revisionSummaries.js' {
    export function getRevisionSummaries(
        setResultsState: (state: ResultsStateType) => void
    ): Promise<void>;
}