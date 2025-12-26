"use client"

import { useState, useEffect, useRef } from "react"
import * as pdfjsLib from "pdfjs-dist"

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`
}

interface PdfViewerProps {
  fileUrl: string
}

/**
 * PdfViewer Component
 *
 * Renders PDF files page by page using canvas elements.
 * Disables download and print functionality for read-only viewing.
 */
export function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true)
        setError(null)

        const loadingTask = pdfjsLib.getDocument(fileUrl)
        const pdf = await loadingTask.promise

        pdfDocRef.current = pdf
        setNumPages(pdf.numPages)
        setLoading(false)
      } catch (err) {
        setError("Failed to load PDF document")
        setLoading(false)
        console.error("PDF loading error:", err)
      }
    }

    loadPdf()

    return () => {
      // Cleanup PDF document
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy()
      }
    }
  }, [fileUrl])

  // Render current page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDocRef.current || !canvasRef.current) return

      try {
        const page = await pdfDocRef.current.getPage(currentPage)
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        if (!context) return

        // Calculate scale to fit container
        const viewport = page.getViewport({ scale: 1.5 })
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        await page.render(renderContext).promise
      } catch (err) {
        console.error("Page rendering error:", err)
        setError("Failed to render page")
      }
    }

    if (!loading && pdfDocRef.current) {
      renderPage()
    }
  }, [currentPage, loading])

  // Navigation handlers
  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading PDF...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-destructive">{error}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* PDF Canvas */}
      <div className="border border-border rounded-lg overflow-auto max-w-full">
        <canvas ref={canvasRef} className="max-w-full h-auto" />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Previous
        </button>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {numPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === numPages}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Next
        </button>
      </div>
    </div>
  )
}