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
    v_tour_id, 10,
    'Canyon Train Depot', 'c. 1906', 'Main Street',
    34.9790, -101.9320,
    '1001 2nd Ave, Canyon, TX',
    'The Santa Fe Railway depot that put Canyon on the map — the arrival point for settlers, supplies, and ambition on the high plains.',
    'The Atchison, Topeka and Santa Fe Railway reached Canyon in the early 1900s, and with it came everything that transforms a frontier settlement into a town: regular mail, dry goods, cattle buyers, college students, and newcomers with plans. The Canyon depot was the threshold between the wider world and the Panhandle. Ranchers shipped cattle east; families arrived from the Midwest; professors and students stepped off the train to build what became West Texas A&M. The depot represents the connective tissue of the region''s growth — the point where Canyon plugged into the national economy and never looked back.',
    '/images/stops/IMG_8935.webp',
    null, null,
    null,
    'Wolf Goes West: Canyon Train Depot'
  )
  on conflict (tour_id, number) do nothing;
end $$;
