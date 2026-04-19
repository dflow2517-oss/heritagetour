import { Play } from 'lucide-react'

interface VideoEmbedProps {
  embedUrl: string | null
  label: string | null
  posterUrl?: string | null
}

function isPlaceholder(url: string | null): boolean {
  return !url || url.includes('placeholder')
}

function isDirectVideo(url: string): boolean {
  return !url.includes('youtube') && !url.includes('youtu.be')
}

export function VideoEmbed({ embedUrl, label, posterUrl }: VideoEmbedProps) {
  const hasVideo = !isPlaceholder(embedUrl)

  if (hasVideo && isDirectVideo(embedUrl!)) {
    return (
      <video
        src={embedUrl!}
        poster={posterUrl ?? undefined}
        controls
        playsInline
        preload="none"
        className="w-full aspect-video"
        style={{ border: '2px solid #2a1810', display: 'block', background: '#2a1810' }}
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
