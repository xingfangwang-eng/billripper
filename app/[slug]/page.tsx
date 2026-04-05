import { Metadata } from 'next'
import { ArrowRight, Code, Terminal, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

// Read keywords data
const keywordsData = require('../../data/keywords.json')

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const keyword = keywordsData.find((item: any) => item.slug === params.slug)
  
  if (!keyword) {
    return {
      title: 'API Tools - BillRipper',
      description: 'Powerful API tools for developers',
    }
  }
  
  return {
    title: keyword.title,
    description: keyword.how_to_solve.substring(0, 160),
    keywords: keyword.title.toLowerCase().split(' '),
  }
}

export async function generateStaticParams() {
  return keywordsData.map((item: any) => ({
    slug: item.slug,
  }))
}

export default function SlugPage({ params }: { params: { slug: string } }) {
  const keyword = keywordsData.find((item: any) => item.slug === params.slug)
  
  if (!keyword) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">Page Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">The requested page could not be found.</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors active:scale-95"
          >
            Back to Home
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (65%) */}
            <div className="lg:col-span-8">
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-8">
                {keyword.title}
              </h1>
              
              {/* Problem Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  The Problem
                </h2>
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <p className="text-lg leading-relaxed text-slate-600 mb-4">
                    {keyword.problem_description}
                  </p>
                  <p className="text-lg leading-relaxed text-slate-600">
                    Developers often spend hours manually converting API requests, parsing responses, or implementing error handling strategies. This not only wastes valuable time but also introduces the risk of human error, which can lead to bugs and performance issues in production applications.
                  </p>
                </div>
              </section>
              
              {/* The Tool Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  The Tool
                </h2>
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <div className="mb-6">
                    <label className="block text-slate-700 font-medium mb-2">OneClickAPI Input</label>
                    <div className="relative">
                      <textarea 
                        className="w-full p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        rows={6}
                        placeholder="Paste your cURL command, JSON response, or API code here..."
                      ></textarea>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors active:scale-95">
                    Process
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </section>
              
              {/* The Guide Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  The Guide
                </h2>
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <p className="text-lg leading-relaxed text-slate-600 mb-6">
                    {keyword.how_to_solve}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-full mr-4">
                        <CheckCircle className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Step 1: Input Your Code</h3>
                        <p className="text-slate-600">Paste your cURL command, JSON response, or API code into the input field above.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-full mr-4">
                        <RefreshCw className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Step 2: Process</h3>
                        <p className="text-slate-600">Click the "Process" button to let our tool analyze and transform your input.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-slate-100 p-2 rounded-full mr-4">
                        <Code className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Step 3: Get Optimized Code</h3>
                        <p className="text-slate-600">Copy the generated code and integrate it into your application.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Code Example Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  Code Example
                </h2>
                <div className="bg-slate-900 border border-slate-700 rounded-md overflow-hidden">
                  <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-slate-400">JavaScript</span>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-slate-300 font-mono text-sm">
                      {keyword.code_example}
                    </code>
                  </pre>
                </div>
              </section>
              
              {/* Comparison Table */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  Comparison
                </h2>
                <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold text-slate-900 border-b border-slate-200">Feature</th>
                        <th className="px-6 py-4 text-left font-bold text-slate-900 border-b border-slate-200">Manual Approach</th>
                        <th className="px-6 py-4 text-left font-bold text-slate-900 border-b border-slate-200">Our Tool</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 border-b border-slate-200">Time Required</td>
                        <td className="px-6 py-4 border-b border-slate-200">Hours</td>
                        <td className="px-6 py-4 border-b border-slate-200">Seconds</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 border-b border-slate-200">Error Rate</td>
                        <td className="px-6 py-4 border-b border-slate-200">High</td>
                        <td className="px-6 py-4 border-b border-slate-200">Low</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 border-b border-slate-200">Code Quality</td>
                        <td className="px-6 py-4 border-b border-slate-200">Variable</td>
                        <td className="px-6 py-4 border-b border-slate-200">Consistently High</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4">Scalability</td>
                        <td className="px-6 py-4">Limited</td>
                        <td className="px-6 py-4">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            
            {/* Right Column (35%) */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                {/* Tool Card */}
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-6">
                    <Terminal className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 text-center mb-4">OneClickAPI</h3>
                  <p className="text-slate-600 text-center mb-6">
                    Convert, optimize, and debug API code with a single click.
                  </p>
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors active:scale-95">
                    Try for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                
                {/* User Reviews */}
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">User Reviews</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-semibold text-slate-900">John Doe</h4>
                          <p className="text-sm text-slate-500">Frontend Developer</p>
                        </div>
                      </div>
                      <p className="text-slate-600">
                        "This tool saved me hours of manual work. The code it generates is clean and well-optimized."
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Jane Smith</h4>
                          <p className="text-sm text-slate-500">Full Stack Developer</p>
                        </div>
                      </div>
                      <p className="text-slate-600">
                        "I use this tool every day for my API development. It's a game-changer for productivity."
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Related Tools */}
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Related Tools</h3>
                  <ul className="space-y-3">
                    {keywordsData
                      .filter((item: any) => item.slug !== keyword.slug)
                      .slice(0, 5)
                      .map((item: any) => (
                        <li key={item.id}>
                          <a 
                            href={`/${item.slug}`} 
                            className="flex items-center text-slate-600 hover:text-red-600 transition-colors"
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            {item.title}
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}