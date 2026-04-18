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
  ) values (
    v_tour_id, 9,
    'Shirley House', '1916', 'Pioneer',
    34.9785, -101.9265,
    '500 20th Street, Canyon, TX',
    'The boarding house where Georgia O''Keeffe lived during her years teaching at West Texas State Normal College — and where she painted the West Texas sky.',
    'Georgia O''Keeffe came to Canyon in 1916 to teach art at West Texas State Normal College, and boarded upstairs in this Craftsman bungalow built by Dr. and Mrs. Shirley. From her second-floor window she studied the West Texas sunrises and the rooftops across the street, subjects that found their way onto canvas in works like Roof with Snow and House with Red Sky. The two years O''Keeffe spent on the high plains — absorbing the vast sky, the flat horizon, the particular quality of Panhandle light — shaped the visual language she would carry the rest of her life. The house was designated a Recorded Texas Historic Landmark in 2017.',
    null,
    null, null,
    null,
    'Wolf Goes West: Shirley House'
  )
  on conflict (tour_id, number) do nothing;
end $$;
