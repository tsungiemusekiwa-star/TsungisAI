"use client"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"

interface XlsxViewerProps {
    fileUrl: string
    setShowViewer: (value: boolean) => void
}

interface SheetData {
    name: string
    data: (string | number)[][]
}

export function XlsxViewer({ fileUrl, setShowViewer }: XlsxViewerProps) {
    const [sheets, setSheets] = useState<SheetData[]>([])
    const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadXlsx = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(fileUrl)
                if (!response.ok) throw new Error("Failed to fetch XLSX file")

                const arrayBuffer = await response.arrayBuffer()
                const workbook = XLSX.read(arrayBuffer, { type: "array" })

                const parsedSheets: SheetData[] = workbook.SheetNames.map((sheetName) => {
                    const worksheet = workbook.Sheets[sheetName]
                    const data = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        defval: "",
                    }) as (string | number)[][]

                    return { name: sheetName, data }
                })

                setSheets(parsedSheets)
                setLoading(false)
            } catch (err) {
                setError("Failed to load XLSX file")
                setLoading(false)
                console.error(err)
            }
        }

        loadXlsx()
    }, [fileUrl])

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
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
                {/* Close Button */}
                <button
                    onClick={() => setShowViewer(false)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                >
                    ×
                </button>

                {/* Messages */}
                {loading && (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>Loading XLSX...</div>
                )}
                {error && (
                    <div style={{ textAlign: "center", marginTop: "40px", color: "red" }}>{error}</div>
                )}
                {!loading && !error && sheets.length === 0 && (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>No sheets found in file</div>
                )}

                {/* Sheet Viewer */}
                {!loading && !error && sheets.length > 0 && (
                    <>
                        {/* Tabs */}
                        {sheets.length > 1 && (
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px", overflowX: "auto" }}>
                                {sheets.map((sheet, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSheetIndex(index)}
                                        style={{
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                            background: index === activeSheetIndex ? "#007bff" : "#f0f0f0",
                                            color: index === activeSheetIndex ? "#fff" : "#000",
                                        }}
                                    >
                                        {sheet.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Table */}
                        <div style={{ flex: 1, overflow: "auto", border: "1px solid #ccc", borderRadius: "4px" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    {sheets[activeSheetIndex].data.map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            style={{
                                                background: rowIndex === 0 ? "#f2f2f2" : "transparent",
                                                fontWeight: rowIndex === 0 ? "bold" : "normal",
                                                borderBottom: "1px solid #ddd",
                                            }}
                                        >
                                            {row.map((cell, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    style={{
                                                        padding: "8px",
                                                        borderRight: "1px solid #ddd",
                                                    }}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Sheet Info */}
                        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "14px", color: "#666" }}>
                            Sheet: {sheets[activeSheetIndex].name} | Rows: {sheets[activeSheetIndex].data.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
