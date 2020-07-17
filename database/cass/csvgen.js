const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

let counter = 0;

const roomSuff = ['room', 'penthouse', 'floor', 'house', 'suite', 'beach house'];

const getRandomOf = (arr, min = 0, max = (arr.length - 1)) => {
  const index = Math.floor(Math.random() * (max - min + 1)) + min;
  return arr[index];
};

let getRandomNum = (min = 0, max = 1, int = false) => {
  if (int) {
    return Math.ceil(Math.random() * (max - min) + min);
  } else {
    return Math.random() * (max - min) + min;
  }
};

const genRandomScores = () => {
  let res = {};
  let scores = ['cleanliness', 'communication', 'check_in', 'location', 'value'];
  scores.forEach((key) => {res[key] = Math.ceil(getRandomNum(0,5))});
  return res;
};

const genRooms = () => {
  const writerRooms = csvWriter();
  writerRooms.pipe((fs.createWriteStream('./database/cass/rooms.csv')));
  for (let i = 0; i < 100; i++) {
    writerRooms.write({
      room_id: i,
      name: `${faker.name.findName()}'s ${getRandomOf(roomSuff)}`,
      phone: faker.phone.phoneNumber(),
      location: `${faker.address.city()}`,
      state: `${faker.address.state()}`
    })
  };
  writerRooms.end();
  console.log('Finished seeding rooms');
};

const roomReviewCount = 10;
const reviewsPerRoom = 3;

const genReview = (file) => {
  const writerReviews = csvWriter();
  writerReviews.pipe((fs.createWriteStream(`./database/cass/reviews${file}.csv`)));
  let start = roomReviewCount * (file - 1);
  let end = roomReviewCount * file;
  for (let i = start; i < end; i++) {
    for (let j = 0; j < reviewsPerRoom; j++) {
      writerReviews.write({
        room_id: i,
        date: moment(faker.date.recent()).format("YYYY-MM-DD HH:mm:ss."),
        reviews_id: j,
        user_id: `${getRandomNum(1, 1000, true)}`,
        user_name: faker.internet.userName(),
        user_image: 'https://loremflickr.com/320/240/person,head/all',
        text: faker.lorem.sentence(),
        cleanliness: getRandomNum(0, 5, true),
        communication:  getRandomNum(0, 5, true),
        check_in:  getRandomNum(0, 5, true),
        accuracy:  getRandomNum(0, 5, true),
        location:  getRandomNum(0, 5, true),
        value:  getRandomNum(0, 5, true)
      })
    }
  }
  writerReviews.end();
  console.log('Finished seeding reviews');
}

let getSingleReview = (id, id2) => {
  let obj = {
    room_id: id,
    date: moment(faker.date.recent()).format("YYYY-MM-DD HH:mm:ss."),
    reviews_id: id2,
    user_id: `${getRandomNum(1, 1000, true)}`,
    user_name: faker.internet.userName(),
    user_image: 'https://loremflickr.com/320/240/person,head/all',
    text: faker.lorem.sentence(),
    cleanliness: getRandomNum(0, 5, true),
    communication:  getRandomNum(0, 5, true),
    check_in:  getRandomNum(0, 5, true),
    accuracy:  getRandomNum(0, 5, true),
    location:  getRandomNum(0, 5, true),
    value:  getRandomNum(0, 5, true)
  };
  // console.log(`obj is ${obj}`);
  return obj
}

let getSingleReviewPG = (id, id2) => {
  let obj = {
    reviews_id: id2,
    room_id: id,
    date: moment(faker.date.recent()).format("YYYY-MM-DD HH:mm:ss."),
    user_id: `${getRandomNum(1, 1000, true)}`,
    user_name: faker.internet.userName(),
    user_image: 'https://loremflickr.com/320/240/person,head/all',
    text: faker.lorem.sentence(),
    cleanliness: getRandomNum(0, 5, true),
    communication:  getRandomNum(0, 5, true),
    check_in:  getRandomNum(0, 5, true),
    accuracy:  getRandomNum(0, 5, true),
    location:  getRandomNum(0, 5, true),
    value:  getRandomNum(0, 5, true)
  };
  // console.log(`obj is ${obj}`);
  return obj
}

