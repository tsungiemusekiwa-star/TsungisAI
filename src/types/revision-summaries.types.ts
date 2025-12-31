import { Timestamp } from "firebase/firestore"

// Represents the current state of revision summaries result (loading, success, error, or not yet set)
export type ResultsStateType = RevisionSummaryType[] | "loading" | "error" | null;

// Type for Revision Summary Data
export interface RevisionSummaryType {
    name: string
    fileUrl: string
    fileType: string
    description: string
    dateCreated: Timestamp
}