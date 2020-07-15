CREATE DATABASE kinglia;

\connect kinglia;

CREATE TABLE users (
  user_id     INT PRIMARY KEY,
  user_name   VARCHAR(26),
  user_img    VARCHAR(255),
  user_url    VARCHAR(255)
);

CREATE TABLE reviews (
  room_id INT REFERENCES rooms (room_id),
  reviews_id INT PRIMARY KEY ,
  user_id INT,
  user_name VARCHAR(25),
  user_image VARCHAR(100),
  text TEXT,
  cleanliness INT,
  communication INT,
  check_in INT,
  accuracy INT,
  location INT,
  value INT
);

CREATE TABLE rooms (
  room_id INT PRIMARY KEY,
  name VARCHAR(100),
  phone TEXT,
  city VARCHAR(100),
  state VARCHAR(100)
);