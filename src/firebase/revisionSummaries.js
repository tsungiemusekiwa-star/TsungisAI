// services/revision-summaries.ts
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "./config"

export async function getRevisionSummaries(setResultsState) {
    const summaries = []

    try {
        const q = query(
            collection(db, "revision-summaries"),
            orderBy("dateCreated", "desc") // optional: newest first
        )
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            const data = doc.data()
            summaries.push({
                name: data.name,
                fileUrl: data.fileUrl,
                fileType: data.fileType,
                description: data.description,
                dateCreated: data.dateCreated, // Timestamp object
            })
        })
    } catch (error) {
        setResultsState("error")
        console.error("Error fetching revision summaries:", error)
    }

    if (summaries.length < 1) {
        setResultsState("null");
    } else {
        setResultsState(summaries);
    }
}
