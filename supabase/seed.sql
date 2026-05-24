-- =============================================================================
-- NutriLoop Africa — Seed Data
-- File: supabase/seed.sql
-- Run AFTER 001_initial_schema.sql via: supabase db seed OR SQL editor
-- =============================================================================

-- ── KPI Values ────────────────────────────────────────────────────────────────
-- Seed the 14 core impact KPIs. Update values as the business grows.
-- All values are Year 1 projections unless noted as "live" Kenya statistics.

INSERT INTO kpi_values
  (key, label, value, prefix, unit, suffix, description, is_public, display_order)
VALUES
  (
    'waste_daily_kenya',
    'Tonnes of waste Kenya generates daily',
    22000,
    NULL,
    'tonnes',
    '+',
    'National daily organic waste generation — Kenya National Environment Management Authority (NEMA), 2022',
    true,
    1
  ),
  (
    'organic_waste_mismanaged',
    'Of organic waste is mismanaged',
    75,
    NULL,
    '%',
    NULL,
    'Share of Kenya organic waste that reaches open dumps, drains, or informal disposal — UNEP, 2021',
    true,
    2
  ),
  (
    'feed_imported',
    'Of Kenya livestock feed is imported',
    60,
    NULL,
    '%',
    NULL,
    'Livestock feed import dependency — Kenya Feeds and Fertilisers Sector Study, USAID, 2023',
    true,
    3
  ),
  (
    'bsf_conversion_days',
    'From organic waste to sellable protein',
    14,
    NULL,
    'days',
    NULL,
    'Black Soldier Fly bioconversion cycle from substrate intake to harvest-ready larvae',
    true,
    4
  ),
  (
    'gross_margin',
    'Gross margin — confirmed by CGIAR study',
    50,
    NULL,
    '%',
    '+',
    'Confirmed across 373 BSF farms studied by CGIAR / Alliance of Bioversity International and CIAT, 2023',
    true,
    5
  ),
  (
    'waste_diverted_year1',
    'Organic waste diverted from Dandora',
    360,
    NULL,
    'tonnes',
    NULL,
    'Year 1 projection — diverted from Nairobi Dandora dumpsite into BSF bioconversion',
    true,
    6
  ),
  (
    'co2_avoided_year1',
    'CO₂-equivalent emissions avoided',
    630,
    NULL,
    'tonnes',
    NULL,
    'Year 1 GHG avoidance projection. Calculated from methane avoidance (landfill diversion) + soy displacement (land use change emissions)',
    true,
    7
  ),
  (
    'sdgs_addressed',
    'UN Sustainable Development Goals directly addressed',
    8,
    NULL,
    'SDGs',
    NULL,
    'Direct: SDG 2, 3, 8, 12, 13, 15. Indirect: SDG 1, 5, 6, 9, 10, 14, 17',
    true,
    8
  ),
  (
    'protein_meal_year1',
    'BSF protein meal produced — Year 1',
    30,
    NULL,
    'tonnes',
    NULL,
    'Year 1 projection at 40–55% crude protein, replacing imported soybean meal for Kenyan poultry and aquaculture',
    true,
    9
  ),
  (
    'frass_year1',
    'Frass fertiliser to smallholder farmers',
    120,
    NULL,
    'tonnes',
    NULL,
    'Year 1 projection — frass (BSF excrement + exoskeleton) delivered as N:P:K balanced biostimulant fertiliser',
    true,
    10
  ),
  (
    'feed_market_tam',
    'Kenya animal feed market — total addressable market',
    200,
    'KES',
    'billion',
    NULL,
    'Kenya animal feed industry market size — Kenya Animal Feeds Manufacturers Association, 2023',
    true,
    11
  ),
  (
    'price_vs_soy',
    'Cheaper than imported soybean meal at our price point',
    40,
    NULL,
    '%',
    NULL,
    'Price competitiveness of NutriLoop BSF protein meal vs. landed cost of imported soybean meal at Year 1 target pricing',
    true,
    12
  ),
  (
    'direct_jobs',
    'Direct jobs created — Year 1',
    5,
    NULL,
    'jobs',
    NULL,
    'Full-time direct hires at the NutriLoop Africa facility: operations, logistics, quality, admin',
    true,
    13
  ),
  (
    'indirect_jobs',
    'Indirect jobs supported — Year 1',
    20,
    NULL,
    'jobs',
    NULL,
    'Indirect employment: waste collection partners, out-grower network, distribution agents',
    true,
    14
  )
ON CONFLICT (key) DO UPDATE SET
  label         = EXCLUDED.label,
  value         = EXCLUDED.value,
  prefix        = EXCLUDED.prefix,
  unit          = EXCLUDED.unit,
  suffix        = EXCLUDED.suffix,
  description   = EXCLUDED.description,
  display_order = EXCLUDED.display_order,
  updated_at    = now();