let genReviewsDrain = (file = 1, callback) => {
  writerReviews.pipe((fs.createWriteStream(`./database/cass/PGreviews${file}.csv`)));
  console.log('in function genReviewsDrain')
  let i = roomReviewCount * file;
  let id = (roomReviewCount * (file - 1));
  let subId = 1;
  let subAmount = reviewsPerRoom;
  let write = () => {
    let ok = true;
    do {
      // const data = getSingleReview(id, subId);
      const data = getSingleReviewPG(id, subId);
      if (id % (roomReviewCount/10) == 0) {console.log(`${id} attempting to write`)};
      if (i === 0) {
        console.log(`Finished seeding users`);
        writerReviews.write(data, 'utf-8', callback);
      } else {
        ok = writerReviews.write(data);
        // console.log(`ok is ${ok}`);
      }
      if (subId % subAmount === 0) {
        i -= 1;
        id += 1;
        subId += 1;
        // console.log(`i is ${i}, id is ${id}, subId is ${subId}`);
      } else {
        subId += 1;
        // console.log(`i is ${i}, id is ${id}, subId is ${subId}`);
      }
    } while (i >= 0 && ok);
    if(i > 0 && ok !== true) {
      writerReviews.once('drain', write);
    }
  }

  write();
}

const genUsers = () => {
  const writerUsers = csvWriter();
  writerUsers.pip((fs.createWriteStream('./database/cass/users.csv')));
  for (let i = 0; i < 100; i++) {
    writerUsers.write({
      user_id: i,
      user_name: faker.name.findName(),
      user_image: `${'image url'}`,
      user_url: `${'url'}`,
      reviews_id: getRandomNum(0,1000,true),
      text: faker.lorem.sentences(),
      cleanliness: getRandomNum(0, 5, true),
      communication:  getRandomNum(0, 5, true),
      check_in:  getRandomNum(0, 5, true),
      accuracy:  getRandomNum(0, 5, true),
      location:  getRandomNum(0, 5, true),
      value:  getRandomNum(0, 5, true)
    })
  }
  writerUsers.end();
  console.log('Finished seeding users');
}

// genRooms();
// genReview(1);
const writerReviews = csvWriter();

genReviewsDrain(1, () => {
  console.log('finished seeding reviews')
  writerReviews.end();
});
// genUsers();

// console.log({
//   room_id: 1,
//   reviews_id: 1,
//   user_id: `${getRandomNum(1, 1000, true)}`,
//   text: faker.lorem.sentences(),
//   cleanliness: getRandomNum(0, 5, true),
//   communication:  getRandomNum(0, 5, true),
//   check_in:  getRandomNum(0, 5, true),
//   accuracy:  getRandomNum(0, 5, true),
//   location:  getRandomNum(0, 5, true),
//   value:  getRandomNum(0, 5, true)
// });


/*
  let obj = {
    room_id: 1,
    date: moment(faker.date.recent()).format("YYYY-MM-DD HH:mm:ss."),
    reviews_id: 2,
    user_id: `${getRandomNum(1, 1000, true)}`,
    user_name: faker.internet.userName(),
    user_image: 'https://loremflickr.com/320/240/person,head/all',
    text: faker.lorem.sentences(),
    cleanliness: getRandomNum(0, 5, true),
    communication:  getRandomNum(0, 5, true),
    check_in:  getRandomNum(0, 5, true),
    accuracy:  getRandomNum(0, 5, true),
    location:  getRandomNum(0, 5, true),
    value:  getRandomNum(0, 5, true)
  };

  console.log(Object.keys(obj));

[ 'room_id',
  'date',
  'reviews_id',
  'user_id',
  'user_name',
  'user_image',
  'text',
  'cleanliness',
  'communication',
  'check_in',
  'accuracy',
  'location',
  'value' ]

  COPY kinglia.reviews FROM '/Users/benli/Desktop/HR/Reviews/database/cass/reviews.csv' WITH DELIMITER=',' AND HEADER=TRUE;

  COPY kinglia.reviews (room_id,
  date, reviews_id, user_id, user_name, user_image, text, cleanliness, communication, check_in, accuracy,location,value) FROM '/Users/benli/Desktop/HR/Reviews/database/cass/reviews.csv' WITH DELIMITER=',' AND HEADER=TRUE;

*/