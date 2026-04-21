import { Navigation, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StopCard } from '../components/StopCard'
import { useStops } from '../lib/StopsContext'
import { useVisits } from '../hooks/useVisits'

export function Home() {
  const navigate = useNavigate()
  const { tour, stops, loading, error } = useStops()
  const { visitedIds } = useVisits()

  if (loading) {
    return (
      <div className="paper-bg min-h-screen flex items-center justify-center">
        <div className="display-font italic text-xl" style={{ color: '#2a1810' }}>
          Loading tour…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="paper-bg min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="display-font italic text-xl mb-2" style={{ color: '#b8491c' }}>
            Could not load tour data.
          </div>
          <div className="type-font text-xs opacity-60">{error}</div>
        </div>
      </div>
    )
  }

  const coverStop = stops[0]

  return (
    <div className="paper-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="type-font text-xs tracking-[0.3em] uppercase" style={{ color: '#8b4513' }}>
            Randall County Historical Commission
          </div>
        </div>
        <div className="text-center mb-1 ornament" style={{ color: '#2a1810' }}>
          <span className="type-font text-xs tracking-widest uppercase">Established 1889</span>
        </div>
        <h1
          className="display-font text-center text-5xl md:text-7xl font-black leading-none mt-6 mb-3"
          style={{ color: '#2a1810' }}
        >
          Canyon, Texas
        </h1>
        <div className="text-center mb-8">
          <div className="display-font italic text-2xl md:text-3xl" style={{ color: '#b8491c' }}>
            A Heritage Tour
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #2a1810, transparent)',
            }}
          />
        </div>

        <div className="mb-10 px-4">
          <p
            className="text-lg leading-relaxed text-center display-font italic"
            style={{ color: '#2a1810' }}
          >
            {tour?.description ??
              "Walk the same streets where ranchers, merchants, and homesteaders built a town from scratch on the high plains of the Texas Panhandle."}
          </p>
        </div>

        {/* Hero card */}
        {coverStop?.hero_image_url && (
          <div className="mb-8">
            <div
              className="aspect-[16/10] overflow-hidden press-shadow relative"
              style={{
                border: '3px solid #2a1810',
                backgroundImage: `url(${coverStop.hero_image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'sepia(0.3) contrast(1.05)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(42,24,16,0.85) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="type-font text-xs tracking-widest uppercase"
                  style={{ color: '#f5ecd7' }}
                >
                  Stop {String(coverStop.number).padStart(2, '0')} &nbsp;·&nbsp; {coverStop.year}
                </div>
                <div
                  className="display-font text-2xl md:text-3xl font-bold"
                  style={{ color: '#f5ecd7' }}
                >
                  {coverStop.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => navigate('/map')}
            className="press-shadow py-5 px-6 text-left transition-all"
            style={{ background: '#b8491c', color: '#f5ecd7', border: '2px solid #2a1810' }}
          >
            <div className="flex items-center gap-3">
              <Navigation size={22} />
              <div>
                <div className="display-font text-xl font-bold">Begin the Tour</div>
                <div className="type-font text-xs tracking-wider opacity-90">
                  OPEN INTERACTIVE MAP
                </div>
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate('/passport')}
            className="press-shadow py-5 px-6 text-left transition-all"
            style={{ background: '#f5ecd7', color: '#2a1810', border: '2px solid #2a1810' }}
          >
            <div className="flex items-center gap-3">
              <Award size={22} />
              <div>
                <div className="display-font text-xl font-bold">My Passport</div>
                <div className="type-font text-xs tracking-wider opacity-70">
                  {visitedIds.size} / {stops.length} VISITED
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Stop list */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div style={{ flex: 1, height: '1px', background: '#2a1810', opacity: 0.3 }} />
            <div
              className="type-font text-xs tracking-[0.25em] uppercase"
              style={{ color: '#8b4513' }}
            >
              The Six Stops
            </div>
            <div style={{ flex: 1, height: '1px', background: '#2a1810', opacity: 0.3 }} />
          </div>
          <div className="space-y-3">
            {stops.map((stop) => (
              <StopCard key={stop.id} stop={stop} visited={visitedIds.has(stop.id)} />
            ))}
          </div>
        </div>

        <div
          className="text-center pt-8 pb-4"
          style={{ borderTop: '1px solid rgba(42,24,16,0.2)' }}
        >
          <div className="type-font text-xs tracking-widest uppercase opacity-60">
            A GoRoute66 &middot; Wolf Goes West Production
          </div>
        </div>
      </div>
    </div>
  )
}
