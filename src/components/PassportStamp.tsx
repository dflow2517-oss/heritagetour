import { useNavigate } from 'react-router-dom'
import type { Stop } from '../lib/types'

interface PassportStampProps {
  stop: Stop
  visited: boolean
}

export function PassportStamp({ stop, visited }: PassportStampProps) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/stop/${stop.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/stop/${stop.id}`)}
      className="cursor-pointer p-4 text-center relative transition-all hover:-translate-y-1 focus:outline-none"
      style={{
        background: '#f5ecd7',
        border: `2px ${visited ? 'solid' : 'dashed'} #2a1810`,
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {visited ? (
        <>
          <div
            className="absolute inset-2 flex items-center justify-center pointer-events-none"
            style={{
              border: '2px solid #b8491c',
              borderRadius: '50%',
              opacity: 0.7,
              transform: 'rotate(-8deg)',
            }}
          >
            <div className="text-center">
              <div className="type-font text-[9px] tracking-widest" style={{ color: '#b8491c' }}>
                VISITED
              </div>
              <div className="display-font text-xs font-bold" style={{ color: '#b8491c' }}>
                CANYON, TX
              </div>
            </div>
          </div>
          <div
            className="display-font font-bold text-sm leading-tight z-10"
            style={{ color: '#2a1810' }}
          >
            {stop.name.split(' ').slice(0, 2).join(' ')}
          </div>
        </>
      ) : (
        <>
          <div className="display-font text-3xl font-black opacity-30">
            {String(stop.number).padStart(2, '0')}
          </div>
          <div className="type-font text-xs tracking-wider uppercase opacity-40 mt-1">
            Unstamped
          </div>
        </>
      )}
    </div>
  )
}
