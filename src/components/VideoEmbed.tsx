import { Play } from 'lucide-react'

interface VideoEmbedProps {
  embedUrl: string | null
  label: string | null
  posterUrl?: string | null
}

function getIframeUrl(url: string): string | null {
  try {
    const u = new URL(url)

    // Cloudflare Stream
    if (u.hostname.includes('cloudflarestream.com') || u.hostname.includes('stream.cloudflare.com')) {
      return url
    }

    // YouTube Shorts
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.replace('/shorts/', '').split('/')[0]
      return `https://www.youtube.com/embed/${id}?playsinline=1&rel=0`
    }

    // YouTube regular
    const v = u.searchParams.get('v')
    if (v) return `https://www.youtube.com/embed/${v}?playsinline=1&rel=0`

    // youtu.be
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${u.pathname.slice(1).split('/')[0]}?playsinline=1&rel=0`
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
  const hasVideo = !isPlaceholder(embedUrl)
  const iframeUrl = hasVideo ? getIframeUrl(embedUrl!) : null

  if (hasVideo && iframeUrl) {
    return (
      <iframe
        src={iframeUrl}
        className="w-full aspect-video"
        style={{ border: '2px solid #2a1810', display: 'block' }}
        allowFullScreen
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        title={label ?? 'Video'}
      />
    )
  }

  if (hasVideo && !iframeUrl) {
    return (
      <video
        poster={posterUrl ?? undefined}
        controls
        playsInline
        preload="metadata"
        className="w-full aspect-video"
        style={{ border: '2px solid #2a1810', display: 'block', background: '#2a1810' }}
      >
        <source src={embedUrl!} />
      </video>
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
