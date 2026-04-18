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
    v_tour_id, 7,
    'Tex Randall', '1959', 'Pioneer',
    34.9746, -101.9208,
    'US Highway 87, Canyon, TX',
    'A 47-foot cowboy standing sentinel on the south edge of Canyon — one of the great roadside giants of the American West.',
    'Tex Randall was erected in 1959 as a landmark for a western wear store on US Highway 87, the main route into Canyon from the south. Standing nearly 47 feet tall, he became one of the most recognizable roadside attractions on the Texas Panhandle — a giant fiberglass cowboy keeping watch over the high plains. Over the decades Tex fell into disrepair, but community efforts brought him back. He was restored and re-erected as a point of civic pride, a nod to the cowboy culture that defines this corner of Texas, and a landmark that generations of Canyon residents have used to mark the edge of home.',
    null,
    null, null,
    'https://youtube.com/shorts/uUvJOnejppo',
    'Wolf Goes West: Tex Randall'
  )
  on conflict (tour_id, number) do nothing;
end $$;
