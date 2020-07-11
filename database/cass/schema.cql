DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE IF NOT EXISTS kinglia-reviews
  WITH REPLICATION = {
    'class' : "SimpleStrategy',
    'replication_factor' : 1
  };
USE kinglia-reviews;

CREATE TABLE rooms (
  room_id int PRIMARY KEY,
  name text,
  phone text,
  city text,
  state text,
  desecription text
)
WTIH CLUSTERING ORDER BY (name AS)

CREATE TABLE reviews (
  room_id int,
  date timestamp,
  reviews_id int,
  user_id int,
  user_name text,
  user_image text,
  title text,
  text text,
  reviews_id int,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int

  PRIMARY KEY (room_id, date)
)
WITH CLUSTERING ORDER BY (date DESC);

CREATE TABLE users_stayed_by_room (
  room_id int,
  stay_date timestamp,
  user_id int,
  user_name text,
  user_image text,
  user_url text

  PRIMARY KEY (room_id, stay_date)
)
WITH CLUSTERING ORDER BY (stay_date DESC);

CREATE TABLE users_stayed_by_room (
  user int,
  date timestamp,
  user_id int,
  user_name text,
  user_image text,
  user_url text,
  title text,
  text text,
  reviews_id int,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int

  PRIMARY KEY (user_id, date)
)
WITH CLUSTERING ORDER BY (date DESC);
