# Future
The `Future` is an alternative to Promise that has a much more powerful API, 
implementation of undo (undo), safe "recursion", 
"error-free" execution (using either), and a small cart of cool features.

## Future`s methods : 
 * `of(Any)` - creates Future from the given value
 * `map(Function)` - transforms the resolution value inside the Future or Functor,
and returns a Future or Functor with the new value.

  * `chain(Function)` - Sequence a new Future or Chain using the resolution value from another.
Similarly to map, chain expects a function. But instead of returning the new value,
chain expects a Future (or instance of the same Chain) to be returned.

  * `fork(Function, Function)` - starts the execution of Future
## Theory 
If you want to find out more about `futures` , you can follow this links : 
  * Wiki - https://en.wikipedia.org/wiki/Futures_and_promises
  * An article from habr - https://habr.com/ru/post/435838/
  * Timur Shemsedinov`s examples and lecture - https://github.com/HowProgrammingWorks/Future
# Library 
You can use `fluture-js ` library to work with `Futures`.

Fluture offers a control structure similar to Promises, Tasks, Deferreds, and what-have-you. 

Just follow this link - https://github.com/fluture-js/Fluture
