import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'News & Updates — NutriLoop Africa',
  description: 'Milestones, media coverage, research updates, and partnership announcements from NutriLoop Africa.',
}

const POSTS = [
  {
    slug: 'nutriloop-formalises-icipe-partnership',
    title: 'NutriLoop Africa Formalises ICIPE Research Partnership',
    excerpt: 'NutriLoop Africa signs a collaborative agreement with the International Centre of Insect Physiology and Ecology, bringing Africa\'s leading BSF science expertise directly into our facility design and bioconversion protocols.',
    category: 'Partnership', categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    date: '2024-11-15', readTime: '3 min read',
  },
  {
    slug: 'year-1-waste-diversion-projections',
    title: '360 Tonnes Diverted: Our Year 1 Waste Projections Explained',
    excerpt: 'A detailed breakdown of how NutriLoop Africa will divert 360 tonnes of organic waste from Dandora in Year 1 — the assumptions, the data, and what it means for Kenya\'s climate commitments under the Paris Agreement.',
    category: 'Impact', categoryColor: 'bg-brand-green-50 text-brand-green-700 border-brand-green-200',
    date: '2024-10-28', readTime: '5 min read',
  },
  {
    slug: 'bsf-protein-vs-soy-kenya-analysis',
    title: 'BSF vs. Soy: Why Kenyan Farmers Should Make the Switch',
    excerpt: 'An analysis of why Black Soldier Fly protein meal at 40% below imported soybean price fundamentally changes the economics for Kenya\'s 700,000+ smallholder livestock farmers — and why price stability matters as much as price level.',
    category: 'Research', categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    date: '2024-09-10', readTime: '6 min read',
  },
  {
    slug: 'swma-2022-what-nairobi-businesses-need-to-know',
    title: 'SWMA 2022: What Every Nairobi Food Business Needs to Know',
    excerpt: 'The Sustainable Waste Management Act 2022 is now in force. Here is what it requires of hotels, hospitals, restaurants, markets, and food processors — and how a NutriLoop Africa supply agreement satisfies the documentation mandate.',
    category: 'Compliance', categoryColor: 'bg-blue-50 text-blue-700 border-blue-200',
    date: '2024-08-22', readTime: '4 min read',
  },
  {
    slug: 'frass-fertiliser-soil-restoration-kenya',
    title: 'How Frass Fertiliser Restores Kenya\'s Smallholder Soils',
    excerpt: 'Decades of synthetic fertiliser without organic matter replenishment has degraded smallholder soils across Kenya. We explain the science behind frass chitin biostimulant — and what soil restoration means for yields, input costs, and farm resilience.',
    category: 'Research', categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    date: '2024-07-15', readTime: '7 min read',
  },
  {
    slug: 'cgiar-bsf-economics-study-373-farms',
    title: 'What the CGIAR Study Across 373 Farms Tells Us About BSF Economics',
    excerpt: 'CGIAR\'s Alliance of Bioversity International and CIAT studied 373 BSF farms across Sub-Saharan Africa and confirmed 50%+ gross margins at commercial scale. Here is what that data means for NutriLoop Africa\'s financial projections.',
    category: 'Research', categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    date: '2024-06-01', readTime: '5 min read',
  },
]

const CATEGORIES = ['All', 'Partnership', 'Impact', 'Research', 'Compliance', 'Milestone']

export default function NewsPage() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-brand-dark pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%)' }} aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">
            News & Updates
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">What we're building — out loud.</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Milestones, media coverage, research, and partnership announcements as NutriLoop Africa scales.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-[#F5F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filter — static for now, Sanity will power this */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-default transition-colors ${
                  cat === 'All'
                    ? 'bg-brand-green-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-500'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-brand-green-200 hover:shadow-lg hover:shadow-brand-green-50 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-brand-green-600 to-brand-green-400" aria-hidden />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <time
                      dateTime={post.date}
                      className="flex items-center gap-1 text-xs text-gray-400"
                    >
                      <Calendar size={11} aria-hidden />
                      {new Date(post.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                  </div>

                  {/* Headline */}
                  <h2 className="text-base font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-green-800 transition-colors">
                    <Link
                      href={`/news/${post.slug}`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} aria-hidden /> {post.readTime}
                    </span>
                    <Link
                      href={`/news/${post.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-brand-green-700 hover:text-brand-green-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded"
                    >
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sanity CMS notice */}
          <p className="mt-10 text-center text-sm text-gray-400">
            Posts are managed via{' '}
            <span className="font-medium text-gray-500">Sanity CMS</span>
            {' '}— connect at <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">/studio</code> to publish live articles.
          </p>
        </div>
      </section>
    </>
  )
}
