export type Category = 'Civic' | 'Main Street' | 'Institution' | 'Pioneer'

export interface Tour {
  id: string
  slug: string
  name: string
  description: string
  cover_image_url: string | null
  created_at: string
}

export interface Stop {
  id: string
  tour_id: string
  number: number
  name: string
  year: string
  category: Category
  lat: number
  lng: number
  address: string
  blurb: string
  body: string
  hero_image_url: string | null
  audio_url: string | null
  audio_duration: string | null
  video_embed_url: string | null
  video_label: string | null
  created_at: string
  updated_at: string
}

export interface Visit {
  id: string
  user_session_id: string
  stop_id: string
  visited_at: string
}
