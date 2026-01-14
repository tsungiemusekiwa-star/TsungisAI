import { ComingSoon } from "@/components/global/ComingSoon";

const AudioUpload = () => (
  <ComingSoon
    title="Audio Upload"
    description="Upload your own study materials and convert them into interactive audio lessons. Share knowledge with the community and build your personal learning library."
    icon={
      <svg className="icon-lg text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,5 17,10" />
        <line x1="12" y1="5" x2="12" y2="15" />
      </svg>
    }
    features={[
      "Multiple format support",
      "Auto-transcription",
      "Quality enhancement",
      "Community sharing"
    ]}
    estimatedDate="Q2 2024"
  />
);

export default AudioUpload;