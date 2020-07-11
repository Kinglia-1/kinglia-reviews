CREATE DATABASE kinglia;

\connect kinglia;

CREATE TABLE users (
  _userId     SERIAL,
  user_name   VARCHAR(26),
  user_img    VARCHAR(255),
  user_url    VARCHAR(255)
);

CREATE TABLE reviews (
  _reviewId   SERIAL,
  _userId     INT REFERENCES users (_userId),
  created_at  DATE,
  review_body TEXT,
  clean_score INT,
  com_score   INT,
  check_score INT,
  acc_score   INT,
  loc_score   INT,
  val_score   INT
)

CREATE TABLE rooms (
  _roomId     SERIAL,
  _reviewId   INT REFERENCES reviews (_reviewId)
)