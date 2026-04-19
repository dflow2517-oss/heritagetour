import { Play } from 'lucide-react'

interface VideoEmbedProps {
  embedUrl: string | null
  label: string | null
  posterUrl?: string | null
}

function getEmbedSrc(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.replace('/shorts/', '').split('/')[0]
      return `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`
    }
    const v = u.searchParams.get('v')
    if (v) return `https://www.youtube-nocookie.com/embed/${v}?playsinline=1&rel=0`
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      return `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`
    }
    return null
  } catch {
    return null
  }
}

function isPlaceholder(url: string | null): boolean {
  return !url || url.includes('placeholder')
}

export function VideoEmbed({ embedUrl, label, posterUrl }: VideoEmbedProps) {
  const src = !isPlaceholder(embedUrl) ? getEmbedSrc(embedUrl!) : null

  if (src) {
    return (
      <iframe
        src={src}
        className="w-full aspect-video"
        style={{ border: '2px solid #2a1810', display: 'block' }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        loading="lazy"
        title={label ?? 'Video'}
      />
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
