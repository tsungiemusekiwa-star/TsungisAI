// Firebase Storage service for audio files
// import { executionAsyncResource } from 'node:async_hooks';
import { storage } from './config.js';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';

// Helper function to get download URL for audio file
export const getAudioUrl = async (filePath) => {
  try {
    const audioRef = ref(storage, filePath);
    const url = await getDownloadURL(audioRef);
    return url;
  } catch (error) {
    console.error('Error getting audio URL:', error);
    throw error;
  }
};

// Recursive function to list all .mp3 files in a folder and subfolders
const listAudioFilesRecursive = async (directory) => {
  const dirRef = ref(storage, directory);
  const result = await listAll(dirRef);

  let files = result.items.map(item => ({
    name: item.name,
    path: item.fullPath,
  }));

  // Recurse into subfolders
  for (const prefix of result.prefixes) {
    const subFiles = await listAudioFilesRecursive(prefix.fullPath);
    files.push(...subFiles);
  }

  // Only keep .mp3 files
  return files.filter(f => f.name.endsWith(".mp3"));
};

// Helper function to list files in a directory
export const listAudioFiles = async (directory = '') => {
  try {
    const dirRef = ref(storage, directory);
    const result = await listAll(dirRef);

    const files = result.items.map(item => ({
      name: item.name,
      fullPath: item.fullPath,
      path: item.fullPath
    }));

    return { data: files, error: null };
  } catch (error) {
    console.error('Error listing audio files:', error);
    return { data: null, error };
  }
};

// Helper function to upload a file
export const uploadAudioFile = async (file, path) => {
  try {
    const audioRef = ref(storage, path);
    const result = await uploadBytes(audioRef, file);
    return { data: result, error: null };
  } catch (error) {
    console.error('Error uploading audio file:', error);
    return { data: null, error };
  }
};

// Main function: fetch all disks and their audio files
export const fetchAllAudioFiles = async (basePath = "CA1 Sound Revision") => {
  try {
    // Get all top-level “disk” folders dynamically
    const baseRef = ref(storage, basePath);
    const baseList = await listAll(baseRef);
    const diskPaths = baseList.prefixes.map(p => p.fullPath);

    const allDisks = [];

    for (const diskPath of diskPaths) {
      const files = await listAudioFilesRecursive(diskPath);

      const audioFiles = await Promise.all(
        files.map(async file => {
          const url = await getAudioUrl(file.path);

          // Parse track info from filename (e.g., "01 Song Title.mp3")
          const trackMatch = file.name.match(/^(\d+)\s+(.+)\.mp3$/);
          const trackNumber = trackMatch ? trackMatch[1] : "";
          const title = trackMatch ? trackMatch[2] : file.name.replace(".mp3", "");

          const displayDisk = diskPath.replace(`${basePath}/`, "");

          return {
            name: file.name,
            path: file.path,
            url,
            disk: displayDisk,
            title,
            trackNumber,
            category: "CA1",
            progress: 0,
          };
        })
      );

      // Sort by track number
      audioFiles.sort((a, b) => (parseInt(a.trackNumber) || 0) - (parseInt(b.trackNumber) || 0));

      allDisks.push({ disk: audioFiles[0]?.disk || diskPath, files: audioFiles });
    }

    return allDisks;
  } catch (err) {
    console.error("Error fetching audio files:", err);
    throw err;
  }
};