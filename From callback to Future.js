'use strict';
const fs = require('fs');
class Future {
  constructor(executor) {
    this.executor = executor;
  }
  static of(value) {
    return new Future((resolve) => resolve(value));
  }
  chain(fn) {
    return new Future((resolve, reject) => this.fork(
      (value) => fn(value).fork(resolve, reject),
      (error) => reject(error),
    ));

  }
  map(fn) {
    return this.chain((value) => Future.of(fn(value)));

  }
  fork(successful, failed) {
    this.executor(successful, failed);
  }
}
const futurify = (fn) => (...args) => new Future((resolve, reject) => {
  fn(...args, (error, data) => {
    if (error) reject(error);
    else resolve(data);
  });
});

const readFile = (name, callback) => fs.readFile(name, 'utf8', callback);
const futureFile = futurify(readFile);

futureFile('From callback to Future.js')
  .map((x) => x.length)
  .fork((x) => console.log('File size :', x));