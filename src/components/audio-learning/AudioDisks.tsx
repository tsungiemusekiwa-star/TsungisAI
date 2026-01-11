import type { AudioDiskType, PlayerStateType } from "@/types/audio-learning.types";
import type { Dispatch, SetStateAction } from "react";

interface AudioDisksProps {
  disks: AudioDiskType[];
  toggleDiskExpansion: (diskName: string) => void;
  expandedDisks: { [key: string]: boolean };
  playerState: PlayerStateType;
  setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
}

const AudioDisks = ({ disks, toggleDiskExpansion, expandedDisks, playerState, setPlayerState }: AudioDisksProps) => {
  return (
    <div className="space-y-4">
      {disks.map((disk, idx) => {
        const { disk: diskName, files } = disk;

        return (
          <div key={idx} className="card">
            <div className="card-header pb-3 md:pb-6">
              <button
                className="w-full text-left"
                style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}
                onClick={() => toggleDiskExpansion(diskName)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-base md:text-lg">
                    {diskName}
                  </h2>

                  <div className="flex items-center gap-4">
                    <div className="badge badge-secondary">
                      {files.length} tracks
                    </div>

                    <svg
                      className={`icon-sm transition-transform ${expandedDisks[diskName] ? "rotate-90" : ""
                        }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9,18 15,12 9,6" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {expandedDisks[diskName] && (
              <div className="card-content space-y-2 md:space-y-3 pt-0">
                {files.map((file) => {
                  const isCurrentTrack = playerState.currentTrackPath === file.path;
                  const fileProgress = playerState.trackProgress[file.path] || file.progress;

                  return (
                    <div
                      key={file.path}
                      className={`flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl border transition-all cursor-pointer hover:bg-card ${isCurrentTrack ? "bg-primary/10 border-primary" : ""
                        }`}
                      onClick={() => {
                        const allFiles = disks.flatMap(d => d.files);
                        const trackIndex = allFiles.findIndex(f => f.path === file.path);

                        setPlayerState(prev => ({
                          ...prev,
                          currentTrackPath: file.path,
                          currentFileUrl: file.url,
                          currentTrack: trackIndex,
                          isPlaying: true,
                        }));
                      }}
                    >
                      <div
                        className="rounded-md md:rounded-lg flex items-center justify-center relative"
                        style={{
                          width: 32,
                          height: 32,
                          minWidth: 32,
                          background: isCurrentTrack ? "var(--primary)" : "var(--muted)",
                          boxShadow: "var(--shadow-neumorph-inset)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {fileProgress >= 100 ? (
                          <svg
                            className="icon-sm"
                            viewBox="0 0 24 24"
                            fill="var(--primary)"
                            stroke="none"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline
                              points="16,10 12,14 8,12"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                            />
                          </svg>
                        ) : isCurrentTrack ? (
                          <span className="text-xs font-bold text-primary-foreground">
                            {file.trackNumber}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-primary">
                            {file.trackNumber}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm md:text-base truncate ${isCurrentTrack ? "text-primary" : ""
                          }`}>
                          {file.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Track {file.trackNumber}
                        </p>
                      </div>

                      <div style={{ width: 48 }}>
                        <div className="progress">
                          <div
                            className="progress-indicator"
                            style={{ width: `${fileProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          {fileProgress}%
                        </p>
                      </div>

                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(file.url, "_blank");
                        }}
                      >
                        <svg
                          className="icon-sm"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7,10 12,15 17,10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AudioDisks;