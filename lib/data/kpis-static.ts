export interface StaticKpi {
  key: string
  label: string
  value: number
  prefix?: string
  unit?: string
  suffix?: string
  description?: string
  displayOrder: number
}

// Mirrors supabase/seed.sql — update both when values change
export const STATIC_KPIS: StaticKpi[] = [
  {
    key: 'waste_daily_kenya',
    label: 'tonnes of waste Kenya generates daily',
    value: 22000,
    suffix: '+',
    unit: 'tonnes',
    description: 'NEMA, 2022',
    displayOrder: 1,
  },
  {
    key: 'organic_waste_mismanaged',
    label: 'of organic waste is mismanaged',
    value: 75,
    unit: '%',
    description: 'UNEP, 2021',
    displayOrder: 2,
  },
  {
    key: 'feed_imported',
    label: 'of Kenya livestock feed is imported',
    value: 60,
    unit: '%',
    description: 'USAID, 2023',
    displayOrder: 3,
  },
  {
    key: 'bsf_conversion_days',
    label: 'from organic waste to sellable protein',
    value: 14,
    unit: 'days',
    displayOrder: 4,
  },
  {
    key: 'gross_margin',
    label: 'gross margin — confirmed by CGIAR',
    value: 50,
    unit: '%',
    suffix: '+',
    description: 'Across 373 farms studied',
    displayOrder: 5,
  },
  {
    key: 'waste_diverted_year1',
    label: 'organic waste diverted from Dandora',
    value: 360,
    unit: 't',
    description: 'Year 1 projection',
    displayOrder: 6,
  },
  {
    key: 'co2_avoided_year1',
    label: 'CO₂-equivalent emissions avoided',
    value: 630,
    unit: 't CO₂-eq',
    description: 'Year 1 projection',
    displayOrder: 7,
  },
  {
    key: 'sdgs_addressed',
    label: 'SDGs directly addressed',
    value: 8,
    unit: 'SDGs',
    displayOrder: 8,
  },
  {
    key: 'protein_meal_year1',
    label: 'protein meal produced — Year 1',
    value: 30,
    unit: 't',
    description: 'Replacing imported soy',
    displayOrder: 9,
  },
  {
    key: 'frass_year1',
    label: 'frass to smallholder farmers',
    value: 120,
    unit: 't',
    description: 'Year 1 projection',
    displayOrder: 10,
  },
  {
    key: 'feed_market_tam',
    label: 'Kenya animal feed market',
    value: 200,
    prefix: 'KES',
    unit: 'B',
    description: 'Total addressable market',
    displayOrder: 11,
  },
  {
    key: 'price_vs_soy',
    label: 'cheaper than imported soybean meal',
    value: 40,
    unit: '%',
    displayOrder: 12,
  },
  {
    key: 'direct_jobs',
    label: 'direct jobs created',
    value: 5,
    unit: 'jobs',
    description: 'Year 1',
    displayOrder: 13,
  },
  {
    key: 'indirect_jobs',
    label: 'indirect jobs supported',
    value: 20,
    unit: 'jobs',
    description: 'Year 1',
    displayOrder: 14,
  },
]

// Subset used in the homepage KPI strip (most impactful 8)
export const HOME_KPIS = STATIC_KPIS.filter((k) =>
  [
    'waste_diverted_year1',
    'co2_avoided_year1',
    'sdgs_addressed',
    'gross_margin',
    'protein_meal_year1',
    'frass_year1',
    'direct_jobs',
    'bsf_conversion_days',
  ].includes(k.key)
).sort((a, b) => a.displayOrder - b.displayOrder)
