import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PassportStamp } from '../components/PassportStamp'
import { useStops } from '../lib/StopsContext'
import { useVisits } from '../hooks/useVisits'

export function Passport() {
  const navigate = useNavigate()
  const { stops, loading } = useStops()
  const { visitedIds } = useVisits()

  if (loading) {
    return (
      <div className="paper-bg min-h-screen flex items-center justify-center">
        <div className="display-font italic text-xl" style={{ color: '#2a1810' }}>
          Loading passport…
        </div>
      </div>
    )
  }

  const allVisited = stops.length > 0 && visitedIds.size >= stops.length

  return (
    <div className="paper-bg min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="press-shadow px-3 py-2 flex items-center gap-2 mb-6"
          style={{ background: '#f5ecd7', border: '2px solid #2a1810', color: '#2a1810' }}
        >
          <ChevronLeft size={18} />
          <span className="type-font text-xs tracking-widest uppercase">Home</span>
        </button>

        <div className="text-center mb-8">
          <div className="type-font text-xs tracking-[0.3em] uppercase opacity-70">
            Official Document
          </div>
          <h2 className="display-font text-4xl md:text-5xl font-black mt-2">Heritage Passport</h2>
          <div className="display-font italic text-lg mt-1" style={{ color: '#b8491c' }}>
            Randall County, Texas
          </div>
          <div
            className="mt-4 inline-block px-4 py-2"
            style={{ background: '#2a1810', color: '#f5ecd7' }}
          >
            <span className="type-font text-sm tracking-widest">
              {visitedIds.size} / {stops.length} STAMPS COLLECTED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stops.map((stop) => (
            <PassportStamp key={stop.id} stop={stop} visited={visitedIds.has(stop.id)} />
          ))}
        </div>

        {allVisited && (
          <div
            className="text-center p-6"
            style={{ background: '#3d5a3d', color: '#f5ecd7', border: '2px solid #2a1810' }}
          >
            <div className="display-font italic text-2xl mb-2">Tour Complete</div>
            <div className="type-font text-xs tracking-widest">
              YOU'VE WALKED THE CANYON SQUARE
            </div>
          </div>
        )}

        <div
          className="text-center mt-10 pt-6"
          style={{ borderTop: '1px solid rgba(42,24,16,0.2)' }}
        >
          <div className="type-font text-xs tracking-widest uppercase opacity-60">
            Randall County Historical Commission
          </div>
        </div>
      </div>
    </div>
  )
}
