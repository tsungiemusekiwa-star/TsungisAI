import { useState, useEffect, useRef, useMemo } from 'react';
import { type PlayerStateType, type AudioDiskType, type StatsObjectType } from '@/types/audio-learning.types.js';
import type { ResultsStateType } from '@/types/shared.types.js';
import { audioControls, DefaulStatsObject, DefaultPlayerStateValues, getCurrentAudioFile, handleAudioPlayback, handleEnded, handleLoadedMetadata, handleTimeUpdate, loadAudioFiles, toggleDiskExpansion } from '@/utils/audio-learning.utils.js';
import AudioDisks from '@/components/audio-learning/AudioDisks';
import AudioPlayer from '@/components/audio-learning/AudioPlayer';
import ErrorUI from '@/components/audio-learning/ErrorUI';
import LoadingUI from '@/components/audio-learning/LoadingUI';
import StatsCards from '@/components/audio-learning/StatsCards';

const AudioLearning = () => {
  const [resultsState, setResultsState] = useState<ResultsStateType<AudioDiskType[]>>("loading");
  const [playerState, setPlayerState] = useState<PlayerStateType>(DefaultPlayerStateValues);
  const [expandedDisks, setExpandedDisks] = useState<{ [key: string]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement>(null);
  const [statsObject, setStatsObject] = useState<StatsObjectType>(DefaulStatsObject);

  // Load audio files from Firebase on component mount
  useEffect(() => {
    loadAudioFiles(setResultsState, setStatsObject);
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    handleAudioPlayback(audioRef.current, playerState.isPlaying, playerState.currentTrackPath);
  }, [playerState.isPlaying, playerState.currentTrackPath]);


  // Expand Disk to see mp3 files
  const handleToggleDiskExpansion = (diskName: string) => {
    toggleDiskExpansion(diskName, setExpandedDisks);
  }

  // Get current audio file
  const currentAudioFile = getCurrentAudioFile(resultsState, playerState.currentTrackPath);

  // Calculate all files once and memoize
  const allFiles = useMemo(() => {
    if (!Array.isArray(resultsState)) return [];
    return resultsState.flatMap(disk => disk.files);
  }, [resultsState]);

  // Handle Audio Controls
  const handleAudioControls = {

    playPause: () => {
      // Don't play if no track is selected
      if (!playerState.currentTrackPath) {
        console.warn("No track selected");
        return;
      }
      audioControls.playPause({ setPlayerState });
    },

    next: () => {
      audioControls.next({ setPlayerState, resultsState, playerState });
    },

    previous: () => {
      audioControls.previous({ setPlayerState, resultsState, playerState });
    },

    seek: (percentage: number) => {
      audioControls.seek({ percentage, setPlayerState, playerState, audioRef });
    },

    setVolume: (volume: number) => {
      audioControls.setVolume({ volume, setPlayerState, audioRef });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6" style={{ width: '100%', maxWidth: 'none' }}>

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
      <LoadingUI resultsState={resultsState} />

      {/* Error state */}
      <ErrorUI resultsState={resultsState} setResultsState={setResultsState} loadAudioFiles={loadAudioFiles} setStatsObject={setStatsObject} />

      {/* Audio Files Successfully Returned */}
      {Array.isArray(resultsState) && resultsState.length > 0 && (
        <>

          {/* Stats Cards */}
          <StatsCards statsObject={statsObject} />

          {/* Audio Player - only show if a track is selected */}
          {playerState.currentTrackPath && (
            <>
              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={playerState.currentFileUrl || undefined}
                onTimeUpdate={() => handleTimeUpdate(audioRef.current, setPlayerState, setStatsObject, resultsState)}
                onLoadedMetadata={() => handleLoadedMetadata(audioRef.current, setPlayerState)}
                onEnded={() => handleEnded(resultsState, playerState, setPlayerState)}
                onError={(e) => {
                  console.error("Audio error:", e);
                  console.error("Failed src:", playerState.currentFileUrl);
                }}
              />

              <AudioPlayer
                playerState={playerState}
                currentAudioFile={currentAudioFile}
                audioControls={handleAudioControls}
                allFiles={allFiles}
              />
            </>
          )}

          {/* Track List by Disk */}
          <AudioDisks
            disks={resultsState}
            toggleDiskExpansion={handleToggleDiskExpansion}
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