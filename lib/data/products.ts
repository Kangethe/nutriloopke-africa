export interface ProductStat {
  label: string
  value: string
}

export interface Product {
  key: string
  name: string
  tagline: string
  description: string
  color: string          // Tailwind bg class for accent
  accentHex: string
  emoji: string
  stats: ProductStat[]
  targetBuyers: string[]
  benefits: string[]
  ctaText: string
  ctaHref: string
}

export const PRODUCTS: Product[] = [
  {
    key: 'protein_meal',
    name: 'BSF Protein Meal',
    tagline: 'Replaces imported soybean meal — at 40% less.',
    description:
      'Dried and milled Black Soldier Fly larvae: 40–55% crude protein, 15–20% crude fat, rich in lauric acid with documented antimicrobial properties. Suitable for all monogastric livestock.',
    color: 'bg-brand-green-800',
    accentHex: '#2E7D32',
    emoji: '🌿',
    stats: [
      { label: 'Crude protein', value: '40–55%' },
      { label: 'Crude fat', value: '15–20%' },
      { label: 'vs. imported soy', value: '−40% cost' },
      { label: 'Moisture', value: '<10%' },
    ],
    targetBuyers: ['Poultry farms', 'Aquaculture', 'Feed manufacturers', 'Agrodealers'],
    benefits: [
      'Direct soybean meal replacement at farm gate',
      'Lauric acid supports gut health — reduces antibiotic need',
      'Kenya-made: zero import duty, no foreign exchange exposure',
      'ICIPE-validated composition and safety data',
    ],
    ctaText: 'Buy protein meal',
    ctaHref: '/apply?tab=buyer',
  },
  {
    key: 'frass_fertiliser',
    name: 'Frass Fertiliser',
    tagline: 'Soil restoration with N:P:K + chitin biostimulant.',
    description:
      'BSF excrement and exoskeleton residue: a balanced organic fertiliser with naturally occurring chitin that triggers plant immune response, improves soil structure, and suppresses nematodes.',
    color: 'bg-brand-brown-600',
    accentHex: '#6D3B0A',
    emoji: '🌱',
    stats: [
      { label: 'Nitrogen (N)', value: '4–6%' },
      { label: 'Phosphorus (P)', value: '3–5%' },
      { label: 'Potassium (K)', value: '2–4%' },
      { label: 'Organic matter', value: '60–70%' },
    ],
    targetBuyers: ['Smallholder farmers', 'Agrodealers', 'NGO farm programmes', 'Nurseries'],
    benefits: [
      'Chitin biostimulant activates plant immune system',
      'Improves soil water retention — critical for dry-season farming',
      'Suppresses root-knot nematodes without chemicals',
      '120 tonnes available to smallholders in Year 1',
    ],
    ctaText: 'Get frass fertiliser',
    ctaHref: '/apply?tab=buyer',
  },
  {
    key: 'fresh_larvae',
    name: 'Fresh Larvae',
    tagline: 'Whole, live larvae — to farm gate, same day.',
    description:
      'Pre-pupa Black Soldier Fly larvae at peak nutritional content: 40%+ protein, 30%+ fat. Delivered fresh, same day as harvest. Ideal for premium poultry and fish operations.',
    color: 'bg-brand-amber-700',
    accentHex: '#B85C00',
    emoji: '🪲',
    stats: [
      { label: 'Crude protein', value: '40%+' },
      { label: 'Crude fat', value: '30%+' },
      { label: 'Moisture', value: '65–70%' },
      { label: 'Delivery', value: 'Same day' },
    ],
    targetBuyers: ['Premium poultry farms', 'Fish hatcheries', 'Reptile breeders', 'Specialty farms'],
    benefits: [
      'Highest palatability — animals self-select fresh larvae over pellets',
      'No drying or milling cost — maximum nutritional density',
      'Same-day harvest-to-delivery preserves freshness',
      'Traceability: substrate source and harvest date on every delivery',
    ],
    ctaText: 'Order fresh larvae',
    ctaHref: '/apply?tab=buyer',
  },
]
