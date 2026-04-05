import { useState } from 'react'

export interface UseFileUploadReturn {
  isProcessing: boolean
  processingMessage: string
  extractedText: string
  error: string | null
  processFile: (file: File) => Promise<void>
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const processFile = async (file: File): Promise<void> => {
    setIsProcessing(true)
    setError(null)
    
    try {
      if (file.type === 'application/pdf') {
        setProcessingMessage('Shredding PDF...')
        const text = await extractTextFromPdf(file)
        setExtractedText(truncateText(text))
      } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setProcessingMessage('Parsing CSV...')
        const text = await extractTextFromCsv(file)
        setExtractedText(truncateText(text))
      } else {
        throw new Error('Unsupported file type. Please upload PDF or CSV.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file.')
    } finally {
      setIsProcessing(false)
      setProcessingMessage('')
    }
  }

  const extractTextFromPdf = async (file: File): Promise<string> => {
    // Dynamically import pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist')
    
    // Set up PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
    
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items.map((item: any) => item.str).join('\n')
      text += pageText + '\n\n'
    }
    
    return text
  }

  const extractTextFromCsv = async (file: File): Promise<string> => {
    // Dynamically import papaparse
    const Papa = await import('papaparse')
    
    return new Promise((resolve, reject) => {
      Papa.default.parse(file, {
        preview: 1000, // Limit to first 1000 rows
        complete: (results: any) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV file.'))
            return
          }
          
          // Convert parsed data back to CSV string
          const csvString = Papa.default.unparse(results.data)
          resolve(csvString)
        },
        error: (error: any) => {
          reject(error)
        }
      })
    })
  }

  const truncateText = (text: string): string => {
    const MAX_LENGTH = 30000
    
    if (text.length <= MAX_LENGTH) {
      return text
    }
    
    // Keep first 1000 characters and last 1000 characters
    const firstPart = text.substring(0, 1000)
    const lastPart = text.substring(text.length - 1000)
    const middleLength = MAX_LENGTH - firstPart.length - lastPart.length - 3
    
    return firstPart + '...' + lastPart
  }

  return {
    isProcessing,
    processingMessage,
    extractedText,
    error,
    processFile
  }
}