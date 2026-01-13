import { Timestamp } from "firebase/firestore"

// Type for Revision Summary Data
export interface RevisionSummaryType {
    name: string
    fileUrl: string
    fileType: string
    description: string
    dateCreated: Timestamp
}