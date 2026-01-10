import type { AudioControlsType, AudioDiskType, AudioFileType, PlayerStateType } from "@/types/audio-learning.types";
import type { ResultsStateType } from "@/types/shared.types";
import { fetchAllAudioFiles } from '@/firebase/audioService.js';
import type { Dispatch, SetStateAction } from "react";


// Default values for the player state
export const DefaultPlayerStateValues: PlayerStateType = {
  isPlaying: false,
  currentTrack: 0,
  currentTime: 0,
  duration: 0,
  volume: (() => {
    const savedVolume = localStorage.getItem('tsungi-ai-volume');
    return savedVolume ? parseFloat(savedVolume) : 1;
  })(),
  trackProgress: {},
  currentTrackPath: null,
  currentFileUrl: null
};

// Load and organize audio files from Firebase
export const loadAudioFiles = async (
  setResultsState: (value: ResultsStateType<AudioDiskType[]>) => void
) => {
  try {
    const audioDisks: AudioDiskType[] = await fetchAllAudioFiles();

    if (audioDisks.length < 1) {
      setResultsState(null);
      return;
    }

    // Load all saved progress from localStorage (as a single JSON object)
    const savedProgressString = localStorage.getItem("tsungi-ai-track-progress");
    const savedProgress: { [trackPath: string]: number } = savedProgressString
      ? JSON.parse(savedProgressString)
      : {};

    const hydratedDisks: AudioDiskType[] = audioDisks.map(disk => ({
      ...disk,
      files: disk.files.map(file => {

        // Get progress from the parsed object using the file path as key
        const fileProgress = savedProgress[file.path] || 0;

        return {
          ...file,
          progress: fileProgress,
        };
      }),
    }));

    setResultsState(hydratedDisks);
  } catch (err) {
    console.error("Error fetching audio files", err);
    setResultsState("error");
  }
};

// Object with properties that control the 'current' playing audio
export const audioControls: AudioControlsType = {
  playPause: ({ setPlayerState }) => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  },

  next: ({ setPlayerState, resultsState, playerState }) => {
    if (!Array.isArray(resultsState)) return;
    const allFiles = resultsState.flatMap(disk => disk.files);
    const currentIndex = allFiles.findIndex(f => f.path === playerState.currentTrackPath);
    if (currentIndex < allFiles.length - 1) {
      const nextFile = allFiles[currentIndex + 1];
      setPlayerState(prev => ({
        ...prev,
        currentTrackPath: nextFile.path,
        currentFileUrl: nextFile.url,  // Add this
        currentTrack: currentIndex + 1,
        isPlaying: true
      }));
    }
  },

  previous: ({ setPlayerState, resultsState, playerState }) => {
    if (!Array.isArray(resultsState)) return;
    const allFiles = resultsState.flatMap(disk => disk.files);
    const currentIndex = allFiles.findIndex(f => f.path === playerState.currentTrackPath);
    if (currentIndex > 0) {
      const prevFile = allFiles[currentIndex - 1];
      setPlayerState(prev => ({
        ...prev,
        currentTrackPath: prevFile.path,
        currentFileUrl: prevFile.url,  // Add this
        currentTrack: currentIndex - 1,
        isPlaying: true
      }));
    }
  },

  seek: ({ percentage, setPlayerState, playerState, audioRef }) => {
    if (audioRef.current) {
      const newTime = (percentage / 100) * playerState.duration;
      audioRef.current.currentTime = newTime;
      setPlayerState(prev => ({ ...prev, currentTime: newTime }));
    }
  },

  setVolume: ({ volume, setPlayerState, audioRef }) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setPlayerState(prev => ({ ...prev, volume }));
    }
  }
};

// Update player state with audio duration once metadata is loaded
export const handleLoadedMetadata = (
  audioElement: HTMLAudioElement | null,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerStateType>>
): void => {
  if (audioElement) {
    setPlayerState(prev => ({
      ...prev,
      duration: audioElement.duration
    }));
  }
};

// Handle track completion and auto-play next track if available
export const handleEnded = (
  resultsState: ResultsStateType<AudioDiskType[]>,
  playerState: PlayerStateType,
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerStateType>>
): void => {
  if (!Array.isArray(resultsState)) return;

  const allFiles = resultsState.flatMap(disk => disk.files);
  const currentIndex = allFiles.findIndex(f => f.path === playerState.currentTrackPath);

  if (currentIndex < allFiles.length - 1) {
    const nextFile = allFiles[currentIndex + 1];
    setPlayerState(prev => ({
      ...prev,
      currentTrackPath: nextFile.path,
      currentTrack: currentIndex + 1,
      isPlaying: true
    }));
  } else {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }
};

// Toggle visibility of files within a disk category
export const toggleDiskExpansion = (
  diskName: string,
  setExpandedDisks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): void => {
  setExpandedDisks(prev => ({
    ...prev,
    [diskName]: !prev[diskName]
  }));
};

// Retrieve the currently playing audio file object
export const getCurrentAudioFile = (
  resultsState: ResultsStateType<AudioDiskType[]>,
  currentTrackPath: string | null
): AudioFileType | null => {
  if (!Array.isArray(resultsState) || !currentTrackPath) return null;

  const allFiles = resultsState.flatMap(disk => disk.files);
  return allFiles.find(f => f.path === currentTrackPath) || null;
};

// Handle audio playback based on current state
export const handleAudioPlayback = (
  audioElement: HTMLAudioElement | null,
  isPlaying: boolean,
  currentTrackPath: string | null
): void => {
  if (!audioElement) return;

  if (!currentTrackPath) {
    console.log("No track path set");
    return;
  }

  if (isPlaying) {
    audioElement.play().catch(err => {
      console.error("Error Playing Audio Note");
    });
  } else {
    audioElement.pause();
  }
};

// Update Time Displayed & Handle Progress Tracking in LocalStorage
export function handleTimeUpdate(
  audioEl: HTMLAudioElement | null,
  setPlayerState: Dispatch<SetStateAction<PlayerStateType>>
) {
  if (!audioEl) return;

  const { currentTime, duration } = audioEl;

  if (!duration || isNaN(duration)) return;

  const progressPercent = Math.min(
    100,
    Math.round((currentTime / duration) * 100)
  );

  setPlayerState(prev => {
    if (!prev.currentTrackPath) return prev;

    const trackPath = prev.currentTrackPath;
    const lastSaved = prev.trackProgress[trackPath] ?? 0;

    // Only save if progress advanced by >= 2% or finished
    if (progressPercent < lastSaved + 2 && progressPercent !== 100) {
      return {
        ...prev,
        currentTime
      };
    }

    const updatedProgress = {
      ...prev.trackProgress,
      [trackPath]: progressPercent
    };

    // Persist to localStorage
    localStorage.setItem(
      "tsungi-ai-track-progress",
      JSON.stringify(updatedProgress)
    );

    return {
      ...prev,
      currentTime,
      trackProgress: updatedProgress
    };
  });
}
