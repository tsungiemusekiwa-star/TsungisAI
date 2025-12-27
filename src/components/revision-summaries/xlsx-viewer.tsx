interface XlsxViewerProps {
    fileUrl: string
    setShowViewer: (value: boolean) => void
}

export function XlsxViewer({ fileUrl, setShowViewer }: XlsxViewerProps) {
    return (
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
                    padding: "20px",
                    borderRadius: "8px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Close button */}
                <button
                    onClick={() => setShowViewer(false)}
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

                {/* Office Online iframe */}
                <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
                    style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4 }}
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    )
}
