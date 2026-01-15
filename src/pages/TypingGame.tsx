import { ComingSoon } from "@/components/global/ComingSoon";
import { useLayoutEffect } from "react";

const TypingGame = () => {
    useLayoutEffect(() => {
        document.title = "Typing | Tsungi's AI";
    }, []);

    return (
        <>
            <ComingSoon
                title="Typing Game"
                description="Improve your typing speed and accuracy with actuarial-focused content. Master mathematical formulas and industry terminology while having fun."
                icon={
                    <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <circle cx="6" cy="12" r=".5" />
                        <circle cx="18" cy="12" r=".5" />
                        <path d="M9 16h6" />
                    </svg>
                }
                features={[
                    "Actuarial terminology",
                    "Formula practice",
                    "Speed challenges",
                    "Progress tracking"
                ]}
                estimatedDate="Q2 2026"
            />
        </>
    )
};

export default TypingGame;