// Firebase Storage service for audio files
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