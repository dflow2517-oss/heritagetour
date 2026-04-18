import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from './supabase'
import { TOUR_SLUG } from './constants'
import type { Stop, Tour } from './types'

interface StopsContextValue {
  tour: Tour | null
  stops: Stop[]
  loading: boolean
  error: string | null
}

const StopsContext = createContext<StopsContextValue>({
  tour: null,
  stops: [],
  loading: true,
  error: null,
})

export function StopsProvider({ children }: { children: ReactNode }) {
  const [tour, setTour] = useState<Tour | null>(null)
  const [stops, setStops] = useState<Stop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { data: tourData, error: tourErr } = await supabase
          .from('tours')
          .select('*')
          .eq('slug', TOUR_SLUG)
          .single()

        if (tourErr) throw tourErr

        const { data: stopsData, error: stopsErr } = await supabase
          .from('stops')
          .select('*')
          .eq('tour_id', tourData.id)
          .order('number')

        if (stopsErr) throw stopsErr

        setTour(tourData as Tour)
        setStops((stopsData ?? []) as Stop[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tour data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <StopsContext.Provider value={{ tour, stops, loading, error }}>
      {children}
    </StopsContext.Provider>
  )
}

export const useStops = () => useContext(StopsContext)
