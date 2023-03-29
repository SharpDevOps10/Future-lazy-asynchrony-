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
const futureToCallback = (future) => (callback) => {
  future.fork(
    (value) => callback(null, value),
    (reason) => callback(reason),
  );
};