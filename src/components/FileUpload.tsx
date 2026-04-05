'use client'

import { useState, useEffect } from 'react'
import { Upload, Key, FileText, Zap } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [analysisResult, setAnalysisResult] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')

  // Load API key from LocalStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('billripper-api-key')
    if (storedKey) {
      setApiKey(storedKey)
    }
  }, [])

  // Save API key to LocalStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('billripper-api-key', apiKey)
    }
  }, [apiKey])

  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = () => setIsDragging(false)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (!apiKey) return
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleClick = () => {
    if (!apiKey) return
    
    // Create a file input element
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.csv'
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        processFile(target.files[0])
      }
    }
    input.click()
  }

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value)
  }

  const handleAnalyze = async () => {
    if (!apiKey || !extractedText) return
    
    setIsAnalyzing(true)
    setAnalysisResult('')
    setError(null)
    
    try {
      // Initialize Google Generative AI
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      
      // Soul Prompt
      const prompt = `你是一个毒舌但专业的云成本杀手。我会给你一段 AWS 或 GCP 的账单文本。
请执行以下暴力操作：
1. 算出总浪费金额（Total Bleeding）。
2. 找出最该砍掉的 3 个服务，给出具体动作名。
3. 风格要求：冷酷、直接。
4. 格式：
🩸 STOP THE BLEEDING: $[金额]
🔪 EXECUTIONS:
[服务名] - [动作] - [预计省下金额]
...
💀 AUDITOR'S NOTE:
(一句话评价用户的浪费程度)`
      
      // Generate content with streaming
      const result = await model.generateContentStream({
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { text: extractedText }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: 'text/plain'
        }
      })
      
      // Stream the response
      for await (const chunk of result.stream) {
        const chunkText = chunk.text || ''
        setAnalysisResult(prev => prev + chunkText)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the bill.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const processFile = async (file: File) => {
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
    // Use a placeholder implementation for now
    return 'PDF text extraction is temporarily disabled due to module issues.'
  }

  const extractTextFromCsv = async (file: File): Promise<string> => {
    // Use a placeholder implementation for now
    return 'CSV text extraction is temporarily disabled due to module issues.'
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

  const hasApiKey = Boolean(apiKey)

  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto px-4 py-8 grid-gradient">
      {/* Header with Logo */}
      <header className="py-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">BillRipper</h1>
        <a
          href="/solutions"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Explore 99 API Solutions
        </a>
      </header>

      {/* API Key Input */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your API Key"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <p className="mt-2 text-sm text-primary font-medium">
          Your Key is stored locally in your browser. We never see your data.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${hasApiKey ? (isDragging ? 'border-yellow-500 bg-yellow-50' : 'border-yellow-400') : 'border-slate-300'}`}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Upload className={`mx-auto h-12 w-12 mb-4 ${hasApiKey ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h2 className={`text-3xl font-bold mb-2 ${hasApiKey ? 'text-yellow-600' : 'text-slate-500'}`}>
            {isProcessing ? processingMessage : hasApiKey ? 'RIP YOUR BILL' : 'Enter API Key First'}
          </h2>
          {hasApiKey && !isProcessing && (
            <p className="text-slate-500">
              Click or drag and drop your bill file here
            </p>
          )}
        </div>
      </main>

      {/* Extracted Text Display */}
      {extractedText && (
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-slate-500 mr-2" />
              <h3 className="text-lg font-semibold text-slate-900">Extracted Text</h3>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Bill'}
            </button>
          </div>
          <div className="max-h-60 overflow-auto">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap">{extractedText}</pre>
          </div>
        </div>
      )}

      {/* Analysis Result */}
      {analysisResult && (
        <div className="mt-8 bg-slate-900 text-white rounded-lg p-4 font-mono border-2 border-yellow-500 animate-pulse relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent animate-shimmer"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-2">
              <Zap className="h-5 w-5 text-yellow-400 mr-2" />
              <h3 className="text-lg font-semibold">Analysis Result</h3>
            </div>
            <div className="max-h-60 overflow-auto mb-4">
              <pre className="text-sm whitespace-pre-wrap">{analysisResult}</pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {/* Nuke the Bill (Download PDF) */}
              <button className="flex items-center px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 transition-colors">
                <FileText className="h-4 w-4 mr-2" />
                Nuke the Bill (Download PDF)
              </button>
              
              {/* Twitter Share */}
              <a 
                href={`https://twitter.com/intent/tweet?text=My cloud bill was bleeding, but %23BillRipper just saved me $1000! Rip yours for free: http://localhost:3000`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
              >
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Share on Twitter
              </a>
              
              {/* Forget Me */}
              <button 
                onClick={() => {
                  localStorage.clear()
                  setApiKey('')
                  setExtractedText('')
                  setAnalysisResult('')
                }}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Forget Me
              </button>
              
              {/* Donate */}
              <a 
                href="https://paypal.me/xingfangwang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors"
              >
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.313 7.249c-1.144-1.023-2.636-1.633-4.25-1.773-.445-.036-.894.025-1.31.194l-5.589 2.18c-1.457.566-1.996 2.366-1.33 3.823.666 1.456 2.467 1.995 3.924 1.429l5.589-2.18c1.457-.566 1.996-2.366 1.33-3.823-.379-.707-1.018-1.257-1.778-1.562zM8.067 16.334l-5.589 2.18c-1.457.566-1.996 2.366-1.33 3.823.666 1.456 2.467 1.995 3.924 1.429l5.589-2.18c1.457-.566 1.996-2.366 1.33-3.823-.666-1.456-2.467-1.995-3.924-1.429z"/>
                </svg>
                Donate
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Quick Access */}
      <div className="mt-12 mb-8">
        <h3 className="text-sm font-medium text-slate-500 mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/rip/why-is-my-aws-nat-gateway-bill-high-2026" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">NAT Gateway Costs</a>
          <a href="/rip/aws-cost-explorer-vs-vantage-vs-billripper" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Cost Explorer</a>
          <a href="/rip/analyze-aws-bill-without-iam-access" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Secure Analysis</a>
          <a href="/rip/gemini-prompt-cloud-cost-optimization" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Gemini Prompts</a>
          <a href="/rip/reduce-aws-lambda-ai-inference-cost" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Lambda Costs</a>
          <a href="/rip/how-to-read-aws-csv-billing-report" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">CSV Reports</a>
          <a href="/rip/cloud-cost-monitoring-side-projects-reddit" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Side Projects</a>
          <a href="/rip/unexpected-aws-bill-abandoned-project" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Zombie Resources</a>
          <a href="/rip/vantage-alternative-solo-developers" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Vantage Alternative</a>
          <a href="/rip/stop-aws-data-transfer-out-charges" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Data Transfer</a>
          <a href="/rip/analyze-azure-bill-pdf-free" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Azure Bills</a>
          <a href="/rip/save-money-gcp-gpu-instances" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">GCP GPU Costs</a>
          <a href="/rip/free-finops-tool-startups-no-cc" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Free FinOps</a>
          <a href="/rip/aws-s3-intelligent-tiering-cost-audit" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">S3 Tiering</a>
          <a href="/rip/open-source-cloud-cost-analyzer" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Open Source</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-slate-500 mb-2">
          No Login. No AWS Access. Your data stays in your browser.
        </p>
        <p className="text-slate-500">
          Support: <a href="mailto:457239850@qq.com" className="text-blue-600 hover:underline">457239850@qq.com</a>
        </p>
      </footer>

      {/* Loading Overlay */}
      {(isProcessing || isAnalyzing) && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400 animate-pulse">
              {isProcessing ? 'Analyzing Greed...' : 'Generating Analysis...'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}