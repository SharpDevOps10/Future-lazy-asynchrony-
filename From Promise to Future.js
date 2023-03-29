'use strict';

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

const futurify = (promise) => new Future((resolve, reject) => {
  promise.then(resolve).catch(reject);
});
const promise = Promise.resolve(60);
const future = futurify(promise);
future.fork(
  (error) => console.error(error),
  (value) => console.log(value),
);
const check = future instanceof Future;
console.log(check);