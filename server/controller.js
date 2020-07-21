// const Review = require('../database/reviews.js');
const cassandra = require('cassandra-driver');

var client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'kinglia'
});

var legacyDataConverter = function(data) {
  let converter = ({room_id, date, accuracy, check_in, cleanliness, communication, location, reviews_id, text, user_id, user_image, user_name, value}) => {
    let res = {
      _roomId: room_id,
      user_name: user_name,
      user_image: user_image,
      user_url: user_id,
      date: date,
      text: text,
      scores: {
        cleanliness: cleanliness,
        communication: communication,
        check_in: check_in,
        accuracy: accuracy,
        location: location,
        value: value
      }
    };
    return res;
  }

  let res = data.map((review) => {
    return converter(review);
  })

  return res;
};

const reviewsMainCass = function (req, res) {
  const room = req.params.roomId;
  const query = `SELECT * FROM reviews WHERE room_id = ${room}`;
  client.execute(query, function(err, result) {
    res.send(legacyDataConverter(result.rows));
  });
};

const reviewScoresCass = function (req, res) {
  const room = req.params.roomId;
  const query = `SELECT room_id,
    AVG(cleanliness) AS total_cleanliness,
    AVG(communication) AS total_communication,
    AVG(check_in) AS total_check_in,
    AVG(accuracy) AS total_accuracy,
    AVG(location) AS total_location,
    AVG(value) AS total_value,
    COUNT(*) AS total_reviews
    FROM reviews WHERE room_id = ${room}
  `;
  client.execute(query, function(err, result) {
    res.send(result.rows);
    // res.send(legacyDataConverter(result.rows));
  });
};

const reviewOverallCass = function (req, res) {
  const room = req.params.roomId;
  const query = `SELECT room_id,
    AVG(cleanliness) AS total_cleanliness,
    AVG(communication) AS total_communication,
    AVG(check_in) AS total_check_in,
    AVG(accuracy) AS total_accuracy,
    AVG(location) AS total_location,
    AVG(value) AS total_value,
    COUNT(*) AS total_reviews
    FROM reviews WHERE room_id = ${room}
  `;
  client.execute(query, function(err, result) {
    let {room_id, total_cleanliness, total_communication, total_check_in, total_accuracy, total_location, total_value, total_reviews} = result.rows[0];
    let average = (total_cleanliness + total_communication + total_communication + total_check_in + total_accuracy + total_location + total_value)/6;
    let scores = total_cleanliness;
    let obj = {
      "_id": room_id,
      "total_reviews": total_reviews,
      "total_score": average
    }
    res.send(obj);
    // res.send(legacyDataConverter(result.rows));
  });
};

/*
// GET REVIEW DATA
const reviewsMain = function (req, res) {
  const room = req.params.roomId;
  Review.find({ _roomId: room }).sort({ date: -1 })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data.slice(0, 6));
    });
};

// GET ALL REVIEW DATA FOR MODAL
const reviewsAll = function (req, res) {
  const room = req.params.roomId;
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Review.find({ _roomId: room }).sort({ date: -1 })
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data.slice(startIndex, endIndex));
    });
};

// COMBINE REVIEW SCORES BASED ON ROOM ID
const reviewScores = function (req, res) {
  const room = req.params.roomId;
  const query = [
    {
      $match: {
        _roomId: Number(room)
      }
    },
    {
      $group: {
        _id: '$_roomId',
        total_cleanliness: { $avg: '$scores.cleanliness' },
        total_communication: { $avg: '$scores.communication' },
        total_check_in: { $avg: '$scores.check_in' },
        total_accuracy: { $avg: '$scores.accuracy' },
        total_location: { $avg: '$scores.location' },
        total_value: { $avg: '$scores.value' },
        total_reviews: { $sum: 1 }
      }
    }
  ];

  Review.aggregate(query)
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

// GET OVERALL RATING BASED ON AGGREGATE ROOM SCORES
const reviewOverall = function (req, res) {
  const room = req.params.roomId;
  const query = [
    {
      $match: {
        _roomId: Number(room)
      }
    },
    {
      $group: {
        _id: '$_roomId',
        total_cleanliness: { $avg: '$scores.cleanliness' },
        total_communication: { $avg: '$scores.communication' },
        total_check_in: { $avg: '$scores.check_in' },
        total_accuracy: { $avg: '$scores.accuracy' },
        total_location: { $avg: '$scores.location' },
        total_value: { $avg: '$scores.value' },
        total_reviews: { $sum: 1 }
      }
    },
    {
      $project: {
        total_reviews: '$total_reviews',
        total_score: {
          $avg: [
            '$total_cleanliness',
            '$total_communication',
            'total_check_in',
            'total_accuracy',
            'total_location',
            'total_value'
          ]
        }
      }
    }
  ];

  Review.aggregate(query)
    .exec((err, data) => {
      if (err) res.sendStatus(400);
      res.send(data);
    });
};

*/

module.exports = {
  reviewsMainCass,
  reviewScoresCass,
  reviewOverallCass
};
