import type { RevisionSummaryType } from "@/types/revision-summaries.types"
import PDFIcon from "@/assets/pdf-icon.png";
import XLSXIcon from "@/assets/xlsx-icon.png";
import { useState } from "react";

interface FileViewerProps {
    revisionNotes: RevisionSummaryType[]
    showFile: boolean
    setShowFile: (value: boolean) => void
}

export function FileViewer({ revisionNotes, showFile, setShowFile }: FileViewerProps) {
    const [currentFile, setCurrentFile] = useState<RevisionSummaryType | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const openFile = (file: RevisionSummaryType) => {
        setCurrentFile(file)
        setShowFile(true)
    }

    return (
        <>
            {revisionNotes.map((file, index) => (
                <div
                    key={index}
                    onClick={() => openFile(file)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex flex-col items-center justify-center text-center space-y-2 cursor-pointer"
                    style={{
                        border: hoveredIndex === index ? '2px solid hsl(285, 60%, 68%)' : 'none',
                        borderRadius: '8px',
                        padding: '16px'
                    }}
                >
                    <img
                        style={{ height: 48, width: 48 }}
                        src={file.fileType === "pdf" ? PDFIcon : XLSXIcon}
                        alt={`${file.fileType.toUpperCase()} File`}
                    />
                    <p style={{ fontSize: 16 }}>{file.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                        {file.description}
                    </p>
                </div>
            ))}

            {showFile && currentFile && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            width: "90%",
                            height: "90%",
                            padding: 20,
                            borderRadius: 8,
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowFile(false)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                background: "none",
                                border: "none",
                                fontSize: 24,
                                cursor: "pointer",
                            }}
                        >
                            ×
                        </button>

                        {/* File iframe */}
                        {currentFile.fileType === "pdf" ? (
                            <iframe
                                src={`${currentFile.fileUrl}#toolbar=0`}
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4 }}
                                width="100%"
                                height="100%"
                            />
                        ) : (
                            <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(currentFile.fileUrl)}`}
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4 }}
                                width="100%"
                                height="100%" />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
