import type { ResultsStateType } from '@/types/revision-summaries.types';
import { useState } from 'react';
import PDFIcon from "@/assets/pdf-icon.png";
import XLSXIcon from "@/assets/xlsx-icon.png";
import { XlsxViewer } from '@/components/revision-summaries/xlsx-viewer';

const RevisionSummaries = () => {
    const [resultsState, setResultsState] = useState<ResultsStateType>("success");
    const [showViewer, setShowViewer] = useState<boolean>(false);
    // Load audio files from Firebase on component mount
    // useEffect(() => {
    //     loadAudioFiles();
    //     loadTrackProgress();
    // }, []);

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
                    <button className="btn btn-primary w-full">
                        <svg className="icon-sm mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23,4 23,10 17,10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Retry Loading
                    </button>
                </div>
            }

            {resultsState === "success" &&
                <div className="space-y-6">
                    <div className="card">
                        <div className="card-content p-8 min-h-[200px] grid grid-cols-2 gap-4 gap-y-8 justify-items-center text-center">
                            <div className='flex flex-col items-center justify-center text-center space-y-2'>
                                <img style={{ height: "62px", width: "62px" }} src={PDFIcon} alt="PDF File" />
                                <p style={{ fontSize: "16px" }}>Notes by Morgan Mostert</p>
                                <p style={{ fontSize: "12px" }} className="text-muted-foreground">Recommendation - read before you go through ActEd notes</p>
                            </div>

                            <div
                                onClick={() => {
                                    setShowViewer(true);
                                }}
                                className='flex flex-col items-center justify-center text-center space-y-2'>
                                <img style={{ height: "62px", width: "62px" }} src={XLSXIcon} alt="PDF File" />
                                <p style={{ fontSize: "16px" }}>A311 Exam Handy Notes</p>
                                <p style={{ fontSize: "12px" }} className="text-muted-foreground">Recommendation - read as you go through past papers</p>
                            </div>


                            {showViewer &&
                                <XlsxViewer fileUrl="/revision-notes.xlsx" setShowViewer={setShowViewer} />
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default RevisionSummaries;