import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_COLORS } from '../lib/constants'
import type { Stop } from '../lib/types'

interface StopCardProps {
  stop: Stop
  visited: boolean
}

export function StopCard({ stop, visited }: StopCardProps) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(`/stop/${stop.id}`)}
      className="w-full text-left p-4 flex items-center gap-4 transition-all hover:translate-x-1"
      style={{
        background: 'rgba(245,236,215,0.5)',
        border: '1px solid rgba(42,24,16,0.25)',
        borderLeft: `4px solid ${CATEGORY_COLORS[stop.category]}`,
      }}
    >
      <div
        className="display-font text-3xl font-black w-10 text-center flex-shrink-0"
        style={{ color: CATEGORY_COLORS[stop.category] }}
      >
        {visited ? '✓' : String(stop.number).padStart(2, '0')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="display-font text-lg font-bold leading-tight" style={{ color: '#2a1810' }}>
          {stop.name}
        </div>
        <div className="type-font text-xs tracking-wider uppercase opacity-70">
          {stop.year} &middot; {stop.category}
        </div>
      </div>
      <ChevronRight size={20} style={{ color: '#8b4513' }} />
    </button>
  )
}
