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
    v_tour_id, 8,
    'First National Bank Building', 'c. 1910s', 'Main Street',
    34.9803, -101.9198,
    'Canyon Square, Canyon, TX',
    'One of the cornerstone commercial buildings of Canyon''s downtown square — a reminder of the town''s early ambitions as the Panhandle''s banking center.',
    'The First National Bank Building stands as one of the most prominent commercial structures on Canyon''s courthouse square. Established in the early years of Canyon''s growth, the bank served as the financial backbone of the surrounding ranching and farming economy. Its presence on the square reflects the confidence early settlers had in Canyon''s future as a regional center of commerce. The building''s architecture — typical of early 20th century small-city banking institutions — projected stability and permanence to a community still finding its footing on the high plains.',
    null,
    null, null,
    'https://youtube.com/shorts/Dr9aNivFgQM',
    'Wolf Goes West: First National Bank'
  )
  on conflict (tour_id, number) do nothing;
end $$;
