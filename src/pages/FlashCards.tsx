import { ComingSoon } from "@/components/global/ComingSoon";
import { useLayoutEffect } from "react";

const FlashCards = () => {
    useLayoutEffect(() => {
        document.title = "Flash Cards | Tsungi's AI";
    }, []);
    return (


        <>
            <ComingSoon
                title="Flash Cards"
                description="Strengthen your understanding and memory using interactive flashcards built for A311. This feature will help reinforce key concepts through active recall."
                icon={
                    <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                        <rect x="3" y="3" width="14" height="14" rx="2" ry="2" />
                        <rect x="7" y="7" width="14" height="14" rx="2" ry="2" />
                    </svg>
                }
                features={[
                    "Pre-built flashcards by chapter",
                    "Custom flashcard creation",
                    "Active recall practice",
                    "Smart repetition for retention"
                ]}
                estimatedDate="Q1 2026"
            />
        </>
    )
};

export default FlashCards;