import type { ResultsStateType, RevisionSummaryType } from '@/types/revision-summaries.types';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { FileViewer } from '@/components/revision-summaries/file-viewer';

const RevisionSummaries = () => {
    const [resultsState, setResultsState] = useState<ResultsStateType>("success");
    const [showFile, setShowFile] = useState<boolean>(false);

    const revisionNotes: RevisionSummaryType[] = [
        {
            name: "Notes by Morgan Mostert",
            fileUrl:
                "https://storage.googleapis.com/testtsungiai.firebasestorage.app/revision-summaries/CA1%20-%20A311%20-%20Death%20V2.pdf?GoogleAccessId=firebase-adminsdk-fbsvc%40testtsungiai.iam.gserviceaccount.com&Expires=16730316000&Signature=ktoTLEPCuck1iE9dHiqFtdTO7K8DydJmPWcrJLkMycpepQq%2FQKxBVzeY4aV%2FlfXBQWczDphCS8hsL%2F%2BAEwTkHD0bSO8CVU0n3uLeWnTGL8A7TrJ%2BKejcG2E3YKCKFoggX9mkCa1bHYZDmEg2vXINhIF7jU0EEobRiLUc%2F0qGXg9dYoS3EI%2Fu%2FKDhQvjEz2j5JHkijhr9hXMRMTrMmL39FvXNn%2B4n%2FoRTi2ns2CQcXv%2BELpVYhfMNc%2FD5gItNyvz4IFFoeUU2N4k7zwnC8bbAmrs7VS8o%2Bx7%2FTjeis46dM4Yfuto3XK68b0VS6HkalX%2FUngqay%2FWCuahFGqSE6V9f0g%3D%3D",
            fileType: "pdf",
            description: "Recommendation - read before you go through ActEd notes",
            dateCreated: Timestamp.fromDate(new Date("2025-12-29T17:22:11+02:00")),
        },
        {
            name: "A311 Exam Handy Notes",
            fileUrl:
                "https://storage.googleapis.com/testtsungiai.firebasestorage.app/revision-summaries/Products%20and%20Investments%20Summary.xlsx?GoogleAccessId=firebase-adminsdk-fbsvc%40testtsungiai.iam.gserviceaccount.com&Expires=16730316000&Signature=OI8TTX2lrvEatQGPzSg1oIJoDui1dQ2MAuZN9uvwimhQGMdh91%2BEm1yh%2BZLWcmY5tj6pDJsaeNQpnx7GJj9p7avYkNbwjWoFIjyqSXKYD0%2BHAtBwfkyPUpQG5fY6Lo5AwnpOU62iBLRlJm04ikolQvPhDGN1NZVS82AarB3W5XNBMui0JJiTBb2LyaYSIqNsYpOXK4iv6lQZNHX5s%2FpjL2oPZKOL4xl2Ygc84fnsRDZeKna5OB%2FFNQiVXdCNK0u%2FugE4V%2BF1EdmnTnTcyop5RfkMUxz2B7j0iw%2BXIR9RmL4wy1kmfZoPH9ZemPmzp3PLMGTP%2B1UQasfCUkz%2B%2BW2Aow%3D%3D",
            fileType: "xlsx",
            description: "Recommendation - read as you go through past papers",
            dateCreated: Timestamp.fromDate(new Date("2025-12-29T17:22:11+02:00")),
        },
    ]

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
                            <FileViewer revisionNotes={revisionNotes} showFile={showFile} setShowFile={setShowFile} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default RevisionSummaries;