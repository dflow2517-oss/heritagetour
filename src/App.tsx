import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StopsProvider } from './lib/StopsContext'
import { Home } from './pages/Home'
import { MapView } from './pages/MapView'
import { StopDetail } from './pages/StopDetail'
import { Passport } from './pages/Passport'

export function App() {
  return (
    <StopsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/stop/:id" element={<StopDetail />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StopsProvider>
  )
}
