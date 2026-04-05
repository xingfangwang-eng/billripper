import { Metadata } from 'next'
import { ArrowRight, Code, Terminal, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'
import { PageMutator } from '../../utils/PageMutator'

// Read keywords data
const keywordsData = require('../../../data/keywords.json')

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
  
  // 使用 PageMutator 生成页面数据
  const mutator = new PageMutator(params.slug);
  const pageData = mutator.generatePageData(keyword);
  
  // 渲染组件
  const renderComponent = (component: any) => {
    switch (component.type) {
      case 'ComparisonTable':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-red-600 mr-4"></div>
              {component.title}
            </h2>
            <div className="bg-white border border-slate-200 p-8 rounded-md">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-slate-900 border-b border-slate-200">Feature</th>
                      <th className="px-6 py-4 text-left font-bold text-slate-900 border-b border-slate-200">Cloud Provider</th>
                      <th className="px-6 py-4 text-left font-bold text-slate-900 border-b border-slate-200">BillRipper</th>
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
                      <td className="px-6 py-4 border-b border-slate-200">Cost</td>
                      <td className="px-6 py-4 border-b border-slate-200">Expensive</td>
                      <td className="px-6 py-4 border-b border-slate-200">Free</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 border-b border-slate-200">Ease of Use</td>
                      <td className="px-6 py-4 border-b border-slate-200">Complex</td>
                      <td className="px-6 py-4 border-b border-slate-200">Simple</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4">Integration</td>
                      <td className="px-6 py-4">Limited</td>
                      <td className="px-6 py-4">Seamless</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        );
      case 'CodeBlock':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-red-600 mr-4"></div>
              {component.title}
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
                  {component.content(keyword)}
                </code>
              </pre>
            </div>
          </section>
        );
      case 'FAQSection':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-red-600 mr-4"></div>
              {component.title}
            </h2>
            <div className="bg-white border border-slate-200 p-8 rounded-md space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">How long does it take to {keyword.title.toLowerCase()} with BillRipper?</h3>
                <p className="text-slate-600">It typically takes just a few seconds, compared to hours with manual methods.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Is BillRipper compatible with all cloud providers?</h3>
                <p className="text-slate-600">Yes, BillRipper works with AWS, GCP, Azure, and other major cloud providers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Do I need to install any software to use BillRipper?</h3>
                <p className="text-slate-600">No, BillRipper is a web-based tool that works directly in your browser.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Is my data safe with BillRipper?</h3>
                <p className="text-slate-600">Absolutely. BillRipper processes your data locally in your browser, so it never leaves your device.</p>
              </div>
            </div>
          </section>
        );
      case 'RantSection':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-1 h-8 bg-red-600 mr-4"></div>
              {component.title}
            </h2>
            <div className="bg-white border border-slate-200 p-8 rounded-md">
              <p className="text-lg leading-relaxed text-slate-600">
                {component.content(keyword)}
              </p>
            </div>
          </section>
        );
      default:
        return null;
    }
  };
  
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
                {pageData.title}
              </h1>
              
              {/* Introduction */}
              <section className="mb-12">
                <div className="bg-white border border-slate-200 p-8 rounded-md">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{pageData.subtitle}</h2>
                  <p className="text-lg leading-relaxed text-slate-600 mb-6">
                    {pageData.intro}
                  </p>
                  
                  {/* Tone-based Content */}
                  <div className="space-y-8 mt-8">
                    {pageData.tones.map((tone: any, index: number) => (
                      <div key={index} className="bg-slate-50 p-6 rounded-md border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                          <div className="w-1 h-6 bg-red-600 mr-3"></div>
                          {tone.name} Perspective
                        </h3>
                        <p className="text-lg leading-relaxed text-slate-600">
                          {tone.generateContent(keyword)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Layout-specific Sections */}
              {pageData.sections.map((section: string, index: number) => (
                <section key={index} className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <div className="w-1 h-8 bg-red-600 mr-4"></div>
                    {section}
                  </h2>
                  <div className="bg-white border border-slate-200 p-8 rounded-md">
                    <p className="text-lg leading-relaxed text-slate-600">
                      {section.includes('Step') ? (
                        `This is step ${index + 1} of the tutorial. Follow along to learn how to ${keyword.title.toLowerCase()}.`
                      ) : section.includes('Problem') ? (
                        keyword.problem_description
                      ) : section.includes('Solution') ? (
                        keyword.how_to_solve
                      ) : (
                        `This section explores ${section.toLowerCase()} in detail. Learn how BillRipper can help you ${keyword.title.toLowerCase()}.`
                      )}
                    </p>
                  </div>
                </section>
              ))}
              
              {/* Components */}
              {pageData.components.map((component: any, index: number) => (
                <div key={index}>
                  {renderComponent(component)}
                </div>
              ))}
              
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