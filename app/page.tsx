import { keywordsData } from '@/data/keywords'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            BillRipper
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful API tools for developers, designed to save time and improve code quality.
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Available Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keywordsData.map((keyword: any) => (
                <a
                  key={keyword.id}
                  href={`/rip/${keyword.slug}`}
                  className="bg-white p-6 rounded-lg border border-slate-200 hover:border-red-500 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {keyword.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {keyword.problem_description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
