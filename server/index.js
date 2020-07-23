require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const port = 3002;

// const port = 80;

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/reviews', express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

app.get('/reviews/:roomId/main', controller.reviewsMainCass);
// app.get('/reviews/:roomId/all', controller.reviewsAll);
app.get('/reviews/:roomId/scores', controller.reviewScoresCass);
app.get('/reviews/:roomId/overall', controller.reviewOverallCass);
// app.get('/reviews/:roomId/main', controller.reviewsMain);
// app.get('/reviews/:roomId/scores', controller.reviewScores);
// app.get('/reviews/:roomId/scoresCass', controller.reviewScoresCass);
// app.get('/reviews/:roomId/overall', controller.reviewOverall);
// app.get('/reviews/:roomId/overallCass', controller.reviewOverallCass);



app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
