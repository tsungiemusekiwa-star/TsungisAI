import type { Dispatch, RefObject, SetStateAction } from "react";
import type { ResultsStateType } from "./shared.types";

// Audio File(.mp3 file) Type
export interface AudioFileType {
  name: string;
  path: string;
  url: string;
  disk: string;
  title: string;
  trackNumber: string;
  duration?: number;
  progress: number;
  category: 'CA1';
}

// Audio Disk(contains .mp3 files) type
export interface AudioDiskType {
  disk: string;
  files: AudioFileType[];
}

// Type for state that handles currently playing audio file
export type PlayerStateType = {
  isPlaying: boolean;
  currentTrack: number;
  currentTrackPath: string | null;
  currentFileUrl: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  trackProgress: { [trackId: string]: number };
  hasInitialSeek: boolean;
};

// Audio Controls Object Type
export interface AudioControlsType {
  playPause: (params: {
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
  }) => void;

  next: (params: {
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
    resultsState: ResultsStateType<AudioDiskType[]>;
    playerState: PlayerStateType;
  }) => void;

  previous: (params: {
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
    resultsState: ResultsStateType<AudioDiskType[]>;
    playerState: PlayerStateType;
  }) => void;

  seek: (params: {
    percentage: number;
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
    playerState: PlayerStateType;
    audioRef: RefObject<HTMLAudioElement | null>;
  }) => void;

  setVolume: (params: {
    volume: number;
    setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
    audioRef: RefObject<HTMLAudioElement | null>;
  }) => void;
}

// Type for the simplified controls passed to AudioPlayer
export interface AudioPlayerControlsType {
  playPause: () => void;
  next: () => void;
  previous: () => void;
  seek: (percentage: number) => void;
  setVolume: (volume: number) => void;
}

// Stats Object Type
export interface StatsObjectType {
  totalFiles: number;
  completedTracks: number;
  overallProgress: number;
}