const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const faker = require('faker');

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
      phone: faker.phone.phoneNumber();
      location: `${faker.address.city()}`,
      state: `${faker.address.state()}`
    })
  };
  writerRooms.end();
  console.log('Finished seeding rooms');
};

const genReview = () => {
  const writerReviews = csvWriter();
  writerReviews.pipe((fs.createWriteStream('./database/cass/reviews.csv')));
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 5; j++) {
      writerReviews.write({
        room_id: i,
        reviews_id: j,
        user_id: `${getRandomNum(1, 1000, true)}`,
        text: faker.lorem.sentences(),
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

genRooms();
genReview();
genUsers();

