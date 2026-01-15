import { useEffect, useLayoutEffect, useState } from 'react';
import { FileViewer } from '@/components/revision-summaries/file-viewer';
import { getRevisionSummaries } from '@/firebase/revisionSummaries.js';
import type { ResultsStateType } from '@/types/shared.types';
import type { RevisionSummaryType } from '@/types/revision-summaries.types';

const RevisionSummaries = () => {
    const [resultsState, setResultsState] = useState<ResultsStateType<RevisionSummaryType>>("loading");
    const [showFile, setShowFile] = useState<boolean>(false);

    useLayoutEffect(() => {
        document.title = "Revision | Tsungi's AI";
    }, []);

    const fetchRevisionSummaries = () => {
        setResultsState("loading");
        getRevisionSummaries(setResultsState);
    };

    useEffect(() => {
        fetchRevisionSummaries();
    }, [])

    return (
        <div className="space-y-4 md:space-y-6" style={{ width: '100%', maxWidth: 'none' }}>
            
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-4xl font-bold gradient-text">
                    Revision Summaries
                </h1>
                <p className="text-muted-foreground text-sm md:text-lg">
                    Actuarial Science Revision Summaries – quick, clear, and exam-focused notes to ace your A311.
                </p>
            </div>

            {/* Body */}

            {/* Loading State */}
            {resultsState === "loading" &&
                <div className="space-y-6">
                    <div className="card">
                        <div className="card-content p-8 min-h-[200px] flex flex-col items-center justify-center text-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ width: '24px', height: '24px' }}
                                className="animate-spin mb-4 text-primary"
                                aria-hidden="true"
                            >
                                <path d="M21 12a9 9 0 11-6.219-8.56" />
                            </svg>
                            <p className="text-muted-foreground">Loading summaries...</p>
                        </div>
                    </div>
                </div>
            }

            {/* No revision notes found state */}
            {resultsState === null && (
                <div className="space-y-6">
                    <div className="card">
                        <div className="card-content p-8 min-h-[200px] flex flex-col items-center justify-center text-center space-y-2">
                            <h2 className="text-lg font-semibold">
                                Come back soon!
                            </h2>
                            <p className="text-muted-foreground">
                                No revision notes have been added yet.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error State */}
            {resultsState === "error" &&
                <div className="space-y-6">
                    <div className="alert alert-destructive">
                        <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span>An unexpected error occured</span>
                    </div>
                    <button
                        className="btn btn-primary w-full"
                        onClick={fetchRevisionSummaries}
                    >
                        <svg className="icon-sm mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23,4 23,10 17,10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Retry Loading
                    </button>
                </div>
            }

            {/* Render revision notes  */}
            {Array.isArray(resultsState) && resultsState.length > 0 && (
                <div className="space-y-6">
                    <div className="card">
                        <div className="card-content p-8 min-h-[200px] grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 justify-items-center text-center">
                            <FileViewer
                                revisionNotes={resultsState}
                                showFile={showFile}
                                setShowFile={setShowFile}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevisionSummaries;