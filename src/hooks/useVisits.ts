import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getSessionId } from '../lib/session'

const VISITED_KEY = 'heritage_visited_ids'

function loadLocal(): Set<string> {
  try {
    const raw = localStorage.getItem(VISITED_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function saveLocal(ids: Set<string>) {
  localStorage.setItem(VISITED_KEY, JSON.stringify([...ids]))
}

export function useVisits() {
  const sessionId = getSessionId()
  const [visitedIds, setVisitedIds] = useState<Set<string>>(loadLocal)

  // Sync from Supabase on mount, merging with whatever's already in localStorage
  useEffect(() => {
    supabase
      .from('visits')
      .select('stop_id')
      .eq('user_session_id', sessionId)
      .then(({ data }) => {
        if (!data?.length) return
        setVisitedIds((prev) => {
          const merged = new Set([...prev, ...data.map((v) => v.stop_id as string)])
          saveLocal(merged)
          return merged
        })
      })
  }, [sessionId])

  const checkIn = useCallback(
    async (stopId: string) => {
      if (visitedIds.has(stopId)) return

      // Optimistic update — visible immediately even if Supabase is slow/offline
      setVisitedIds((prev) => {
        const next = new Set(prev)
        next.add(stopId)
        saveLocal(next)
        return next
      })

      try {
        await supabase.from('visits').insert({
          user_session_id: sessionId,
          stop_id: stopId,
          visited_at: new Date().toISOString(),
        })
      } catch {
        // Unique-constraint violations are fine — already tracked locally
      }
    },
    [sessionId, visitedIds],
  )

  return { visitedIds, checkIn }
}
