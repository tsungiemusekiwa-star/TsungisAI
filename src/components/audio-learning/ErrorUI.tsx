import type { AudioDiskType } from "@/types/audio-learning.types";
import type { ResultsStateType } from "@/types/shared.types";

interface ErrorUIProps {
    resultsState: ResultsStateType<AudioDiskType[]>;
    loadAudioFiles: (setResultsState: (value: ResultsStateType<AudioDiskType[]>) => void) => void;
    setResultsState: (value: ResultsStateType<AudioDiskType[]>) => void
}

const ErrorUI = ({ resultsState, loadAudioFiles, setResultsState }: ErrorUIProps) => {
    return (
        <>
            {resultsState === "error" && (
                <div className="space-y-6">
                    <div className="alert alert-destructive">
                        <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span>An unexpected error occurred</span>
                    </div>
                    <button onClick={() => loadAudioFiles(setResultsState)} className="btn btn-primary w-full">
                        <svg className="icon-sm mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23,4 23,10 17,10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Retry Loading
                    </button>
                </div>
            )}
        </>
    );
};
export default ErrorUI;