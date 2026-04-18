# Stop Hero Images

Drop the following files into this directory:

| File | Stop | Source |
|------|------|--------|
| `courthouse-painting.jpg` | 1909 Courthouse | Painted illustration (home screen hero) |
| `courthouse-hero.jpg` | 1909 Courthouse | 1909 B&W photograph |
| `stevens-flowers.jpg` | Stevens Flowers | 1927 Canyon Main Street photo |
| `buffalo-barber-shop.jpg` | Buffalo Barber Shop | Street view photo |
| `pphm.jpg` | PPHM | Canyon News front page, April 13 1933 |
| `t-anchor-cabin.jpg` | T Anchor Cabin | B&W winter cabin photograph |
| `fumc.jpg` | First United Methodist | 1902 "Reverent Scene" photograph |

These are served as static assets by Vite/Cloudflare Pages and cached
by the service worker on first load. When Supabase storage is configured
in Milestone 2, the `hero_image_url` values in the database will be
updated to point to storage URLs instead.
