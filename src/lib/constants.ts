import type { Category } from './types'

export const CATEGORY_COLORS: Record<Category, string> = {
  Civic: '#b8491c',
  'Main Street': '#7a5c2e',
  Institution: '#3d5a3d',
  Pioneer: '#8b4513',
}

export const TOUR_SLUG = 'canyon-square'

// Royalty-free placeholder used when a stop has no audio_url yet
export const PLACEHOLDER_AUDIO =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
