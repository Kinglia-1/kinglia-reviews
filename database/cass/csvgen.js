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

let getRandomNum = (min = 0, max = 1) => {
  return Math.random() * (max - min) + min;
};

const genRandomScores = () => {
  let res = {};
  let scores = ['cleanliness', 'communication', 'check_in', 'location', 'value'];
  scores.forEach((key) => {res[key] = Math.ceil(getRandomNum(0,5))});
  return res;
};

const dataGen = () => {
  writer.pipe((fs.createWriteStream('test.csv')));
  for (let i = 0; i < 10; i++) {
    writer.write({
      room_id: i,
      name: `${faker.name.findName()}'s ${getRandomOf(roomSuff)}`,
      location: `${faker.address.city()}`,
      state: `${faker.address.state()}`
    })
  };
  // writer.end();
  console.log('Great SuCeSsSsS');
};

const genReview = () => {
  writer.pipe((fs.createWriteStream('./cassReviews.csv')));
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      writer.write({
        room_id: i,
        reviews_id: j,
        user_id: `${'test'}`,
        text: faker.lorem.paragraph(),
        scores: genRandomScores()
      })
    }
  }
  writer.end();
  console.log('Great SuCeSsSsS');
}

dataGen();
// genReview();
