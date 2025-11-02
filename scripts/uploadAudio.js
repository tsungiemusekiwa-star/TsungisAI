// Script to upload CA1 Sound Revision audio files to Firebase Storage
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFb2Lq46W53bBYgH0MM3zCdWMmZ0s0kZQ",
  authDomain: "tsungiai.firebaseapp.com",
  projectId: "tsungiai",
  storageBucket: "tsungiai.firebasestorage.app",
  messagingSenderId: "544448000375",
  appId: "1:544448000375:web:a8ab57676a7719812c3172",
  measurementId: "G-C05PSMTJ9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Path to your audio files (adjust this path as needed)
const AUDIO_SOURCE_PATH = path.join(__dirname, '..', '..', 'CA1 Sound Revision-20211101T202630Z-001', 'CA1 Sound Revision');

// Firebase Storage path prefix
const FIREBASE_PATH_PREFIX = 'CA1-Sound-Revision';

async function uploadFile(localFilePath, firebaseFilePath) {
  try {
    console.log(`📤 Uploading: ${firebaseFilePath}`);

    // Read the file
    const fileBuffer = fs.readFileSync(localFilePath);

    // Create storage reference
    const storageRef = ref(storage, firebaseFilePath);

    // Upload file
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: 'audio/mpeg'
    });

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(`✅ Successfully uploaded: ${firebaseFilePath}`);
    console.log(`🔗 URL: ${downloadURL}`);

    return { success: true, url: downloadURL, path: firebaseFilePath };
  } catch (error) {
    console.error(`❌ Failed to upload ${firebaseFilePath}:`, error.message);
    return { success: false, error: error.message, path: firebaseFilePath };
  }
}

async function uploadAudioFiles() {
  console.log('🎵 Starting CA1 Sound Revision upload to Firebase Storage...');
  console.log(`📁 Source path: ${AUDIO_SOURCE_PATH}`);

  // Check if source directory exists
  if (!fs.existsSync(AUDIO_SOURCE_PATH)) {
    console.error(`❌ Source directory not found: ${AUDIO_SOURCE_PATH}`);
    console.log('Please check the path to your CA1 Sound Revision folder');
    return;
  }

  const results = {
    successful: [],
    failed: [],
    total: 0
  };

  try {
    // Get all disk directories
    const diskDirs = fs.readdirSync(AUDIO_SOURCE_PATH, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log(`📂 Found disk directories: ${diskDirs.join(', ')}`);

    // Process each disk directory
    for (const diskDir of diskDirs) {
      const diskPath = path.join(AUDIO_SOURCE_PATH, diskDir);

      console.log(`\n📀 Processing ${diskDir}...`);

      // Get all MP3 files in this disk directory
      const audioFiles = fs.readdirSync(diskPath)
        .filter(file => file.toLowerCase().endsWith('.mp3'));

      console.log(`🎵 Found ${audioFiles.length} MP3 files in ${diskDir}`);

      // Upload each audio file
      for (const audioFile of audioFiles) {
        const localFilePath = path.join(diskPath, audioFile);
        const firebaseFilePath = `${FIREBASE_PATH_PREFIX}/${diskDir}/${audioFile}`;

        results.total++;

        const result = await uploadFile(localFilePath, firebaseFilePath);

        if (result.success) {
          results.successful.push(result);
        } else {
          results.failed.push(result);
        }

        // Small delay to avoid overwhelming Firebase
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Summary
    console.log('\n📊 Upload Summary:');
    console.log(`✅ Successful uploads: ${results.successful.length}`);
    console.log(`❌ Failed uploads: ${results.failed.length}`);
    console.log(`📁 Total files processed: ${results.total}`);

    if (results.failed.length > 0) {
      console.log('\n❌ Failed uploads:');
      results.failed.forEach(fail => {
        console.log(`   - ${fail.path}: ${fail.error}`);
      });
    }

    console.log('\n🎉 Upload process completed!');

  } catch (error) {
    console.error('❌ Error during upload process:', error);
  }
}

// Run the upload
uploadAudioFiles().catch(console.error);