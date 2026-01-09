// Audio File(.mp3 file) Type
export interface AudioFileType {
    name: string;
    path: string;
    url: string;
    disk: string;
    title: string;
    trackNumber: string;
    duration?: string;
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
  currentTime: number;
  duration: number;
  volume: number;
  trackProgress: { [trackId: string]: number };
};