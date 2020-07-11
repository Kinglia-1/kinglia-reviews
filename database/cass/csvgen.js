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

const dataGen = () => {
  writer.pipe((fs.createWriteStream('test.csv')));
  for (let i = 0; i < 10; i++) {
    writer.write({
      id: counter += 1,
      name: `${faker.name.findName()}'s ${getRandomOf(roomSuff)}`,
      location: `${faker.address.city()}`,
      state: `${faker.address.state()}`;
    });
  }
};

dataGen();
