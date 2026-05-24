-- =============================================================================
-- NutriLoop Africa — Supabase Initial Schema
-- Migration: 001_initial_schema.sql
-- Run via: supabase db push OR paste into Supabase SQL editor
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- ENUMS
-- =============================================================================

DO $$ BEGIN
  CREATE TYPE application_type AS ENUM (
    'waste_supplier',
    'buyer',
    'investor',
    'research',
    'media'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE application_status AS ENUM (
    'pending',
    'reviewed',
    'contacted',
    'converted',
    'declined'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enquiry_type AS ENUM (
    'general',
    'media',
    'partnership',
    'investor',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE subscriber_status AS ENUM (
    'active',
    'unsubscribed'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- =============================================================================
-- TABLES
-- =============================================================================

-- ── partner_applications ─────────────────────────────────────────────────────
-- Stores every application from the /apply form (all 5 tab types)

CREATE TABLE IF NOT EXISTS partner_applications (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Discriminator & lifecycle
  type              application_type    NOT NULL,
  status            application_status  NOT NULL DEFAULT 'pending',

  -- Shared contact fields (all types)
  organisation_name text,
  contact_name      text        NOT NULL CHECK (length(trim(contact_name)) >= 2),
  email             text        NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone             text,
  location          text,

  -- waste_supplier fields
  waste_type        text[],
  daily_volume_kg   integer     CHECK (daily_volume_kg > 0 AND daily_volume_kg <= 50000),
  collection_address text,

  -- buyer fields
  product_interest  text[],
  monthly_volume_kg integer     CHECK (monthly_volume_kg > 0 AND monthly_volume_kg <= 500000),
  delivery_area     text,

  -- investor fields
  fund_type         text,
  investment_range  text,
  timeline          text,

  -- research fields
  institution       text,
  research_area     text,

  -- media fields
  publication       text,
  story_angle       text,
  deadline          date,

  -- Common optional
  notes             text        CHECK (length(notes) <= 1000),
  source_tab        text,

  -- Request metadata (logged for abuse prevention, not shown in admin UI)
  ip_address        inet,
  user_agent        text,

  -- Timestamps
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE partner_applications IS
  'All partner application submissions from /apply (5 form types via discriminated union)';

-- ── contact_submissions ───────────────────────────────────────────────────────
-- Stores every contact form submission from /contact

CREATE TABLE IF NOT EXISTS contact_submissions (
  id             uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  name           text         NOT NULL CHECK (length(trim(name)) >= 2),
  email          text         NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  organisation   text,
  subject        text         NOT NULL CHECK (length(trim(subject)) >= 3),
  message        text         NOT NULL CHECK (length(trim(message)) >= 10),
  enquiry_type   enquiry_type NOT NULL,
  ip_address     inet,
  user_agent     text,
  created_at     timestamptz  NOT NULL DEFAULT now()
);

COMMENT ON TABLE contact_submissions IS
  'Contact form submissions from /contact. Immutable after insert — no updates.';

-- ── newsletter_subscribers ────────────────────────────────────────────────────
-- Email list for the footer newsletter sign-up

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              uuid              DEFAULT gen_random_uuid() PRIMARY KEY,
  email           text              NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  source          text              NOT NULL DEFAULT 'footer',
  status          subscriber_status NOT NULL DEFAULT 'active',
  ip_address      inet,
  created_at      timestamptz       NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz
);

COMMENT ON TABLE newsletter_subscribers IS
  'Newsletter subscriber list. Supports re-subscribe (status toggle) and unsubscribe via email link.';

-- ── kpi_values ────────────────────────────────────────────────────────────────
-- Admin-editable impact numbers shown on homepage and /impact page

CREATE TABLE IF NOT EXISTS kpi_values (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  key            text        NOT NULL UNIQUE CHECK (key ~ '^[a-z][a-z0-9_]*$'),
  label          text        NOT NULL,
  value          numeric     NOT NULL,
  unit           text,
  prefix         text,
  suffix         text,
  description    text,
  is_public      boolean     NOT NULL DEFAULT true,
  display_order  integer     NOT NULL DEFAULT 10,
  updated_at     timestamptz NOT NULL DEFAULT now(),
  updated_by     text
);

COMMENT ON TABLE kpi_values IS
  'Impact KPI values editable by founders via the admin dashboard. Cached 5min on /api/kpis.';

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_partner_applications_type
  ON partner_applications (type);

CREATE INDEX IF NOT EXISTS idx_partner_applications_status
  ON partner_applications (status);

CREATE INDEX IF NOT EXISTS idx_partner_applications_email
  ON partner_applications (email);

CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at
  ON partner_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
  ON contact_submissions (email);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email
  ON newsletter_subscribers (email);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status
  ON newsletter_subscribers (status);

CREATE INDEX IF NOT EXISTS idx_kpi_values_key
  ON kpi_values (key);

CREATE INDEX IF NOT EXISTS idx_kpi_values_display_order
  ON kpi_values (display_order) WHERE is_public = true;

-- =============================================================================
-- TRIGGERS — auto-update updated_at
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_partner_applications_updated_at ON partner_applications;
CREATE TRIGGER trg_partner_applications_updated_at
  BEFORE UPDATE ON partner_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_kpi_values_updated_at ON kpi_values;
CREATE TRIGGER trg_kpi_values_updated_at
  BEFORE UPDATE ON kpi_values
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE partner_applications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_values              ENABLE ROW LEVEL SECURITY;

-- ── partner_applications — service_role only ──────────────────────────────────
-- Public users cannot read or write directly — all writes go through the API
-- route using the service_role key. Admin dashboard reads also use service_role.

CREATE POLICY "partner_applications_service_role_all"
  ON partner_applications
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── contact_submissions — service_role only ───────────────────────────────────

CREATE POLICY "contact_submissions_service_role_all"
  ON contact_submissions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── newsletter_subscribers — service_role only ────────────────────────────────

CREATE POLICY "newsletter_subscribers_service_role_all"
  ON newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── kpi_values — public SELECT, service_role all ──────────────────────────────
-- KPI numbers are public data — the impact page fetches them directly.
-- Only service_role can insert/update/delete.

CREATE POLICY "kpi_values_public_select"
  ON kpi_values
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "kpi_values_service_role_all"
  ON kpi_values
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
