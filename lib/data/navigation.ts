export interface NavChild {
  label: string
  href: string
  desc: string
}

export interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Problem', href: '/problem' },
  { label: 'Solution', href: '/solution' },
  { label: 'Products', href: '/products' },
  { label: 'Impact', href: '/impact' },
  {
    label: 'Partner',
    children: [
      {
        label: 'Waste Suppliers',
        href: '/partner/waste-suppliers',
        desc: 'Hotels, hospitals, markets, schools',
      },
      {
        label: 'Buyers',
        href: '/partner/buyers',
        desc: 'Poultry, aquaculture, agrodealers',
      },
      {
        label: 'Investors',
        href: '/partner/investors',
        desc: 'Impact funders, development finance',
      },
      {
        label: 'Government',
        href: '/partner/government',
        desc: 'NEMA, county waste MOUs, EPR',
      },
      {
        label: 'Research',
        href: '/partner/research',
        desc: 'ICIPE, CGIAR, universities',
      },
    ],
  },
  {
    label: 'More',
    children: [
      { label: 'Sustainability', href: '/sustainability', desc: '17 SDGs, carbon roadmap' },
      { label: 'News', href: '/news', desc: 'Updates, milestones, media' },
      { label: 'Team', href: '/team', desc: 'Founders, advisors, governance' },
      { label: 'FAQ', href: '/faq', desc: 'Answers for every audience' },
    ],
  },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'News', href: '/news' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Impact', href: '/impact' },
    { label: 'FAQ', href: '/faq' },
  ],
  solutions: [
    { label: 'The Problem', href: '/problem' },
    { label: 'Our Solution', href: '/solution' },
    { label: 'Products', href: '/products' },
    { label: 'BSF Science', href: '/solution#bsf-science' },
    { label: 'Carbon Credits', href: '/sustainability#carbon' },
  ],
  partners: [
    { label: 'Waste Suppliers', href: '/partner/waste-suppliers' },
    { label: 'Buyers', href: '/partner/buyers' },
    { label: 'Investors', href: '/partner/investors' },
    { label: 'Government', href: '/partner/government' },
    { label: 'Research', href: '/partner/research' },
    { label: 'Apply Now', href: '/apply' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
}

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/nutriloop-africa',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/nutriloopAfrica',
    icon: 'instagram',
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/NutriLoopAfrica',
    icon: 'twitter',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@NutriLoopAfrica',
    icon: 'youtube',
  },
]
