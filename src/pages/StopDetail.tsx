import { MapPin, ChevronLeft, ChevronRight, Award, Check, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { AudioPlayer } from '../components/AudioPlayer'
import { VideoEmbed } from '../components/VideoEmbed'
import { CategoryBadge } from '../components/ui/CategoryBadge'
import { useStops } from '../lib/StopsContext'
import { useVisits } from '../hooks/useVisits'
import { CATEGORY_COLORS, PLACEHOLDER_AUDIO } from '../lib/constants'

export function StopDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { stops, loading } = useStops()
  const { visitedIds, checkIn } = useVisits()

  if (loading) {
    return (
      <div className="paper-bg min-h-screen flex items-center justify-center">
        <div className="display-font italic text-xl" style={{ color: '#2a1810' }}>
          Loading…
        </div>
      </div>
    )
  }

  const stop = stops.find((s) => s.id === id)

  if (!stop) {
    return (
      <div className="paper-bg min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="display-font italic text-2xl" style={{ color: '#2a1810' }}>
          Stop not found.
        </div>
        <button
          onClick={() => navigate('/')}
          className="press-shadow px-6 py-3 type-font text-xs tracking-widest uppercase"
          style={{ background: '#f5ecd7', border: '2px solid #2a1810', color: '#2a1810' }}
        >
          Back to Tour
        </button>
      </div>
    )
  }

  const idx = stops.indexOf(stop)
  const prevStop = idx > 0 ? stops[idx - 1] : null
  const nextStop = idx < stops.length - 1 ? stops[idx + 1] : null
  const isVisited = visitedIds.has(stop.id)
  const audioSrc = stop.audio_url ?? PLACEHOLDER_AUDIO

  return (
    <div className="paper-bg min-h-screen pb-24">
      {/* Hero */}
      <div
        className="relative h-72 md:h-96"
        style={{
          backgroundImage: stop.hero_image_url ? `url(${stop.hero_image_url})` : undefined,
          backgroundColor: stop.hero_image_url ? undefined : CATEGORY_COLORS[stop.category],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.2) contrast(1.05)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(42,24,16,0.3) 0%, transparent 40%, rgba(245,236,215,1) 100%)',
          }}
        />
        <button
          onClick={() => navigate('/map')}
          className="absolute top-4 left-4 press-shadow px-3 py-2 flex items-center justify-center"
          style={{ background: '#f5ecd7', border: '2px solid #2a1810', color: '#2a1810' }}
          aria-label="Back to map"
        >
          <X size={18} />
        </button>
        <div className="absolute top-4 right-4">
          <CategoryBadge category={stop.category} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-16 relative z-10">
        {/* Title block */}
        <div className="text-center mb-6">
          <div className="type-font text-xs tracking-[0.3em] uppercase opacity-70">
            Stop {String(stop.number).padStart(2, '0')} &middot; Est. {stop.year}
          </div>
          <h2
            className="display-font text-4xl md:text-5xl font-black leading-tight mt-2"
            style={{ color: '#2a1810' }}
          >
            {stop.name}
          </h2>
          <div className="display-font italic text-lg mt-2" style={{ color: '#b8491c' }}>
            {stop.blurb}
          </div>
        </div>

        {/* Audio */}
        <div className="mb-6">
          <AudioPlayer src={audioSrc} duration={stop.audio_duration} />
        </div>

        {/* Body text */}
        <div className="mb-8">
          <p className="text-lg leading-relaxed" style={{ color: '#2a1810' }}>
            {stop.body}
          </p>
        </div>

        {/* Video */}
        <div className="mb-8">
          <div className="type-font text-xs tracking-widest uppercase mb-2 opacity-70">
            Video
          </div>
          <VideoEmbed
            embedUrl={stop.video_embed_url}
            label={stop.video_label}
            posterUrl={stop.hero_image_url}
          />
        </div>

        {/* Address */}
        <div
          className="mb-6 p-4 flex items-start gap-3"
          style={{ background: 'rgba(184,73,28,0.08)', border: '1px dashed #8b4513' }}
        >
          <MapPin size={20} style={{ color: '#b8491c', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div className="type-font text-xs tracking-widest uppercase opacity-70">Location</div>
            <div className="font-semibold">{stop.address}</div>
            <a
              href={`https://maps.apple.com/?q=${encodeURIComponent(stop.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="type-font text-xs tracking-widest uppercase underline mt-1 inline-block hover:opacity-100 opacity-60"
              style={{ color: '#b8491c' }}
            >
              Open in Maps
            </a>
          </div>
        </div>

        {/* Check-in */}
        <button
          onClick={() => void checkIn(stop.id)}
          disabled={isVisited}
          className="w-full press-shadow py-4 mb-6 flex items-center justify-center gap-3"
          style={{
            background: isVisited ? '#3d5a3d' : '#b8491c',
            color: '#f5ecd7',
            border: '2px solid #2a1810',
          }}
        >
          {isVisited ? (
            <>
              <Check size={20} />
              <span className="display-font font-bold text-lg">Visited — Stamped in Passport</span>
            </>
          ) : (
            <>
              <Award size={20} />
              <span className="display-font font-bold text-lg">Check In at This Stop</span>
            </>
          )}
        </button>

        {/* Prev / Next */}
        <div className="flex gap-3">
          <button
            onClick={() => prevStop && navigate(`/stop/${prevStop.id}`)}
            disabled={!prevStop}
            className="flex-1 press-shadow p-3 flex items-center justify-center gap-2 disabled:opacity-30"
            style={{ background: '#f5ecd7', border: '2px solid #2a1810', color: '#2a1810' }}
          >
            <ChevronLeft size={18} />
            <div className="text-left">
              <div className="type-font text-xs tracking-widest uppercase opacity-60">Previous</div>
              <div className="display-font font-bold text-sm truncate max-w-[120px]">
                {prevStop?.name ?? '—'}
              </div>
            </div>
          </button>
          <button
            onClick={() => nextStop && navigate(`/stop/${nextStop.id}`)}
            disabled={!nextStop}
            className="flex-1 press-shadow p-3 flex items-center justify-center gap-2 disabled:opacity-30"
            style={{ background: '#f5ecd7', border: '2px solid #2a1810', color: '#2a1810' }}
          >
            <div className="text-right">
              <div className="type-font text-xs tracking-widest uppercase opacity-60">Next</div>
              <div className="display-font font-bold text-sm truncate max-w-[120px]">
                {nextStop?.name ?? '—'}
              </div>
            </div>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
