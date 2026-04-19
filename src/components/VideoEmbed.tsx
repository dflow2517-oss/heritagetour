import { Play } from 'lucide-react'

interface VideoEmbedProps {
  embedUrl: string | null
  label: string | null
  posterUrl?: string | null
}

function isPlaceholder(url: string | null): boolean {
  return !url || url.includes('placeholder')
}

export function VideoEmbed({ embedUrl, label, posterUrl }: VideoEmbedProps) {
  const hasVideo = !isPlaceholder(embedUrl)

  const inner = (
    <>
      {posterUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${posterUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            opacity: hasVideo ? 0.5 : 0.3,
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
          {hasVideo ? '[ Watch on YouTube ]' : '[ Video Coming Soon ]'}
        </div>
      </div>
    </>
  )

  const boxClass = "aspect-video flex items-center justify-center relative overflow-hidden press-shadow"
  const boxStyle = { background: '#2a1810', border: '2px solid #2a1810' }

  if (hasVideo) {
    return (
      <a
        href={embedUrl!}
        target="_blank"
        rel="noopener noreferrer"
        className={boxClass}
        style={{ ...boxStyle, textDecoration: 'none' }}
      >
        {inner}
      </a>
    )
  }

  return (
    <div className={boxClass} style={boxStyle}>
      {inner}
    </div>
  )
}
