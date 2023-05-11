import http from 'k6/http';
import { sleep } from 'k6';

export { options } from './load-config.js';

export default function () {
  http.post('http://queue-demo-single-instance.mkovenko.rocks:8080/user');
  sleep(1);
}
