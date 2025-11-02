import React, { useState, useEffect, useRef } from 'react';
import { listAudioFiles, getAudioUrl } from '../firebase/audioService.js';

interface AudioFile {
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

const AudioLearning = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('tsungi-ai-volume');
    return savedVolume ? parseFloat(savedVolume) : 1;
  });
  const [trackProgress, setTrackProgress] = useState<{ [key: string]: number }>({});
  const [expandedDisks, setExpandedDisks] = useState<{ [key: string]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load audio files from Firebase on component mount
  useEffect(() => {
    loadAudioFiles();
    loadTrackProgress();
  }, []);

  // Load track progress from localStorage
  const loadTrackProgress = () => {
    const savedProgress = localStorage.getItem('tsungi-ai-track-progress');
    if (savedProgress) {
      setTrackProgress(JSON.parse(savedProgress));
    }
  };

  // Save track progress to localStorage
  const saveTrackProgress = (filePath: string, progressPercent: number) => {
    const newProgress = { ...trackProgress, [filePath]: progressPercent };
    setTrackProgress(newProgress);
    localStorage.setItem('tsungi-ai-track-progress', JSON.stringify(newProgress));
    console.log(`Progress saved: ${filePath} - ${progressPercent}%`);
  };

  // Update audio element when current track changes
  useEffect(() => {
    if (audioRef.current && audioFiles[currentTrack]) {
      audioRef.current.src = audioFiles[currentTrack].url;
      audioRef.current.volume = volume;
      audioRef.current.load();
    }
  }, [currentTrack, audioFiles, volume]);

  // Ensure volume is applied when audio is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Keyboard shortcuts for audio control
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ': // Spacebar for play/pause
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowUp': // Volume up
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown': // Volume down
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'm': // Mute toggle
          e.preventDefault();
          handleVolumeChange(volume === 0 ? 1 : 0);
          break;
        case 'ArrowLeft': // Previous track
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight': // Next track
          e.preventDefault();
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [volume, isPlaying, currentTrack, audioFiles.length]);

  // Load and organize audio files from Firebase
  const loadAudioFiles = async () => {
    try {
      setLoading(true);
      console.log('Loading audio files from Firebase...');

      const allFiles: AudioFile[] = [];

      // Define the disk directories based on Firebase upload structure
      const diskDirectories = [
        'CA1-Sound-Revision/Disk 1 (Part 1- Part 2)',
        'CA1-Sound-Revision/Disk 2',
        'CA1-Sound-Revision/Disk 3',
        'CA1-Sound-Revision/Disk 4',
        'CA1-Sound-Revision/Disk 5'
      ];

      // Load files from each disk directory
      for (const diskDir of diskDirectories) {
        try {
          const { data: files, error: listError } = await listAudioFiles(diskDir);

          if (listError) {
            console.error(`Error loading files from ${diskDir}:`, listError);
            continue;
          }

          if (files) {
            const audioFilePromises = files
              .filter((file: any) => file.name.endsWith('.mp3'))
              .map(async (file: any) => {
                try {
                  const url = await getAudioUrl(file.path);

                  // Parse track info from filename
                  const trackMatch = file.name.match(/^(\d+)\s+(.+)\.mp3$/);
                  const trackNumber = trackMatch ? trackMatch[1] : '';
                  const title = trackMatch ? trackMatch[2] : file.name.replace('.mp3', '');

                  // Get just the disk name for display
                  const displayDisk = diskDir.replace('CA1-Sound-Revision/', '');

                  return {
                    name: file.name,
                    path: file.path,
                    url: url,
                    disk: displayDisk,
                    title: title,
                    trackNumber: trackNumber,
                    category: 'CA1' as const,
                    progress: 0
                  };
                } catch (error) {
                  console.error(`Error getting URL for ${file.name}:`, error);
                  return null;
                }
              });

            const resolvedFiles = await Promise.all(audioFilePromises);
            const validFiles = resolvedFiles.filter(Boolean) as AudioFile[];
            allFiles.push(...validFiles);
          }
        } catch (error) {
          console.error(`Error loading ${diskDir}:`, error);
        }
      }

      // Sort files by disk and track number
      allFiles.sort((a, b) => {
        const diskOrder = ['Disk 1 (Part 1- Part 2)', 'Disk 2', 'Disk 3', 'Disk 4', 'Disk 5'];
        const diskA = diskOrder.indexOf(a.disk);
        const diskB = diskOrder.indexOf(b.disk);

        if (diskA !== diskB) {
          return diskA - diskB;
        }

        return parseInt(a.trackNumber) - parseInt(b.trackNumber);
      });

      setAudioFiles(allFiles);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audio files');
    } finally {
      setLoading(false);
    }
  };

  // Audio player controls
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentTrack < audioFiles.length - 1) {
      setCurrentTrack(currentTrack + 1);
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioFiles.length > 0 && audioFiles[currentTrack]) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;

      setCurrentTime(current);

      // Calculate and save progress percentage
      if (total > 0 && !isNaN(total)) {
        const progressPercent = Math.min(100, Math.round((current / total) * 100));
        const currentFile = audioFiles[currentTrack];

        if (currentFile && currentFile.path) {
          // Save progress every 2% increment or every 10 seconds, whichever comes first
          const lastSavedProgress = trackProgress[currentFile.path] || 0;
          if (progressPercent > lastSavedProgress + 1 || progressPercent === 100) {
            saveTrackProgress(currentFile.path, progressPercent);
          }
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem('tsungi-ai-volume', newVolume.toString());
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleDiskExpansion = (diskName: string) => {
    setExpandedDisks(prev => ({
      ...prev,
      [diskName]: !prev[diskName]
    }));
  };

  const currentAudioFile = audioFiles[currentTrack];
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Calculate overall stats from trackProgress
  const completedTracks = Object.values(trackProgress).filter(progress => progress >= 100).length;
  const totalTracks = audioFiles.length;
  const overallProgress = totalTracks > 0 ? Math.round((Object.values(trackProgress).reduce((sum, progress) => sum + progress, 0) / totalTracks)) : 0;

  // Group files by disk for display
  const groupedFiles = audioFiles.reduce((groups, file) => {
    const diskName = file.disk;
    if (!groups[diskName]) {
      groups[diskName] = [];
    }
    groups[diskName].push(file);
    return groups;
  }, {} as { [key: string]: AudioFile[] });

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Audio Learning Hub
            </h1>
            <p className="text-muted-foreground">Loading your CA1 audio library...</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content p-8 text-center">
            <div className="animate-spin icon-lg mx-auto mb-4 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
            </div>
            <p className="text-muted-foreground">Loading audio files...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Audio Learning Hub
            </h1>
            <p className="text-muted-foreground">Failed to load audio library</p>
          </div>
        </div>
        <div className="alert alert-destructive">
          <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span>{error}</span>
        </div>
        <button onClick={loadAudioFiles} className="btn btn-primary w-full">
          <svg className="icon-sm mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23,4 23,10 17,10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6" style={{ width: '100%', maxWidth: 'none' }}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        <div className="card">
          <div className="card-content p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                <svg className="icon-sm md:icon-md text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-2xl font-bold">{audioFiles.length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Lessons</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-secondary rounded-lg md:rounded-xl flex items-center justify-center">
                <svg className="icon-sm md:icon-md text-secondary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-2xl font-bold">{completedTracks}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-lg md:rounded-xl flex items-center justify-center">
                <svg className="icon-sm md:icon-md text-accent-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg md:text-2xl font-bold">{overallProgress}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {currentAudioFile && (
        <div className="card">
          <div className="card-header pb-3 md:pb-6">
            <h2 className="card-title text-lg md:text-xl">Now Playing</h2>
          </div>
          <div className="card-content space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                <svg className="icon-md md:icon-lg text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              </div>
              <div className="flex-1" style={{ minWidth: '0' }}>
                <h3 className="font-semibold text-sm md:text-base" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentAudioFile.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Track {currentAudioFile.trackNumber} • {currentAudioFile.disk}
                </p>
              </div>
              <div className="badge badge-secondary text-xs">{currentAudioFile.category}</div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div
                className="audio-progress"
                onClick={handleSeek}
              >
                <div
                  className="audio-progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <button
                className="btn btn-outline btn-sm rounded-full"
                style={{ width: '40px', height: '40px' }}
                onClick={handlePrevious}
                disabled={currentTrack === 0}
              >
                <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="19,20 9,12 19,4"/>
                  <line x1="5" y1="19" x2="5" y2="5"/>
                </svg>
              </button>
              <button
                className="btn btn-primary btn-lg rounded-full"
                style={{
                  width: '48px',
                  height: '48px',
                  position: 'relative'
                }}
                onClick={handlePlayPause}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b46c1" stroke="none">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b46c1" stroke="none">
                      <polygon points="8,5 19,12 8,19"/>
                    </svg>
                  )}
                </div>
              </button>
              <button
                className="btn btn-outline btn-sm rounded-full"
                style={{ width: '40px', height: '40px' }}
                onClick={handleNext}
                disabled={currentTrack === audioFiles.length - 1}
              >
                <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,4 15,12 5,20"/>
                  <line x1="19" y1="5" x2="19" y2="19"/>
                </svg>
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 justify-center">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
              >
                {volume === 0 ? (
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                ) : (
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                )}
              </button>
              <div style={{ width: '96px' }}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '4px',
                    background: 'var(--muted)',
                    borderRadius: 'var(--radius)',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track List by Disk */}
      <div className="space-y-4">
        {Object.entries(groupedFiles).map(([diskName, files]) => (
          <div key={diskName} className="card">
            <div className="card-header pb-3 md:pb-6">
              <button
                className="w-full text-left"
                style={{ background: 'transparent', border: 'none', color: 'inherit' }}
                onClick={() => toggleDiskExpansion(diskName)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-base md:text-lg">{diskName}</h2>
                  <div className="flex items-center gap-4">
                    <div className="badge badge-secondary">
                      {files.length} tracks
                    </div>
                    <svg
                      className={`icon-sm transition-transform ${expandedDisks[diskName] ? 'rotate-90' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            {expandedDisks[diskName] && (
              <div className="card-content space-y-2 md:space-y-3 pt-0">
                {files.map((file, index) => {
                  const globalIndex = audioFiles.findIndex(f => f.path === file.path);
                  const isCurrentTrack = globalIndex === currentTrack;
                  const fileProgress = trackProgress[file.path] || 0;

                  return (
                    <div
                      key={file.path}
                      className={`flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl border transition-all cursor-pointer hover:bg-card ${
                        isCurrentTrack ? 'bg-primary text-primary-foreground border-primary' : 'bg-card'
                      }`}
                      onClick={() => {
                        setCurrentTrack(globalIndex);
                        setIsPlaying(false);
                      }}
                      style={{
                        backgroundColor: isCurrentTrack ? 'hsl(var(--primary) / 0.1)' : undefined,
                        borderColor: isCurrentTrack ? 'hsl(var(--primary) / 0.2)' : undefined
                      }}
                    >
                      <div
                        className="rounded-md md:rounded-lg flex items-center justify-center relative"
                        style={{
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          background: 'var(--muted)',
                          boxShadow: 'var(--shadow-neumorph-inset)',
                          border: '1px solid var(--border)'
                        }}
                      >
                        {fileProgress >= 100 ? (
                          <svg className="icon-sm" viewBox="0 0 24 24" fill="var(--progress)" stroke="none" style={{ color: 'var(--progress)' }}>
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="16,10 12,14 8,12" fill="none" stroke="white" strokeWidth="2"/>
                          </svg>
                        ) : (
                          <span className="text-xs font-bold text-primary">{file.trackNumber}</span>
                        )}
                      </div>
                      <div className="flex-1" style={{ minWidth: '0' }}>
                        <h4 className="font-medium text-sm md:text-base" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.title}</h4>
                        <p className="text-xs text-muted-foreground">Track {file.trackNumber}</p>
                      </div>
                      <div style={{ width: '48px' }}>
                        <div className="progress">
                          <div
                            className="progress-indicator"
                            style={{ width: `${fileProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-center">{fileProgress}%</p>
                      </div>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(file.url, '_blank');
                        }}
                      >
                        <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7,10 12,5 17,10"/>
                          <line x1="12" y1="5" x2="12" y2="15"/>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioLearning;