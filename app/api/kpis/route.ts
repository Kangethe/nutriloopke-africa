import { NextResponse } from 'next/server'
import { getSupabaseServiceClient } from '@/lib/supabase/server'
import type { ApiResponse, KpiValue } from '@/types'

// Cache KPI values at the edge for 5 minutes — they change infrequently
// Revalidate via ISR on the impact page instead of polling this endpoint
export const revalidate = 300

export async function GET(): Promise<NextResponse<ApiResponse<KpiValue[]>>> {
  try {
    const supabase = getSupabaseServiceClient()

    const { data, error } = await supabase
      .from('kpi_values')
      .select('id, key, label, value, unit, prefix, suffix, description, updated_at')
      .eq('is_public', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('[/api/kpis] Supabase query error:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to load KPI data.',
          code: 'DATABASE_ERROR',
        },
        { status: 500 }
      )
    }

    const kpis: KpiValue[] = (data ?? []).map((row) => ({
      id: row.id,
      key: row.key,
      label: row.label,
      value: row.value,
      unit: row.unit ?? undefined,
      prefix: row.prefix ?? undefined,
      suffix: row.suffix ?? undefined,
      description: row.description ?? undefined,
      updated_at: row.updated_at,
    }))

    return NextResponse.json(
      { success: true, data: kpis },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('[/api/kpis] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Unexpected error loading KPI data.', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
