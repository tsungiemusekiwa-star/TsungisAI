# 1.Revision Summaries

## Overview
The **Revision Summaries** feature provides students with "quick, clear, and exam-focused notes" specifically designed to help them ace the **A311 Actuarial Science** exam. 

Instead of forcing downloads, the platform allows students to view these notes (PDFs and Excel sheets) directly within the app via an interactive **modal viewer**.

- **User Access URL:** `{app-url}/revision-summaries`
- **Main Page:** `src/pages/RevisionSummaries.tsx`
- **Components:** `src/components/revision-summaries/`

---

## Database Structure (Firestore)
The feature reads data from the **`revision-summaries`** collection. Each document represents one study resource and uses the following structure:

| Field | Type | Description |
| :--- | :--- | :--- |
| **`name`** | String | The display title shown to the student. |
| **`description`** | String | A brief recommendation or summary of the note. |
| **`fileType`** | String | Determines the icon shown (`pdf` or `xlsx`). |
| **`fileUrl`** | String | The signed URL from Firebase Storage. |
| **`dateCreated`** | Timestamp | The date/time the summary was added. |

---

## User Experience
The user interface is designed to be resilient and accessible:

### 1. Data States
* **Loading (`"loading"`):** A spinning loader is shown while fetching the notes from Firestore.
* **Empty State (`null`):** A "Come back soon!" message appears if no documents exist in the collection.
* **Error State (`"error"`):** A "Retry Loading" button appears if the database fetch fails.
* **Success State (`RevisionSummaryType[]`):** Once data is successfully fetched, notes are rendered as a grid of **interactive card tabs**. Each tab displays the file's icon and metadata, serving as the trigger for the file viewer.

### 2. File Viewer (Modal)
When a user clicks on a note card, the `FileViewer` component triggers a full-screen modal:
* **PDFs:** Rendered using a standard `<iframe>` with the toolbar disabled for a focused reading experience.
* **Excel (.xlsx):** Since browsers cannot natively display Excel files, these are embedded using the **Microsoft Office Online Viewer** via a specialized iframe source.

---

## Management Scripts
To add or update summaries, use the scripts located in the `/scripts/` directory.

### 1. File Uploader
* **File Path:** `/scripts/uploadFilesToStorage.js`
* **Purpose:** Uploads local files to the Firebase Storage folder `revision-summaries`.
* **What to Edit:** * `LOCAL_PATH`: Update this to the file or folder you want to upload.
    * `ALLOWED_EXTENSIONS`: Ensure the file type you are uploading is listed.

### 2. Database Linker
* **File Path:** `/scripts/uploadRevisionSummaries.js`
* **Purpose:** Creates the record in Firestore and generates the permanent link for the File Viewer.
* **What to Edit:** * `summariesToUpload`: Add a new object to this array containing the `name`, `description`, `fileType`, and the exact `storagePath` used in the step above.

---

## How to Add New Summaries
1. **Upload:** Run `uploadFilesToStorage.js` to get your PDF/Excel into the cloud.
2. **Link:** Update the data in `uploadRevisionSummaries.js` and run it to make the note appear on the website.
3. **Verify:** Navigate to `/revision-summaries` to ensure the modal opens and displays the content correctly.