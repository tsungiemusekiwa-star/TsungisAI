import type { StatsObjectType } from "@/types/audio-learning.types"

interface StatsCardsProps {
    statsObject: StatsObjectType
}

const StatsCards = ({ statsObject }: StatsCardsProps) => {
    

    return (
        <>
            {/* Total Files */}
            <div className="grid grid-cols-3 gap-3 md:gap-6">
                <div className="card">
                    <div className="card-content p-3 md:p-6">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-lg md:rounded-xl flex items-center justify-center">
                                <svg className="icon-sm md:icon-md text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                </svg>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-lg md:text-2xl font-bold">{statsObject.totalFiles}</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Lessons</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Completed Tracks */}
                <div className="card">
                    <div className="card-content p-3 md:p-6">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-12 md:h-12 bg-secondary rounded-lg md:rounded-xl flex items-center justify-center">
                                <svg className="icon-sm md:icon-md text-secondary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12,6 12,12 16,14" />
                                </svg>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-lg md:text-2xl font-bold">{statsObject.completedTracks}</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Progress */}
                <div className="card">
                    <div className="card-content p-3 md:p-6">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                            <div className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-lg md:rounded-xl flex items-center justify-center">
                                <svg className="icon-sm md:icon-md text-accent-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                                </svg>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-lg md:text-2xl font-bold">{statsObject.overallProgress}%</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatsCards