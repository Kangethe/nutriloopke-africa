import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { PartnerCTASection } from '@/components/sections/HomeSections'

// Static placeholder articles — replace with Sanity fetch in production:
// import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity/queries'

const STATIC_POSTS: Record<
  string,
  {
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    body: string[]
  }
> = {
  'nutriloop-formalises-icipe-partnership': {
    title: 'NutriLoop Africa Formalises ICIPE Research Partnership',
    excerpt:
      "NutriLoop Africa signs a collaborative agreement with the International Centre of Insect Physiology and Ecology, bringing Africa's leading BSF science expertise directly into our facility design.",
    category: 'Partnership',
    date: '2024-11-15',
    readTime: '3 min read',
    body: [
      "NutriLoop Africa is pleased to announce the formalisation of a collaborative research agreement with the International Centre of Insect Physiology and Ecology (ICIPE), headquartered in Nairobi.",
      "ICIPE is Africa's leading insect research institution, with over 50 years of scientific work on insect biology, biocontrol, and sustainable agriculture. Their FLYgene programme — which studies Black Soldier Fly genetics and substrate optimisation for African conditions — provides the scientific backbone for NutriLoop Africa's bioconversion protocols.",
      "Under the agreement, ICIPE researchers will advise on strain selection, substrate composition, facility design, and quality benchmarks for NutriLoop Africa's first commercial facility. NutriLoop Africa will contribute real-world commercial data back to ICIPE's research programme, creating a feedback loop between laboratory science and commercial application.",
      "\"This agreement means our operations are grounded in 20 years of African insect science, not imported assumptions,\" said NutriLoop Africa's founding team. \"ICIPE has already validated that BSF bioconversion works at scale in Sub-Saharan Africa. We are the next step: commercial infrastructure that takes that science to market.\"",
      "The partnership also opens the door for university research collaborations using NutriLoop Africa's facility as a live case study. Interested researchers can apply through the research partnership page.",
    ],
  },
  'year-1-waste-diversion-projections': {
    title: '360 Tonnes Diverted: Our Year 1 Waste Projections Explained',
    excerpt:
      "A detailed breakdown of how NutriLoop Africa will divert 360 tonnes of organic waste from Dandora in Year 1 — the assumptions, the data, and what it means for Kenya's climate commitments.",
    category: 'Impact',
    date: '2024-10-28',
    readTime: '5 min read',
    body: [
      "NutriLoop Africa projects diverting 360 tonnes of organic waste from Dandora dumpsite in Year 1 of operations. This document explains the assumptions behind that number and the climate significance of the projection.",
      "The 360-tonne figure is based on confirmed feedstock commitments from our pilot waste supplier partners — hotel and hospitality operators, market waste collection agreements, and institutional food service contracts — at their conservatively estimated daily volumes.",
      "At 14 days per BSF bioconversion cycle and a substrate conversion ratio of approximately 15% (larvae mass per fresh substrate), 360 tonnes of annual substrate produces approximately 30 tonnes of dried BSF protein meal and 120 tonnes of frass fertiliser over the same period.",
      "The climate significance: organic waste decomposing in Dandora's anaerobic conditions produces methane at an emission factor consistent with IPCC Tier 1 guidelines for tropical open dumps. 360 tonnes of diverted waste equates to approximately 420 tonnes of CO₂-equivalent avoided through methane prevention alone.",
      "Combined with the soy displacement pathway — 30 tonnes of BSF protein meal replacing imported soybean meal, avoiding the land-use-change emissions associated with South American soy — total Year 1 avoidance is projected at 630 tonnes of CO₂-equivalent. Both pathways are eligible under Verra VCS methodologies, and NutriLoop Africa is targeting carbon credit certification in Year 2.",
    ],
  },
  'bsf-protein-vs-soy-kenya-analysis': {
    title: 'BSF vs. Soy: Why Kenyan Farmers Should Make the Switch',
    excerpt:
      "An analysis of why Black Soldier Fly protein meal at 40% below imported soybean price fundamentally changes the economics for Kenya's smallholder livestock farmers.",
    category: 'Research',
    date: '2024-09-10',
    readTime: '6 min read',
    body: [
      "Kenya's 700,000+ smallholder livestock farmers share a common constraint: the cost and volatility of imported soybean meal, which accounts for 40–60% of total feed cost for layer and broiler operations.",
      "BSF protein meal from NutriLoop Africa is priced approximately 40% below the landed cost of imported soybean meal. At current soy prices, that represents a saving of KES 20–35 per kilogram of protein supplemented — material for farmers managing monthly feed bills in the KES 50,000–200,000 range.",
      "Nutritionally, BSF protein meal holds up well against soy. Crude protein content of 40–55% is comparable to soybean meal's 44–48%. The fat profile differs — BSF is higher in lauric acid, which has documented antimicrobial properties that support gut health in poultry and fish, potentially reducing antibiotic dependency.",
      "The argument for switching is not just price. It is supply chain resilience. Imported soy is subject to foreign exchange fluctuations, shipping delays, and global harvest variability. Domestically produced BSF protein — sourced from Nairobi's consistent organic waste stream — is price-stable and supply-reliable year-round.",
      "For poultry farmers specifically, the palatability of BSF meal is a practical advantage: chickens preferentially select BSF meal in feeding trials, reducing feed waste. For aquaculture, BSF meal is a direct replacement for fishmeal in tilapia and catfish diets at equivalent conversion ratios.",
      "NutriLoop Africa's Year 1 production target of 30 tonnes of dried BSF protein meal is modest relative to Kenya's feed market. But it establishes the supply baseline, demonstrates the quality benchmark, and begins the price signal that the market needs.",
    ],
  },
}

// Static params — tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  // In production, replace with: const slugs = await getAllPostSlugs()
  return Object.keys(STATIC_POSTS).map((slug) => ({ slug }))
}

// Dynamic metadata per article
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = STATIC_POSTS[params.slug]
  if (!post) return { title: 'Article Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

// Revalidate every hour — swap for Sanity webhook revalidation in production
export const revalidate = 3600

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = STATIC_POSTS[params.slug]

  // Returns the Next.js 404 page if slug not found
  if (!post) notFound()

  const formattedDate = new Date(post.date).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // JSON-LD article schema for SEO / AEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'NutriLoop Africa',
      url: 'https://nutriloopAfrica.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article header */}
      <div className="relative bg-brand-dark pt-28 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.18) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-400 rounded"
          >
            <ArrowLeft size={13} /> All news
          </Link>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-green-900/50 border border-brand-green-700/40 text-brand-green-300">
              <Tag size={10} /> {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/35">
              <Calendar size={11} /> {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/35">
              <Clock size={11} /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-snug mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-white/55 text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </div>

      {/* Article body */}
      <section className="py-14 bg-[#F5F7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
            <div className="prose prose-gray prose-sm sm:prose max-w-none">
              {post.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-600 leading-relaxed mb-5 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-gray-400">
                Published by <span className="font-medium text-gray-600">NutriLoop Africa</span> · {formattedDate}
              </p>
              <div className="flex gap-3">
                <Link
                  href="/news"
                  className="text-xs font-semibold text-brand-green-700 hover:text-brand-green-900 transition-colors"
                >
                  ← All articles
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-brand-green-700 hover:bg-brand-green-800 text-white transition-colors"
                >
                  Partner with us
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <PartnerCTASection />
    </>
  )
}
