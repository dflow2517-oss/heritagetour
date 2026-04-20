-- Tex Randall: 1400 N 3rd Ave
update stops set
  address = '1400 N 3rd Ave, Canyon, TX',
  lat = 34.9848,
  lng = -101.9297
where name = 'Tex Randall';

-- First National Bank: 402 15th St (across from courthouse)
update stops set
  address = '402 15th St, Canyon, TX',
  lat = 34.9804,
  lng = -101.9190
where name = 'First National Bank Building';

-- Canyon Train Depot: 1001 2nd Ave
update stops set
  address = '1001 2nd Ave, Canyon, TX',
  lat = 34.9800,
  lng = -101.9310
where name = 'Canyon Train Depot';
