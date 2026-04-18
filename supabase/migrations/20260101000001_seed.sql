-- ============================================================
-- Seed: Canyon Square tour + 6 stops
-- Safe to re-run (on conflict do nothing)
-- ============================================================

insert into tours (slug, name, description)
values (
  'canyon-square',
  'A Heritage Walking Tour',
  'Six sites. Six stories. One afternoon on the square where the Panhandle''s history still stands.'
)
on conflict (slug) do nothing;

do $$
declare
  v_tour_id uuid;
begin
  select id into v_tour_id from tours where slug = 'canyon-square';

  insert into stops (
    tour_id, number, name, year, category,
    lat, lng, address, blurb, body,
    hero_image_url, audio_url, audio_duration,
    video_embed_url, video_label
  ) values

  -- 01  Courthouse
  (
    v_tour_id, 1,
    '1909 Randall County Courthouse', '1909', 'Civic',
    34.9807, -101.9195,
    '401 15th Street, Canyon, TX',
    'The classical heart of Canyon''s courthouse square — and the centerpiece of an ongoing interior restoration effort.',
    'Completed in 1909, the Randall County Courthouse was designed in the Classical Revival style and has anchored Canyon''s downtown square for over a century. A new justice center opened in the 1990s, but the 1909 building remains the symbolic seat of Randall County history. The Randall County Historical Commission and Courthouse Restoration Committee are currently working to secure Texas Historical Commission funding for the interior restoration — returning the building''s original features while adapting it for continued public use.',
    '/images/stops/courthouse-painting.jpg',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    '3:42',
    null, 'Wolf Goes West: Courthouse Square'
  ),

  -- 02  Stevens Flowers
  (
    v_tour_id, 2,
    'Stevens Flowers', 'c. 1940s', 'Main Street',
    34.9801145, -101.9278758,
    '1515 4th Ave, Canyon, TX',
    'Generations of Canyon weddings, homecomings, and Sunday arrangements have come through this small-town florist.',
    'Stevens Flowers has been a fixture of Canyon''s Main Street for decades, quietly stitching itself into the fabric of local life through homecoming mums, funeral arrangements, Sunday bouquets, and every wedding in between. In a town defined by its institutions — the college, the courthouse, the museum — Stevens represents the other kind of history: the daily, familial kind. The kind that fills the church on Easter and the gym on homecoming night.',
    '/images/stops/stevens-flowers.jpg',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    '2:18',
    null, 'Wolf Goes West: Stevens Flowers'
  ),

  -- 03  Buffalo Barber Shop
  (
    v_tour_id, 3,
    'Buffalo Barber Shop', 'Early 20th c.', 'Main Street',
    34.9799622, -101.9184666,
    '2319 4th Ave, Canyon, TX',
    'A working barbershop where West Texas A&M students, ranchers, and grandfathers have shared chairs for generations.',
    'The Buffalo Barber Shop sits a block off the courthouse square and has operated in some form for most of the 20th century. It is the kind of place where conversations about weather, cattle prices, Buff football, and whatever''s happening at the courthouse happen in roughly that order. The shop takes its name from West Texas A&M''s Buffaloes, tying it firmly to the college-town identity that defines modern Canyon.',
    '/images/stops/buffalo-barber-shop.jpg',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    '2:51',
    null, 'Wolf Goes West: Buffalo Barbershop'
  ),

  -- 04  PPHM
  (
    v_tour_id, 4,
    'Panhandle-Plains Historical Museum', '1933', 'Institution',
    34.9802934, -101.9172367,
    '2503 4th Ave, Canyon, TX',
    'Texas''s largest history museum — and the closest thing the Panhandle has to a Smithsonian.',
    'Opened in 1933 on the campus of what is now West Texas A&M, the Panhandle-Plains Historical Museum is the oldest and largest history museum in Texas. Its collections span paleontology, Plains Indian history, pioneer settlement, petroleum, firearms, textiles, and Southwestern art. For anyone tracing the story of the Panhandle — from the Comancheria through the cattle kingdom, oil boom, and Route 66 era — PPHM is the indispensable first stop.',
    '/images/stops/pphm.jpg',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    '4:06',
    null, 'Wolf Goes West: PPHM'
  ),

  -- 05  T Anchor Ranch Cabin
  (
    v_tour_id, 5,
    'T Anchor Ranch Headquarters Cabin', '1877', 'Pioneer',
    34.9795, -101.9178,
    'PPHM grounds, Canyon, TX',
    'The oldest Anglo structure in the Texas Panhandle — a pioneer cabin preserved on the grounds of PPHM.',
    'Built in 1877, the T Anchor headquarters cabin is considered the oldest Anglo-built structure still standing in the Texas Panhandle. The T Anchor Ranch, established by Leigh Dyer and later expanded under the Jowell brothers, was one of the foundational cattle operations of the post-Comanche Panhandle. The cabin was moved from its original site to the grounds of PPHM, where it now stands as a tangible link to the earliest years of Anglo settlement on the high plains.',
    '/images/stops/t-anchor-cabin.jpg',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    '3:15',
    null, 'Wolf Goes West: T Anchor Cabin'
  ),

  -- 06  First United Methodist Church
  (
    v_tour_id, 6,
    'First United Methodist Church', 'Early 20th c.', 'Civic',
    34.9795250, -101.9243450,
    '1818 4th Ave, Canyon, TX',
    'One of Canyon''s founding congregations, woven into the social and civic life of the town since its earliest years.',
    'First United Methodist has been a pillar of Canyon community life since the town''s earliest decades. The congregation has moved through several buildings over the years, but its role — as a civic anchor, a place of Sunday gathering, and a steady presence on 4th Avenue — has remained constant. Churches like FUMC are central to understanding how small Panhandle towns held themselves together through dust, drought, depression, and boom.',
    '/images/stops/fumc.jpg',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    '2:34',
    null, 'Wolf Goes West: First Methodist'
  )

  on conflict (tour_id, number) do nothing;
end $$;
