-- ============================================================
-- Tours
-- ============================================================
create table if not exists tours (
  id              uuid        primary key default gen_random_uuid(),
  slug            text        not null unique,
  name            text        not null,
  description     text        not null default '',
  cover_image_url text,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- Stops
-- ============================================================
create table if not exists stops (
  id              uuid        primary key default gen_random_uuid(),
  tour_id         uuid        not null references tours(id) on delete cascade,
  number          integer     not null,
  name            text        not null,
  year            text        not null,
  category        text        not null
                              check (category in ('Civic','Main Street','Institution','Pioneer')),
  lat             double precision not null,
  lng             double precision not null,
  address         text        not null,
  blurb           text        not null default '',
  body            text        not null default '',
  hero_image_url  text,
  audio_url       text,
  audio_duration  text,
  video_embed_url text,
  video_label     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (tour_id, number)
);

-- ============================================================
-- Visits  (anonymous check-ins keyed to localStorage session id)
-- ============================================================
create table if not exists visits (
  id              uuid        primary key default gen_random_uuid(),
  user_session_id text        not null,
  stop_id         uuid        not null references stops(id) on delete cascade,
  visited_at      timestamptz not null default now(),
  unique (user_session_id, stop_id)
);

-- Indexes
create index if not exists visits_session_idx on visits (user_session_id);
create index if not exists stops_tour_idx    on stops   (tour_id);

-- ============================================================
-- Row-Level Security
-- ============================================================
alter table tours  enable row level security;
alter table stops  enable row level security;
alter table visits enable row level security;

-- Public: read tours and stops (no auth required)
create policy "Public read tours"
  on tours for select using (true);

create policy "Public read stops"
  on stops for select using (true);

-- Visits: any anonymous visitor can insert and read their own rows
create policy "Anyone can record a visit"
  on visits for insert with check (true);

create policy "Anyone can read visits"
  on visits for select using (true);

-- ============================================================
-- updated_at trigger
-- ============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger stops_updated_at
  before update on stops
  for each row execute function set_updated_at();
