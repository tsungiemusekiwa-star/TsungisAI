import { ComingSoon } from "@/components/global/ComingSoon";

const Practice = () => (
    <ComingSoon
        title="Practice Tests"
        description="Take comprehensive practice exams that mirror the real actuarial exam experience. Get detailed feedback and track your progress over time."
        icon={
            <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
        }
        features={[
            "Exam-style questions",
            "Detailed explanations",
            "Performance analytics",
            "Adaptive difficulty"
        ]}
        estimatedDate="Q2 2026"
    />
);

export default Practice;