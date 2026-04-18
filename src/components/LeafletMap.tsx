import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_COLORS } from '../lib/constants'
import type { Stop } from '../lib/types'

function makePinIcon(stop: Stop, isVisited: boolean): L.DivIcon {
  const color = CATEGORY_COLORS[stop.category] ?? '#b8491c'
  const label = isVisited ? '✓' : String(stop.number)
  return L.divIcon({
    className: 'custom-pin',
    html: `<div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      border:3px solid #f5ecd7;
      box-shadow:0 4px 12px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
    "><span style="
      transform:rotate(45deg);
      font-family:'Playfair Display',serif;
      font-size:14px;font-weight:700;color:#f5ecd7;
      line-height:1;
    ">${label}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    tooltipAnchor: [0, -40],
  })
}

interface LeafletMapProps {
  stops: Stop[]
  visitedIds: Set<string>
  center?: [number, number]
  zoom?: number
}

export function LeafletMap({
  stops,
  visitedIds,
  center = [34.9802, -101.921],
  zoom = 15,
}: LeafletMapProps) {
  const navigate = useNavigate()

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          icon={makePinIcon(stop, visitedIds.has(stop.id))}
          eventHandlers={{ click: () => navigate(`/stop/${stop.id}`) }}
        >
          <Tooltip direction="top" offset={[0, -36]}>
            <span className="display-font font-bold">{stop.name}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
