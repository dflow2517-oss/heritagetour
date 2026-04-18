import { Award, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LeafletMap } from '../components/LeafletMap'
import { useStops } from '../lib/StopsContext'
import { useVisits } from '../hooks/useVisits'

export function MapView() {
  const navigate = useNavigate()
  const { stops, loading } = useStops()
  const { visitedIds } = useVisits()

  return (
    <div className="relative h-screen">
      {loading ? (
        <div className="paper-bg h-full flex items-center justify-center">
          <div className="display-font italic text-xl" style={{ color: '#2a1810' }}>
            Loading map…
          </div>
        </div>
      ) : (
        <LeafletMap stops={stops} visitedIds={visitedIds} />
      )}

      {/* Floating header — sits above the map via z-index */}
      <div
        className="absolute top-0 left-0 right-0 p-4 z-[1000]"
        style={{
          background:
            'linear-gradient(180deg, rgba(245,236,215,0.98) 0%, rgba(245,236,215,0.85) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ pointerEvents: 'auto' }}
        >
          <button
            onClick={() => navigate('/')}
            className="press-shadow px-4 py-2 flex items-center gap-2"
            style={{ background: '#f5ecd7', border: '2px solid #2a1810', color: '#2a1810' }}
          >
            <ChevronLeft size={18} />
            <span className="type-font text-xs tracking-widest uppercase">Back</span>
          </button>

          <div className="text-center">
            <div className="type-font text-xs tracking-widest uppercase opacity-70">The Tour</div>
            <div className="display-font font-bold text-lg leading-none">Canyon Square</div>
          </div>

          <button
            onClick={() => navigate('/passport')}
            className="press-shadow px-4 py-2 flex items-center gap-2"
            style={{ background: '#b8491c', border: '2px solid #2a1810', color: '#f5ecd7' }}
          >
            <Award size={18} />
            <span className="type-font text-xs tracking-widest uppercase">
              {visitedIds.size}/{stops.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
