import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  src: string
  duration?: string | null
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AudioPlayer({ src, duration }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [naturalDuration, setNaturalDuration] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  // Reset when the stop changes
  useEffect(() => {
    setPlaying(false)
    setCurrentTime(0)
    setProgress(0)
    setNaturalDuration(null)
    audioRef.current?.pause()
  }, [src])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => setPlaying(false))
      setPlaying(true)
    }
  }

  function onTimeUpdate() {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
  }

  function onLoadedMetadata() {
    if (audioRef.current) setNaturalDuration(audioRef.current.duration)
  }

  function onEnded() {
    setPlaying(false)
    setCurrentTime(0)
    setProgress(0)
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const displayDuration = naturalDuration ? formatTime(naturalDuration) : (duration ?? '—')

  return (
    <div
      className="flex items-center gap-4 p-4"
      style={{ background: '#2a1810', color: '#f5ecd7', border: '2px solid #2a1810' }}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />

      <button
        onClick={toggle}
        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
        style={{ background: '#b8491c', border: '2px solid #f5ecd7' }}
        aria-label={playing ? 'Pause narration' : 'Play narration'}
      >
        {playing ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
      </button>

      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <div className="type-font text-xs tracking-widest uppercase opacity-70">Audio Narration</div>
          <div className="display-font font-bold truncate">By Rī Wolf</div>
        </div>

        <div
          className="h-1 rounded-full cursor-pointer"
          style={{ background: 'rgba(245,236,215,0.2)' }}
          onClick={seek}
          role="slider"
          aria-label="Audio progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: '#b8491c', transition: 'width 0.25s linear' }}
          />
        </div>

        <div className="type-font text-xs flex justify-between opacity-70">
          <span>{formatTime(currentTime)}</span>
          <span>{displayDuration}</span>
        </div>
      </div>

      <Volume2 size={20} className="opacity-60 flex-shrink-0" />
    </div>
  )
}
