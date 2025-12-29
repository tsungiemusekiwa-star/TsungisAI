import { db, bucket } from "./firebaseAdmin.js";


const summariesToUpload = [
    {
        name: "A311 Exam Handy Notes",
        description: "Recommendation - read as you go through past papers",
        fileType: "xlsx",
        // Path to file in Storage (including folders if any)
        storagePath: "revision-summaries/Products and Investments Summary.xlsx",
    },
    {
        name: "Notes by Morgan Mostert",
        description: "Recommendation - read before you go through ActEd notes",
        fileType: "pdf",
        storagePath: "revision-summaries/CA1 - A311 - Death V2.pdf",
    },
    // Add more summaries here:
    // {
    //   name: "Summary Name",
    //   description: "Description here",
    //   fileType: "pdf",
    //   storagePath: "folder/filename.pdf",
    // },
];

async function uploadSummariesToFirestore() {
    try {
        console.log("Starting upload to revision-summaries collection...\n");

        for (const summary of summariesToUpload) {
            try {
                // Create a reference to the file in Storage
                const file = bucket.file(summary.storagePath);

                // Check if file exists
                const [exists] = await file.exists();
                if (!exists) {
                    console.error(`File not found in Storage: ${summary.storagePath}`);
                    continue;
                }

                // Generate a signed URL that preserves the file extension
                // This makes the URL work with Office/Google viewers
                const [signedUrl] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500', // Expires in year 2500 (essentially permanent)
                });

                console.log(`Processing: ${summary.name}`);
                console.log(`   File found: ${summary.storagePath}`);

                // Prepare the document data
                const docData = {
                    name: summary.name,
                    description: summary.description,
                    fileType: summary.fileType,
                    fileUrl: signedUrl, // Using signed URL with proper file extension
                    dateCreated: new Date(), // Firestore Timestamp
                };

                // Add to Firestore (auto-generate document ID)
                const docRef = await db.collection("revision-summaries").add(docData);

                console.log(`Uploaded: ${summary.name}`);
                console.log(`Document ID: ${docRef.id}`);
                console.log(`File URL: ${signedUrl.substring(0, 80)}...\n`);
            } catch (error) {
                console.error(`Error uploading ${summary.name}:`, error.message, "\n");
            }
        }

        console.log("Upload complete!");
    } catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}

// Run the script
uploadSummariesToFirestore();