'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Code, Zap, Shield, Layers, Database } from 'lucide-react'
import { keywordsData } from '@/data/keywords'

interface KeywordItem {
  id: number
  slug: string
  title: string
  problem_description: string
  how_to_solve?: string
  code_example?: string
}

const CATEGORIES = [
  {
    id: 'api-integration',
    name: 'API Integration',
    icon: Zap,
    keywords: ['api', 'request', 'axios', 'curl', 'fetch', 'rest', 'http']
  },
  {
    id: 'data-handling',
    name: 'Data Handling',
    icon: Database,
    keywords: ['json', 'parse', 'data', 'response', 'payload', 'validation']
  },
  {
    id: 'error-management',
    name: 'Error Management',
    icon: Shield,
    keywords: ['error', 'handle', 'catch', 'exception', 'debug', 'troubleshoot']
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: Layers,
    keywords: ['optimize', 'performance', 'cache', 'rate', 'limit', 'speed', 'latency']
  },
  {
    id: 'code-tools',
    name: 'Code Tools',
    icon: Code,
    keywords: ['convert', 'tool', 'generator', 'automate', 'snippet', 'utility']
  }
]

function categorizeItem(item: KeywordItem) {
  const text = `${item.title} ${item.problem_description}`.toLowerCase()
  
  for (const category of CATEGORIES) {
    if (category.keywords.some(keyword => text.includes(keyword))) {
      return category.id
    }
  }
  
  return 'code-tools'
}

function truncateText(text: string, maxLength: number = 100) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export default function BillRipperHub() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const categorizedItems = useMemo(() => {
    const categorized: Record<string, KeywordItem[]> = {}
    CATEGORIES.forEach(cat => categorized[cat.id] = [])
    
    const filtered = keywordsData.filter((item: KeywordItem) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(query) ||
        item.problem_description.toLowerCase().includes(query)
      )
    })
    
    filtered.forEach((item: KeywordItem) => {
      const categoryId = categorizeItem(item)
      categorized[categoryId].push(item)
    })
    
    return categorized
  }, [searchQuery])
  
  const totalItems = keywordsData.length
  const filteredCount = Object.values(categorizedItems).flat().length
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BillRipper Solutions Hub',
    description: 'Complete collection of 100+ API development tools and solutions',
    numberOfItems: totalItems,
    itemListElement: keywordsData.map((item: KeywordItem, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        name: item.title,
        description: item.problem_description,
        url: `https://billripper.com/solutions/${item.slug}`
      }
    }))
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-50 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 100+ solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 text-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
            BillRipper Hub
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 max-w-2xl">
            The complete collection of API development tools. Fast, lightweight, and built for developers who value their time.
          </p>
          <div className="mt-6 text-sm text-slate-500">
            {searchQuery ? (
              `Showing ${filteredCount} of ${totalItems} solutions`
            ) : (
              `Browse all ${totalItems} solutions`
            )}
          </div>
        </header>
        
        {/* Categories Navigation */}
        <nav className="mb-12">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              const count = categorizedItems[category.id]?.length || 0
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-slate-400">({count})</span>
                </button>
              )
            })}
          </div>
        </nav>
        
        {/* Categories Content */}
        <div className="space-y-16">
          {CATEGORIES.map((category) => {
            const items = categorizedItems[category.id] || []
            if (items.length === 0) return null
            
            const Icon = category.icon
            
            return (
              <section key={category.id} id={category.id}>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-slate-400" />
                    </div>
                    {category.name}
                    <span className="text-lg text-slate-400 font-normal">({items.length})</span>
                  </div>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <article key={`${category.id}-${item.id}`}>
                      <Link href={`/rip/${item.slug}`}>
                        <div className="bg-white border border-slate-200 p-8 hover:border-blue-500 transition-all group">
                          <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed text-sm mb-4">
                            {truncateText(item.problem_description)}
                          </p>
                          <div className="flex items-center text-blue-600 font-medium text-sm">
                            View Solution
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
        
        {/* Empty State */}
        {filteredCount === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No solutions found</h3>
            <p className="text-slate-600">Try adjusting your search terms</p>
          </div>
        )}
      </main>
    </div>
  )
}
