import type { AudioDiskType } from "@/types/audio-learning.types";
import type { ResultsStateType } from "@/types/shared.types";

interface LoadingUIProps {
    resultsState: ResultsStateType<AudioDiskType[]>;
}

const LoadingUI = ({ resultsState }: LoadingUIProps) => {
    return (
        <>
            {resultsState === "loading" && (
                <div className="space-y-6">
                    <div className="card">
                        <div className="card-content p-8 text-center">
                            <div className="animate-spin icon-lg mx-auto mb-4 text-primary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                                </svg>
                            </div>
                            <p className="text-muted-foreground">Loading audio files...</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default LoadingUI;