DROP KEYSPACE IF EXISTS kinglia;

CREATE KEYSPACE IF NOT EXISTS kinglia
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };

USE kinglia;

CREATE TABLE rooms (
  room_id int,
  name text,
  phone text,
  city text,
  state text,
  PRIMARY KEY (room_id)
);

CREATE TABLE reviews (
  room_id int,
  date timestamp,
  reviews_id int,
  user_id int,
  user_name text,
  user_image text,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int,
  PRIMARY KEY (room_id, date)
)
WITH CLUSTERING ORDER BY (date DESC);

CREATE TABLE users_stayed_by_room (
  room_id int,
  stay_date timestamp,
  user_id int,
  user_name text,
  user_image text,
  user_url text,
  PRIMARY KEY (room_id, stay_date)
)
WITH CLUSTERING ORDER BY (stay_date DESC);

CREATE TABLE reviews_by_user_id (
  user_id int,
  date timestamp,
  user_name text,
  user_image text,
  user_url text,
  reviews_id int,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int,
  PRIMARY KEY (user_id, date)
)
WITH CLUSTERING ORDER BY (date DESC);
