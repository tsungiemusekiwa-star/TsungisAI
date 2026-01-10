import type { PlayerStateType, AudioFileType, AudioPlayerControlsType } from "@/types/audio-learning.types";

interface AudioPlayerProps {
    playerState: PlayerStateType;
    currentAudioFile: AudioFileType | null;
    audioControls: AudioPlayerControlsType;
    allFiles: AudioFileType[];
}

const AudioPlayer = ({ playerState, currentAudioFile, audioControls, allFiles }: AudioPlayerProps) => {
    // Don't render anything if no audio file is selected
    if (!currentAudioFile) return null;

    // Calculate progress bar fill percentage based on current time and total duration
    const progressPercentage = playerState.duration > 0
        ? (playerState.currentTime / playerState.duration) * 100
        : 0;

    // Convert seconds to MM:SS format for display
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle clicks on progress bar to seek to a specific position
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        audioControls.seek(percentage);
    };

    // Determine current track position in playlist to enable/disable prev/next buttons
    const currentIndex = allFiles.findIndex(f => f.path === playerState.currentTrackPath);
    const isFirstTrack = currentIndex === 0;
    const isLastTrack = currentIndex === allFiles.length - 1;

    return (
        <div className="card">
            <div className="card-header pb-3 md:pb-6">
                <h2 className="card-title text-lg md:text-xl">Now Playing</h2>
            </div>
            <div className="card-content space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg className="icon-md md:icon-lg text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    </div>
                    <div className="flex-1" style={{ minWidth: '0' }}>
                        <h3 className="font-semibold text-sm md:text-base" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {currentAudioFile.title}
                        </h3>
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
                        style={{ cursor: 'pointer' }}
                    >
                        <div
                            className="audio-progress-fill"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatTime(playerState.currentTime)}</span>
                        <span>{formatTime(playerState.duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 md:gap-4">
                    <button
                        className="btn btn-outline btn-sm rounded-full"
                        style={{ width: '40px', height: '40px' }}
                        onClick={audioControls.previous}
                        disabled={isFirstTrack}
                    >
                        <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="19,20 9,12 19,4" />
                            <line x1="5" y1="19" x2="5" y2="5" />
                        </svg>
                    </button>
                    <button
                        className="btn btn-primary btn-lg rounded-full"
                        style={{
                            width: '48px',
                            height: '48px',
                            position: 'relative'
                        }}
                        onClick={audioControls.playPause}
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
                            {playerState.isPlaying ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b46c1" stroke="none">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b46c1" stroke="none">
                                    <polygon points="8,5 19,12 8,19" />
                                </svg>
                            )}
                        </div>
                    </button>
                    <button
                        className="btn btn-outline btn-sm rounded-full"
                        style={{ width: '40px', height: '40px' }}
                        onClick={audioControls.next}
                        disabled={isLastTrack}
                    >
                        <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5,4 15,12 5,20" />
                            <line x1="19" y1="5" x2="19" y2="19" />
                        </svg>
                    </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 justify-center">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => audioControls.setVolume(playerState.volume === 0 ? 1 : 0)}
                    >
                        {playerState.volume === 0 ? (
                            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        ) : playerState.volume < 0.5 ? (
                            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        ) : (
                            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        )}
                    </button>
                    <div style={{ width: '96px' }}>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={playerState.volume}
                            onChange={(e) => audioControls.setVolume(parseFloat(e.target.value))}
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
    );
};

export default AudioPlayer;