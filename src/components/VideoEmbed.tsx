import { useState } from 'react'
import { Play } from 'lucide-react'

interface VideoEmbedProps {
  embedUrl: string | null
  label: string | null
  posterUrl?: string | null
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.pathname.startsWith('/shorts/')) {
      return u.pathname.replace('/shorts/', '').split('/')[0]
    }
    const v = u.searchParams.get('v')
    if (v) return v
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0]
    return null
  } catch {
    return null
  }
}

function isPlaceholder(url: string | null): boolean {
  return !url || url.includes('placeholder')
}

export function VideoEmbed({ embedUrl, label, posterUrl }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const hasVideo = !isPlaceholder(embedUrl)
  const ytId = hasVideo ? getYouTubeId(embedUrl!) : null

  if (hasVideo && !ytId) {
    const ismov = embedUrl!.toLowerCase().includes('.mov')
    return (
      <video
        poster={posterUrl ?? undefined}
        controls
        playsInline
        preload="none"
        className="w-full aspect-video"
        style={{ border: '2px solid #2a1810', display: 'block', background: '#2a1810' }}
      >
        <source src={embedUrl!} type={ismov ? 'video/quicktime' : 'video/mp4'} />
      </video>
    )
  }

  if (hasVideo && ytId) {
    if (playing) {
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&playsinline=1&rel=0`}
          className="w-full aspect-video"
          style={{ border: '2px solid #2a1810', display: 'block' }}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          title={label ?? 'Video'}
        />
      )
    }

    return (
      <button
        onClick={() => setPlaying(true)}
        className="w-full aspect-video relative overflow-hidden press-shadow"
        style={{ border: '2px solid #2a1810', padding: 0, display: 'block', cursor: 'pointer' }}
        aria-label={`Play ${label ?? 'video'}`}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.6)' }}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
            style={{ background: 'rgba(184,73,28,0.95)', border: '3px solid #f5ecd7' }}
          >
            <Play size={32} style={{ marginLeft: '4px', color: '#f5ecd7' }} />
          </div>
          {label && (
            <div className="display-font italic text-lg px-4 text-center" style={{ color: '#f5ecd7' }}>
              {label}
            </div>
          )}
        </div>
      </button>
    )
  }

  return (
    <div
      className="aspect-video flex items-center justify-center relative overflow-hidden press-shadow"
      style={{ background: '#2a1810', border: '2px solid #2a1810' }}
    >
      {posterUrl && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${posterUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        />
      )}
      <div className="relative text-center" style={{ color: '#f5ecd7' }}>
        <div
          className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
          style={{ background: 'rgba(184,73,28,0.9)', border: '2px solid #f5ecd7' }}
        >
          <Play size={24} style={{ marginLeft: '3px' }} />
        </div>
        {label && <div className="display-font italic text-lg">{label}</div>}
        <div className="type-font text-xs tracking-widest uppercase opacity-70 mt-1">
          [ Video Coming Soon ]
        </div>
      </div>
    </div>
  )
}
