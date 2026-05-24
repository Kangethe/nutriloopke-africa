export interface SDGData {
  number: number
  title: string
  color: string
  impact: 'direct' | 'indirect'
  contribution: string
}

// NutriLoop Africa directly addresses 8 SDGs:
// 2, 3, 8, 9, 11, 12, 13, 15
// All others are indirect contributions

export const SDG_DATA: SDGData[] = [
  {
    number: 1,
    title: 'No Poverty',
    color: '#E5243B',
    impact: 'indirect',
    contribution:
      'Affordable frass fertiliser and BSF protein feed increase net income for smallholder farmers across Kenya.',
  },
  {
    number: 2,
    title: 'Zero Hunger',
    color: '#DDA63A',
    impact: 'direct',
    contribution:
      'BSF protein meal at 40% below imported soy price reduces feed costs for smallholder poultry and fish farmers, directly improving food security.',
  },
  {
    number: 3,
    title: 'Good Health',
    color: '#4C9F38',
    impact: 'direct',
    contribution:
      'Diverting organic waste from Dandora reduces disease vectors — flies, vermin, leachate — improving urban public health in Nairobi.',
  },
  {
    number: 4,
    title: 'Quality Education',
    color: '#C5192D',
    impact: 'indirect',
    contribution:
      'University and ICIPE research partnerships create live circular economy case studies and data for students and researchers.',
  },
  {
    number: 5,
    title: 'Gender Equality',
    color: '#FF3A21',
    impact: 'indirect',
    contribution:
      'NutriLoop\'s out-grower model prioritises women smallholders for frass distribution and satellite larvae rearing agreements.',
  },
  {
    number: 6,
    title: 'Clean Water',
    color: '#26BDE2',
    impact: 'indirect',
    contribution:
      'Organic waste diversion prevents leachate from entering Nairobi\'s drainage system and waterways feeding into the Indian Ocean.',
  },
  {
    number: 7,
    title: 'Affordable Energy',
    color: '#FCC30B',
    impact: 'indirect',
    contribution:
      'BSF residue oil fraction is a low-carbon biofuel feedstock candidate — on our Phase 2 product roadmap.',
  },
  {
    number: 8,
    title: 'Decent Work',
    color: '#A21942',
    impact: 'direct',
    contribution:
      '5 direct + 20 indirect jobs created in Year 1. Formal employment in operations, logistics, quality control, and distribution.',
  },
  {
    number: 9,
    title: 'Industry & Innovation',
    color: '#FD6925',
    impact: 'direct',
    contribution:
      'ICIPE-backed BSF bioconversion science commercialised at scale in Kenya for the first time — demonstrating replicable circular food infrastructure.',
  },
  {
    number: 10,
    title: 'Reduced Inequalities',
    color: '#DD1367',
    impact: 'indirect',
    contribution:
      'Affordable protein feed reduces the cost disadvantage for smallholder farmers vs. large commercial livestock operations.',
  },
  {
    number: 11,
    title: 'Sustainable Cities',
    color: '#FD9D24',
    impact: 'direct',
    contribution:
      '360 tonnes of organic waste diverted from Dandora dumpsite in Year 1 — direct contribution to Nairobi\'s sustainable waste infrastructure.',
  },
  {
    number: 12,
    title: 'Responsible Consumption',
    color: '#BF8B2E',
    impact: 'direct',
    contribution:
      'True closed-loop model: food waste → insect protein → livestock feed → food. Every kilogram of substrate becomes product.',
  },
  {
    number: 13,
    title: 'Climate Action',
    color: '#3F7E44',
    impact: 'direct',
    contribution:
      '630 tonnes CO₂-equivalent avoided in Year 1 through methane avoidance (landfill diversion) and soy displacement (deforestation avoided).',
  },
  {
    number: 14,
    title: 'Life Below Water',
    color: '#0A97D9',
    impact: 'indirect',
    contribution:
      'Leachate prevention protects waterways. BSF meal reduces dependency on wild-caught fishmeal in Kenyan aquaculture.',
  },
  {
    number: 15,
    title: 'Life on Land',
    color: '#56C02B',
    impact: 'direct',
    contribution:
      'Frass fertiliser restores degraded smallholder soils with balanced N:P:K + chitin biostimulant — reducing synthetic fertiliser runoff.',
  },
  {
    number: 16,
    title: 'Peace & Justice',
    color: '#00689D',
    impact: 'indirect',
    contribution:
      'NEMA-compliant operations provide documented, formal waste disposal — supporting Kenya\'s regulatory transition under the SWMA 2022.',
  },
  {
    number: 17,
    title: 'Partnerships',
    color: '#19486A',
    impact: 'direct',
    contribution:
      'ICIPE, CGIAR, GCA, AECF, county government, waste suppliers, and buyers form a 6-type partnership ecosystem around a single circular model.',
  },
]

export const DIRECT_SDGS = SDG_DATA.filter((s) => s.impact === 'direct')
export const INDIRECT_SDGS = SDG_DATA.filter((s) => s.impact === 'indirect')
