import { useState, useEffect, useRef } from 'react';
import { type PlayerStateType, type AudioDiskType, type AudioFileType } from '@/types/audio-learning.types.js';
import type { ResultsStateType } from '@/types/shared.types.js';
import { DefaultPlayerStateValues, loadAudioFiles } from '@/utils/audio-learning.utils.js';
import AudioDisks from '@/components/audio-learning/AudioDisks';
import AudioPlayer from '@/components/audio-learning/AudioPlayer';

const AudioLearning = () => {
  const [resultsState, setResultsState] = useState<ResultsStateType<AudioDiskType[]>>("loading");
  const [playerState, setPlayerState] = useState<PlayerStateType>(DefaultPlayerStateValues);
  const [expandedDisks, setExpandedDisks] = useState<{ [key: string]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load audio files from Firebase on component mount
  useEffect(() => {
    loadAudioFiles(setResultsState);
  }, []);

  // Update audio element when current track changes
  useEffect(() => {
    if (!audioRef.current || !playerState.currentTrackPath) return;

    audioRef.current.src = playerState.currentTrackPath;
    audioRef.current.volume = playerState.volume;
    audioRef.current.load();
    
    if (playerState.isPlaying) {
      audioRef.current.play();
    }
  }, [playerState.currentTrackPath]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playerState.isPlaying]);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime
      }));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setPlayerState(prev => ({
        ...prev,
        duration: audioRef.current!.duration
      }));
    }
  };

  const handleEnded = () => {
    if (!Array.isArray(resultsState)) return;
    
    // Find next track
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

  // Audio controls
  const audioControls = {
    playPause: () => {
      setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    },
    
    next: () => {
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
      }
    },
    
    previous: () => {
      if (!Array.isArray(resultsState)) return;
      const allFiles = resultsState.flatMap(disk => disk.files);
      const currentIndex = allFiles.findIndex(f => f.path === playerState.currentTrackPath);
      
      if (currentIndex > 0) {
        const prevFile = allFiles[currentIndex - 1];
        setPlayerState(prev => ({
          ...prev,
          currentTrackPath: prevFile.path,
          currentTrack: currentIndex - 1,
          isPlaying: true
        }));
      }
    },
    
    seek: (percentage: number) => {
      if (audioRef.current) {
        const newTime = (percentage / 100) * playerState.duration;
        audioRef.current.currentTime = newTime;
        setPlayerState(prev => ({ ...prev, currentTime: newTime }));
      }
    },
    
    setVolume: (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        setPlayerState(prev => ({ ...prev, volume }));
      }
    }
  };

  // Expand Disk to see mp3 files
  const toggleDiskExpansion = (diskName: string) => {
    setExpandedDisks(prev => ({
      ...prev,
      [diskName]: !prev[diskName]
    }));
  };

  // Get current audio file
  const getCurrentAudioFile = (): AudioFileType | null => {
    if (!Array.isArray(resultsState) || !playerState.currentTrackPath) return null;
    const allFiles = resultsState.flatMap(disk => disk.files);
    return allFiles.find(f => f.path === playerState.currentTrackPath) || null;
  };

  return (
    <div className="space-y-4 md:space-y-6" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-4xl font-bold gradient-text">
          Audio Learning Hub
        </h1>
        <p className="text-muted-foreground text-sm md:text-lg">
          Master actuarial concepts through comprehensive audio lessons
        </p>
      </div>

      {/* Loading state */}
      {resultsState === "loading" && (
        <div className="space-y-6">
          <div className="card">
            <div className="card-content p-8 text-center">
              <div className="animate-spin icon-lg mx-auto mb-4 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
              </div>
              <p className="text-muted-foreground">Loading audio files...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {resultsState === "error" && (
        <div className="space-y-6">
          <div className="alert alert-destructive">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>An unexpected error occurred</span>
          </div>
          <button onClick={() => loadAudioFiles(setResultsState)} className="btn btn-primary w-full">
            <svg className="icon-sm mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23,4 23,10 17,10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Retry Loading
          </button>
        </div>
      )}

      {/* Audio Files Successfully Returned */}
      {Array.isArray(resultsState) && resultsState.length > 0 && (
        <>
          {/* Audio Player - only show if a track is selected */}
          {playerState.currentTrackPath && (
            <AudioPlayer 
              playerState={playerState}
              currentAudioFile={getCurrentAudioFile()}
              audioControls={audioControls}
              allFiles={resultsState.flatMap(disk => disk.files)}
            />
          )}

          {/* Track List by Disk */}
          <AudioDisks 
            disks={resultsState} 
            toggleDiskExpansion={toggleDiskExpansion} 
            expandedDisks={expandedDisks} 
            playerState={playerState} 
            setPlayerState={setPlayerState} 
          />
        </>
      )}
    </div>
  );
};

export default AudioLearning;