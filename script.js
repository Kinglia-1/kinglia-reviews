import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 500,
  // duration: '1s',
  stages: [
    {duration: '1s', target: 1},
    {duration: '5s', target: 10},
    {duration: '5s', target: 100},
    {duration: '5s', target: 1000},
    {duration: '5s', target: 1},
  ]
};

export default function() {
  let url = 'http://localhost:3002/reviews/'
  http.get(url);
  sleep(1);
}