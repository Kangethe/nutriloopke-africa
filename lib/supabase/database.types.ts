// ─────────────────────────────────────────────────────────────────────────────
// Supabase Database Types
// This file mirrors the SQL schema in supabase/migrations/001_initial_schema.sql
// In production, regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
// ─────────────────────────────────────────────────────────────────────────────

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      partner_applications: {
        Row: {
          id: string
          type: 'waste_supplier' | 'buyer' | 'investor' | 'research' | 'media'
          status: 'pending' | 'reviewed' | 'contacted' | 'converted' | 'declined'
          organisation_name: string | null
          contact_name: string
          email: string
          phone: string | null
          location: string | null
          waste_type: string[] | null
          daily_volume_kg: number | null
          collection_address: string | null
          product_interest: string[] | null
          monthly_volume_kg: number | null
          delivery_area: string | null
          fund_type: string | null
          investment_range: string | null
          timeline: string | null
          institution: string | null
          research_area: string | null
          publication: string | null
          story_angle: string | null
          deadline: string | null
          notes: string | null
          source_tab: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: 'waste_supplier' | 'buyer' | 'investor' | 'research' | 'media'
          status?: 'pending' | 'reviewed' | 'contacted' | 'converted' | 'declined'
          organisation_name?: string | null
          contact_name: string
          email: string
          phone?: string | null
          location?: string | null
          waste_type?: string[] | null
          daily_volume_kg?: number | null
          collection_address?: string | null
          product_interest?: string[] | null
          monthly_volume_kg?: number | null
          delivery_area?: string | null
          fund_type?: string | null
          investment_range?: string | null
          timeline?: string | null
          institution?: string | null
          research_area?: string | null
          publication?: string | null
          story_angle?: string | null
          deadline?: string | null
          notes?: string | null
          source_tab?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'reviewed' | 'contacted' | 'converted' | 'declined'
          notes?: string | null
          updated_at?: string
        }
      }

      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          organisation: string | null
          subject: string
          message: string
          enquiry_type: 'general' | 'media' | 'partnership' | 'investor' | 'other'
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          organisation?: string | null
          subject: string
          message: string
          enquiry_type: 'general' | 'media' | 'partnership' | 'investor' | 'other'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: never
      }

      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          source: string
          status: 'active' | 'unsubscribed'
          ip_address: string | null
          created_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          source?: string
          status?: 'active' | 'unsubscribed'
          ip_address?: string | null
          created_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          status?: 'active' | 'unsubscribed'
          unsubscribed_at?: string | null
        }
      }

      kpi_values: {
        Row: {
          id: string
          key: string
          label: string
          value: number
          unit: string | null
          prefix: string | null
          suffix: string | null
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          label: string
          value: number
          unit?: string | null
          prefix?: string | null
          suffix?: string | null
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          label?: string
          value?: number
          unit?: string | null
          prefix?: string | null
          suffix?: string | null
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      application_type: 'waste_supplier' | 'buyer' | 'investor' | 'research' | 'media'
      application_status: 'pending' | 'reviewed' | 'contacted' | 'converted' | 'declined'
      enquiry_type: 'general' | 'media' | 'partnership' | 'investor' | 'other'
      subscriber_status: 'active' | 'unsubscribed'
    }
  }
}

// Convenience type aliases
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type PartnerApplicationRow = Tables<'partner_applications'>
export type ContactSubmissionRow = Tables<'contact_submissions'>
export type NewsletterSubscriberRow = Tables<'newsletter_subscribers'>
export type KpiValueRow = Tables<'kpi_values'>
