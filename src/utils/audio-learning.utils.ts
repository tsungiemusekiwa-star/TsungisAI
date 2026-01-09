import type { AudioDiskType, PlayerStateType } from "@/types/audio-learning.types";
import type { ResultsStateType } from "@/types/shared.types";
import { fetchAllAudioFiles } from '@/firebase/audioService.js';
import type { Dispatch, RefObject, SetStateAction } from "react";

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
};

// Load and organize audio files from Firebase
export const loadAudioFiles = async (
  setResultsState: (value: ResultsStateType<AudioDiskType[]>) => void
) => {
  try {
    const audioFiles = await fetchAllAudioFiles();
    if (audioFiles.length < 1) {
      setResultsState(null);
    }
    setResultsState(audioFiles);
    //   const allFiles: AudioFileType[] = [];

    //   // Define the disk directories based on Firebase upload structure
    //   const diskDirectories = [
    //     'CA1-Sound-Revision/Disk 1 (Part 1- Part 2)',
    //     'CA1-Sound-Revision/Disk 2',
    //     'CA1-Sound-Revision/Disk 3',
    //     'CA1-Sound-Revision/Disk 4',
    //     'CA1-Sound-Revision/Disk 5'
    //   ];

    //   // Load files from each disk directory
    //   for (const diskDir of diskDirectories) {
    //     try {
    //       const { data: files, error: listError } = await listAudioFiles(diskDir);

    //       if (listError) {
    //         console.error(`Error loading files from ${diskDir}:`, listError);
    //         continue;
    //       }

    //       if (files) {
    //         const audioFilePromises = files
    //           .filter((file: any) => file.name.endsWith('.mp3'))
    //           .map(async (file: any) => {
    //             try {
    //               const url = await getAudioUrl(file.path);

    //               // Parse track info from filename
    //               const trackMatch = file.name.match(/^(\d+)\s+(.+)\.mp3$/);
    //               const trackNumber = trackMatch ? trackMatch[1] : '';
    //               const title = trackMatch ? trackMatch[2] : file.name.replace('.mp3', '');

    //               // Get just the disk name for display
    //               const displayDisk = diskDir.replace('CA1-Sound-Revision/', '');

    //               return {
    //                 name: file.name,
    //                 path: file.path,
    //                 url: url,
    //                 disk: displayDisk,
    //                 title: title,
    //                 trackNumber: trackNumber,
    //                 category: 'CA1' as const,
    //                 progress: 0
    //               };
    //             } catch (error) {
    //               console.error(`Error getting URL for ${file.name}:`, error);
    //               return null;
    //             }
    //           });

    //         const resolvedFiles = await Promise.all(audioFilePromises);
    //         const validFiles = resolvedFiles.filter(Boolean) as AudioFile[];
    //         allFiles.push(...validFiles);
    //       }
    //     } catch (error) {
    //       console.error(`Error loading ${diskDir}:`, error);
    //     }
    //   }

    //   // Sort files by disk and track number
    //   allFiles.sort((a, b) => {
    //     const diskOrder = ['Disk 1 (Part 1- Part 2)', 'Disk 2', 'Disk 3', 'Disk 4', 'Disk 5'];
    //     const diskA = diskOrder.indexOf(a.disk);
    //     const diskB = diskOrder.indexOf(b.disk);

    //     if (diskA !== diskB) {
    //       return diskA - diskB;
    //     }

    //     return parseInt(a.trackNumber) - parseInt(b.trackNumber);
    //   });

    //   setAudioFiles(allFiles);
    //   setError(null);
  } catch (err) {
    console.error("Error fetching audio files");
    setResultsState("error");
  }
};

// Object with properties that control the 'current' playing audio
export const audioControls = {
  playPause(
    audioRef: RefObject<HTMLAudioElement>,
    playerState: PlayerStateType,
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>
  ) {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  },

  setVolume(
    audioRef: RefObject<HTMLAudioElement>,
    volume: number,
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>
  ) {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

    localStorage.setItem("tsungi-ai-volume", volume.toString());

    setPlayerState(prev => ({
      ...prev,
      volume,
    }));
  },

  timeUpdate(
    audioRef: RefObject<HTMLAudioElement>,
    currentTrackPath: string | null,
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>
  ) {
    if (!audioRef.current || !currentTrackPath) return;

    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;

    const progress =
      duration > 0 ? Math.round((currentTime / duration) * 100) : 0;

    setPlayerState(prev => ({
      ...prev,
      currentTime,
      duration,
      trackProgress: {
        ...prev.trackProgress,
        [currentTrackPath]: progress,
      },
    }));
  },

  loadedMetadata(
    audioRef: RefObject<HTMLAudioElement>,
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>
  ) {
    if (!audioRef.current) return;

    setPlayerState(prev => ({
      ...prev,
      duration: audioRef.current!.duration,
    }));
  },

  seek(
    audioRef: RefObject<HTMLAudioElement>,
    duration: number,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (!audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    audioRef.current.currentTime = percentage * duration;
  },
};