var gcs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  return function () {
    vertxNext(flush);
  };
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(7);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

polyfill();
// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(6)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(2);
var es6_promise_1 = __webpack_require__(0);
var GoCloudStorage = (function () {
    function GoCloudStorage(managedDiagrams, defaultModel, clientId, iconsRelativeDirectory) {
        if (managedDiagrams instanceof go.Diagram)
            managedDiagrams = [managedDiagrams];
        this._managedDiagrams = managedDiagrams;
        this._currentDiagramFile = { name: null, id: null, path: null };
        this._isAutoSaving = true;
        if (defaultModel)
            this._defaultModel = defaultModel;
        if (clientId)
            this._clientId = clientId;
        else
            clientId = null;
        this._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : "../goCloudStorageIcons/";
        var menu = document.createElement('div');
        menu.className = 'goCustomFilepicker';
        menu.style.visibility = 'hidden';
        document.getElementsByTagName('body')[0].appendChild(menu);
        this._ui = menu;
        this._deferredPromise = { promise: this.makeDeferredPromise() };
        function addAutoSave(d) {
            d.addModelChangedListener(function (e) {
                if (e.isTransactionFinished && storage.isAutoSaving && e.oldValue !== "") {
                    if (storage.currentDiagramFile.name) {
                        storage.save();
                    }
                }
            });
        }
        var d = this.managedDiagrams;
        var storage = this;
        if (d instanceof go.Diagram) {
            addAutoSave(d);
        }
        else
            for (var i = 0; i < d.length; i++) {
                addAutoSave(d[i]);
            }
    }
    Object.defineProperty(GoCloudStorage.prototype, "managedDiagrams", {
        get: function () { return this._managedDiagrams; },
        set: function (value) { this._managedDiagrams = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "defaultModel", {
        get: function () { return this._defaultModel; },
        set: function (value) { this._defaultModel = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "iconsRelativeDirectory", {
        get: function () { return this._iconsRelativeDirectory; },
        set: function (value) { this._iconsRelativeDirectory = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "clientId", {
        get: function () { return this._clientId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "currentDiagramFile", {
        get: function () { return this._currentDiagramFile; },
        set: function (value) { this._currentDiagramFile = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "isAutoSaving", {
        get: function () { return this._isAutoSaving; },
        set: function (value) { this._isAutoSaving = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorage.prototype, "serviceName", {
        get: function () { return this._serviceName; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GoCloudStorage.prototype, "ui", {
        get: function () { return this._ui; },
        enumerable: true,
        configurable: true
    });
    GoCloudStorage.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        return new es6_promise_1.Promise(function (resolve, reject) {
            console.error("authorize not implemented");
            reject(false);
        });
    };
    GoCloudStorage.prototype.makeDeferredPromise = function () {
        var res, rej;
        var promise = new es6_promise_1.Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        promise.resolve = res;
        promise.reject = rej;
        return promise;
    };
    GoCloudStorage.prototype.getUserInfo = function () {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("getUserInfo not implemented");
        });
    };
    GoCloudStorage.prototype.hideUI = function (isActionCanceled) {
        if (isActionCanceled === void 0) { isActionCanceled = false; }
        var storage = this;
        storage.ui.style.visibility = 'hidden';
        if (isActionCanceled) {
            var action = document.getElementById('actionButton').innerHTML;
            storage._deferredPromise.promise.resolve(action + ' canceled by user');
            storage._deferredPromise.promise = storage.makeDeferredPromise();
        }
    };
    GoCloudStorage.prototype.checkFileExists = function (path) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("checkFileExists not implemented");
        });
    };
    GoCloudStorage.prototype.getFile = function (path) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            throw Error("getFile not implemented");
        });
    };
    GoCloudStorage.prototype.showUI = function (action) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            throw Error("showUI not implemented");
        });
    };
    GoCloudStorage.prototype.create = function (path) {
        var storage = this;
        var diagrams = storage.managedDiagrams;
        return new es6_promise_1.Promise(function (resolve, reject) {
            storage.currentDiagramFile = { name: null, id: null, path: null };
            function makeNewDiagram(d) {
                if (storage.defaultModel)
                    d.model = go.Model.fromJson(JSON.parse(storage.defaultModel));
                else
                    d.model = new go.GraphLinksModel;
            }
            if (storage.managedDiagrams instanceof go.Diagram) {
                makeNewDiagram(storage.managedDiagrams);
            }
            else
                for (var i = 0; i < storage.managedDiagrams.length; i++) {
                    makeNewDiagram(storage.managedDiagrams[i]);
                }
            if (storage.isAutoSaving) {
                if (path) {
                    resolve(storage.save(path));
                }
                else
                    resolve(storage.saveWithUI());
            }
            else
                resolve("New diagram created.");
        });
    };
    GoCloudStorage.prototype.makeSaveFile = function () {
        var item = '{\n';
        var storage = this;
        if (storage.managedDiagrams.length == 0)
            return;
        for (var i = 0; i < storage.managedDiagrams.length; i++) {
            var diagram = storage.managedDiagrams[i];
            var div = diagram.div.id;
            item += '"' + div + '"' + ': ' + diagram.model.toJson();
            if (i + 1 !== storage.managedDiagrams.length)
                item += ',\n';
        }
        item += '\n}';
        return item;
    };
    GoCloudStorage.prototype.loadFromFileContents = function (fileContents) {
        var storage = this;
        var models = JSON.parse(fileContents);
        for (var divId in models) {
            var model = models[divId];
            var div = (document.getElementById(divId));
            var diagram = go.Diagram.fromDiv(div);
            if (diagram) {
                diagram.model = go.Model.fromJson(JSON.stringify(model));
            }
            else {
                throw Error("No Diagram on page is associated with a div with id " + divId);
            }
        }
    };
    GoCloudStorage.prototype.saveWithUI = function () {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("saveWithUI not implemented");
        });
    };
    GoCloudStorage.prototype.save = function (path) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("save not implemented");
        });
    };
    GoCloudStorage.prototype.load = function (path) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("load not implemented");
        });
    };
    GoCloudStorage.prototype.loadWithUI = function () {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("loadWithUI not implemented");
        });
    };
    GoCloudStorage.prototype.remove = function (path) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("remove not implemented");
        });
    };
    GoCloudStorage.prototype.removeWithUI = function () {
        return new es6_promise_1.Promise(function (resolve, reject) {
            reject("removeWithUI not implemented");
        });
    };
    return GoCloudStorage;
}());
exports.GoCloudStorage = GoCloudStorage;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = go;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    GoLocalStorage: __webpack_require__(4).GoLocalStorage,
    GoDropBox: __webpack_require__(8).GoDropBox,
    GoGoogleDrive: __webpack_require__(9).GoGoogleDrive,
    GoOneDrive: __webpack_require__(10).GoOneDrive,
    GoCloudStorageManager: __webpack_require__(11).GoCloudStorageManager
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var GoLocalStorage = (function (_super) {
    __extends(GoLocalStorage, _super);
    function GoLocalStorage(managedDiagrams, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel) || this;
        _this._localStorage = window.localStorage;
        _this.ui.id = "goLocalStorageCustomFilepicker";
        _this._serviceName = "Local Storage";
        return _this;
    }
    Object.defineProperty(GoLocalStorage.prototype, "localStorage", {
        get: function () { return this._localStorage; },
        enumerable: true,
        configurable: true
    });
    GoLocalStorage.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            try {
                storage.localStorage.setItem('item', 'item');
                storage.localStorage.removeItem('item');
                resolve(true);
            }
            catch (e) {
                resolve(false);
            }
        });
    };
    GoLocalStorage.prototype.showUI = function (action, numAdditionalFiles) {
        var storage = this;
        var ui = storage.ui;
        var spacestring = "qwe45qw34";
        if (!numAdditionalFiles)
            numAdditionalFiles = 0;
        var maxFilesToShow = GoLocalStorage._MIN_FILES_IN_UI + numAdditionalFiles;
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "localStorage.png'></img>";
        var title = action + " Diagram File";
        ui.innerHTML += "<strong>" + title + "</strong><hr></hr>";
        document.getElementsByTagName('body')[0].appendChild(ui);
        ui.style.visibility = 'visible';
        var filesDiv = document.createElement('div');
        filesDiv.id = 'fileOptions';
        var savedDiagrams = [];
        var numFilesToCheck = GoLocalStorage._MIN_FILES_IN_UI + numAdditionalFiles;
        var numFilesChecked = 0;
        var hasCheckedAllFiles = false;
        if (storage.localStorage.length !== 0) {
            for (var key in storage.localStorage) {
                if (savedDiagrams.length < maxFilesToShow) {
                    numFilesChecked++;
                    var fileContent = storage.localStorage.getItem(key);
                    if (fileContent && fileContent.indexOf("GraphLinksModel" || "TreeModel") !== -1) {
                        var file = { key: key, model: fileContent };
                        savedDiagrams.push(file);
                    }
                    if (numFilesChecked === storage.localStorage.length)
                        hasCheckedAllFiles = true;
                }
            }
        }
        else
            hasCheckedAllFiles = true;
        if (savedDiagrams.length !== 0) {
            for (var i = 0; i < savedDiagrams.length; i++) {
                var kvp = savedDiagrams[i];
                var file = kvp['key'];
                var fileId = file.replace(/ /g, spacestring);
                if (action !== 'Save') {
                    filesDiv.innerHTML +=
                        "<div class='fileOption'>" +
                            "<input id=" + fileId + " type='radio' name='localStorageFile' />" +
                            "<label id =" + fileId + "-label" + " for='" + fileId + "'>" + file + "</label>" +
                            "</div>";
                }
                else {
                    filesDiv.innerHTML +=
                        "<div class='fileOption'>" +
                            "<label id =" + fileId + "-label" + " for='" + fileId + "'>" + file + "</label>" +
                            "</div>";
                }
            }
        }
        if (!hasCheckedAllFiles) {
            var num_1 = numAdditionalFiles + 50;
            filesDiv.innerHTML += "<p>There may be more diagram files not shown. <a id='localStorageLoadMoreFiles'>Click here</a> to try loading more.</p>";
            document.getElementById("localStorageLoadMoreFiles").onclick = function () {
                storage.showUI(action, num_1);
            };
        }
        ui.appendChild(filesDiv);
        if (storage.currentDiagramFile.id) {
            var string = storage.currentDiagramFile.id.replace(/ /g, spacestring);
            var el = document.getElementById(string + '-label');
            if (el)
                el.style.fontStyle = "italic";
        }
        if (action === 'Save') {
            var userInputDiv = document.createElement('div');
            userInputDiv.id = 'userInputDiv';
            userInputDiv.innerHTML += '<span>Save Diagram As </span><input id="userInput" placeholder="Enter filename"></input>';
            ui.appendChild(userInputDiv);
        }
        var submitDiv = document.createElement('div');
        submitDiv.id = "submitDiv";
        var actionButton = document.createElement('button');
        actionButton.textContent = action;
        actionButton.id = 'actionButton';
        actionButton.onclick = function () {
            storage.processUIResult(action);
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        var cancelButton = document.createElement('button');
        cancelButton.id = 'cancelButton';
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise['promise'];
    };
    GoLocalStorage.prototype.processUIResult = function (action) {
        var storage = this;
        function getSelectedFile() {
            var radios = document.getElementsByName('localStorageFile');
            var selectedFile = null;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    selectedFile = radios[i].id.replace(/qwe45qw34/g, ' ');
                }
            }
            if (selectedFile)
                return selectedFile;
            else
                return null;
        }
        var file = getSelectedFile();
        switch (action) {
            case 'Save': {
                var name = document.getElementById('userInput').value;
                if (name) {
                    name += '.diagram';
                    storage.save(name);
                }
                else {
                }
                break;
            }
            case 'Load': {
                storage.load(file);
                break;
            }
            case 'Delete': {
                storage.remove(file);
                break;
            }
        }
        storage.hideUI();
    };
    GoLocalStorage.prototype.getFile = function (path) {
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new es6_promise_1.Promise(function (resolve, reject) {
            var fileContent = (!!window.localStorage.getItem(path)) ? window.localStorage.getItem(path) : null;
            var file = { name: path, content: fileContent, path: path, id: path };
            resolve(file);
        });
    };
    GoLocalStorage.prototype.checkFileExists = function (path) {
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new es6_promise_1.Promise(function (resolve, reject) {
            var fileExists = !!(window.localStorage.getItem(path));
            resolve(fileExists);
        });
    };
    GoLocalStorage.prototype.saveWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storage.showUI('Save'));
        });
    };
    GoLocalStorage.prototype.save = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                if (path.indexOf('.diagram') === -1)
                    path += '.diagram';
                var item = storage.makeSaveFile();
                storage.localStorage.setItem(path, item);
                var savedFile = { name: path, id: path, path: path };
                storage.currentDiagramFile = savedFile;
                resolve(savedFile);
                storage._deferredPromise['promise'].resolve(savedFile);
                storage._deferredPromise['promise'] = storage.makeDeferredPromise();
            }
            else if (storage.currentDiagramFile.path) {
                var saveName = storage.currentDiagramFile['path'];
                var savedFile = { name: saveName, path: saveName, id: saveName };
                var item = storage.makeSaveFile();
                storage.localStorage.setItem(saveName, item);
                resolve(saveName);
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoLocalStorage.prototype.loadWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storage.showUI('Load'));
        }).catch(function (e) {
            throw Error(e);
        });
    };
    GoLocalStorage.prototype.load = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                var fileContents = storage.localStorage.getItem(path);
                if (fileContents) {
                    storage.loadFromFileContents(fileContents);
                    var loadedFile = { name: path, id: path, path: path };
                    storage.currentDiagramFile = loadedFile;
                    resolve(loadedFile);
                    storage._deferredPromise.promise.resolve(loadedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }
                else
                    throw Error('Cannot load file from local storage with path ' + path);
            }
            else
                throw Error('Cannot load file from local storage with path ' + path);
        }).catch(function (e) {
            throw Error(e);
        });
    };
    GoLocalStorage.prototype.removeWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storage.showUI('Delete'));
        });
    };
    GoLocalStorage.prototype.remove = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                var deletedFile = { name: path, path: path, id: path };
                if (storage.currentDiagramFile && path === storage.currentDiagramFile['name'])
                    storage.currentDiagramFile = { name: null, path: null, id: null };
                storage.localStorage.removeItem(path);
                resolve(deletedFile);
                storage._deferredPromise['promise'].resolve(deletedFile);
                storage._deferredPromise['promise'] = storage.makeDeferredPromise();
            }
            else
                throw Error('Cannot delete file from local storage with path ' + path);
        });
    };
    GoLocalStorage._MIN_FILES_IN_UI = 100;
    return GoLocalStorage;
}(gcs.GoCloudStorage));
exports.GoLocalStorage = GoLocalStorage;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var GoDropBox = (function (_super) {
    __extends(GoDropBox, _super);
    function GoDropBox(managedDiagrams, clientId, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, clientId) || this;
        if (window['Dropbox']) {
            var Dropbox = window['Dropbox'];
            _this._dropbox = new Dropbox({ clientId: clientId });
        }
        _this.menuPath = "";
        _this.ui.id = "goDropBoxCustomFilepicker";
        _this._serviceName = "Dropbox";
        return _this;
    }
    Object.defineProperty(GoDropBox.prototype, "dropbox", {
        get: function () { return this._dropbox; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoDropBox.prototype, "menuPath", {
        get: function () { return this._menuPath; },
        set: function (value) { this._menuPath = value; },
        enumerable: true,
        configurable: true
    });
    GoDropBox.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (refreshToken) {
                var authUrl = storage.dropbox.getAuthenticationUrl(window.location.href);
                window.location.href = authUrl;
                resolve(false);
            }
            else if (!storage.dropbox.getAccessToken()) {
                if (window.location.hash.indexOf("access_token") !== -1 && window.location.hash.indexOf('id=dbid') !== -1) {
                    var accessToken = window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'));
                    storage.dropbox.setAccessToken(accessToken);
                    resolve(true);
                }
                else {
                    var authUrl = storage.dropbox.getAuthenticationUrl(window.location.href);
                    window.location.href = authUrl;
                    resolve(false);
                }
            }
            resolve(true);
        });
    };
    GoDropBox.prototype.getUserInfo = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!storage.dropbox.getAccessToken() && window.location.hash.indexOf("access_token") == -1) {
                storage.authorize(true);
            }
            else if (!storage.dropbox.getAccessToken() && window.location.hash.indexOf("access_token") == 1) {
                storage.authorize(false);
            }
            storage.dropbox.usersGetCurrentAccount(null).then(function (userData) {
                resolve(userData);
            }).catch(function (e) {
                if (e.status == 400) {
                    storage.authorize(true);
                }
            });
        });
    };
    GoDropBox.prototype.showUI = function (action, path, numAdditionalFiles) {
        var storage = this;
        var ui = storage.ui;
        if (!path)
            path = "";
        if (!numAdditionalFiles)
            numAdditionalFiles = 0;
        if (!storage.dropbox.getAccessToken()) {
            storage.authorize(true);
        }
        storage.dropbox.usersGetCurrentAccount(null).then(function (userData) {
            if (userData) {
                ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "dropBox.png'></img>";
                var title = action + " Diagram File";
                ui.innerHTML += "<strong>" + title + "</strong><hr></hr>";
                document.getElementsByTagName('body')[0].appendChild(ui);
                ui.style.visibility = 'visible';
                var filesDiv_1 = document.createElement('div');
                filesDiv_1.id = 'fileOptions';
                storage.dropbox.filesListFolder({ path: path }).then(function (resp) {
                    var files = resp.entries;
                    var path = files[0]['path_lower'].split("/");
                    var parentDirectory;
                    var currentDirectory;
                    if (path.length > 2) {
                        for (var i = 0; i < path.length - 1; i++) {
                            if (i === 0) {
                                parentDirectory = '';
                                currentDirectory = '';
                            }
                            else if (i < path.length - 2) {
                                parentDirectory += "/" + path[i];
                                currentDirectory += "/" + path[i];
                            }
                            else
                                currentDirectory += "/" + path[i];
                        }
                    }
                    storage.menuPath = (currentDirectory === undefined) ? '' : currentDirectory;
                    var currentDirectoryDisplay = (currentDirectory === undefined) ? "Root" : currentDirectory;
                    if (!document.getElementById('currentDirectory'))
                        ui.innerHTML += "<span id='currentDirectory'>Current Directory: " + currentDirectoryDisplay + "</span>";
                    var numFilesToDisplay = GoDropBox._MIN_FILES_IN_UI + numAdditionalFiles;
                    var numFilesChecked = 0;
                    var numFilesDisplayed = 0;
                    var numFoldersDisplayed = 0;
                    var hasDisplayedAllElements = false;
                    var _loop_1 = function (i) {
                        var file = files[i];
                        if (file[".tag"] == "folder") {
                            numFoldersDisplayed++;
                            if (numFilesChecked + numFoldersDisplayed >= files.length)
                                hasDisplayedAllElements = true;
                            var folderOption = document.createElement('div');
                            folderOption.className = 'folderOption';
                            var folder = document.createElement('a');
                            folder.href = "#";
                            folder.textContent = file['name'];
                            folder.id = file['id'];
                            folder.onclick = function () {
                                storage.showUI(action, file['path_lower'], 0);
                            };
                            folderOption.appendChild(folder);
                            filesDiv_1.appendChild(folderOption);
                        }
                        else if (numFilesDisplayed < numFilesToDisplay) {
                            numFilesChecked++;
                            if (numFilesChecked + numFoldersDisplayed >= files.length)
                                hasDisplayedAllElements = true;
                            if (file['name'].indexOf(".diagram") !== -1) {
                                numFilesDisplayed++;
                                if (action !== "Save") {
                                    var fileOption = document.createElement('div');
                                    fileOption.className = 'fileOption';
                                    var fileRadio = document.createElement('input');
                                    fileRadio.id = file['id'];
                                    fileRadio.type = 'radio';
                                    fileRadio.name = 'dropBoxFile';
                                    fileRadio.setAttribute('data', file['path_lower']);
                                    var fileLabel = document.createElement('label');
                                    fileLabel.id = file['id'] + '-label';
                                    fileLabel.textContent = file['name'];
                                    fileOption.appendChild(fileRadio);
                                    fileOption.appendChild(fileLabel);
                                    filesDiv_1.appendChild(fileOption);
                                }
                                else {
                                    var fileOption = document.createElement('div');
                                    fileOption.className = 'fileOption';
                                    var fileLabel = document.createElement('label');
                                    fileLabel.id = file['id'] + '-label';
                                    fileLabel.textContent = file['name'];
                                    fileOption.appendChild(fileLabel);
                                    filesDiv_1.appendChild(fileOption);
                                }
                            }
                        }
                    };
                    for (var i = 0; i < files.length; i++) {
                        _loop_1(i);
                    }
                    if (!hasDisplayedAllElements) {
                        var num_1 = numAdditionalFiles + 50;
                        filesDiv_1.innerHTML += "<p>Observed " + (GoDropBox._MIN_FILES_IN_UI + numAdditionalFiles) + " files. There may be more diagram files not shown. " +
                            "<a id='dropBoxLoadMoreFiles'>Click here</a> to search for more.</p>";
                        document.getElementById('dropBoxLoadMoreFiles').onclick = function () {
                            storage.showUI(action, storage.menuPath, num_1);
                        };
                    }
                    if (parentDirectory !== undefined) {
                        var parentDirectoryDisplay = void 0;
                        if (!parentDirectory)
                            parentDirectoryDisplay = "root";
                        else
                            parentDirectoryDisplay = parentDirectory;
                        var parentDiv = document.createElement('div');
                        var parentAnchor = document.createElement('a');
                        parentAnchor.id = 'dropBoxReturnToParentDir';
                        parentAnchor.text = "Back to " + parentDirectoryDisplay;
                        parentAnchor.onclick = function () {
                            storage.showUI(action, parentDirectory, 0);
                        };
                        parentDiv.appendChild(parentAnchor);
                        filesDiv_1.appendChild(parentDiv);
                    }
                    if (!document.getElementById(filesDiv_1.id))
                        ui.appendChild(filesDiv_1);
                    if (storage.currentDiagramFile.id) {
                        var currentFileElement = document.getElementById(storage.currentDiagramFile.id + '-label');
                        if (currentFileElement) {
                            currentFileElement.style.fontStyle = "italic";
                        }
                    }
                    if (action === 'Save' && !document.getElementById('userInputDiv')) {
                        var userInputDiv = document.createElement('div');
                        userInputDiv.id = 'userInputDiv';
                        userInputDiv.innerHTML = '<span>Save Diagram As </span><input id="userInput" placeholder="Enter filename"></input>';
                        ui.appendChild(userInputDiv);
                    }
                    if (!document.getElementById('userDataDiv')) {
                        var userDataDiv = document.createElement('div');
                        userDataDiv.id = 'userDataDiv';
                        var userDataSpan = document.createElement('span');
                        userDataSpan.textContent = userData.name.display_name + ', ' + userData.email;
                        userDataDiv.appendChild(userDataSpan);
                        var changeAccountAnchor = document.createElement('a');
                        changeAccountAnchor.href = "#";
                        changeAccountAnchor.id = "dropBoxChangeAccount";
                        changeAccountAnchor.textContent = "Change Account";
                        changeAccountAnchor.onclick = function () {
                            storage.authorize(true);
                        };
                        userDataDiv.appendChild(changeAccountAnchor);
                        ui.appendChild(userDataDiv);
                    }
                    if (!document.getElementById('submitDiv') && !document.getElementById('cancelDiv')) {
                        var submitDiv = document.createElement('div');
                        submitDiv.id = "submitDiv";
                        var actionButton = document.createElement('button');
                        actionButton.id = 'actionButton';
                        actionButton.textContent = action;
                        actionButton.onclick = function () {
                            storage.processUIResult(action);
                        };
                        submitDiv.appendChild(actionButton);
                        ui.appendChild(submitDiv);
                        var cancelDiv = document.createElement('div');
                        cancelDiv.id = 'cancelDiv';
                        var cancelButton = document.createElement('button');
                        cancelButton.textContent = "Cancel";
                        cancelButton.id = 'cancelButton';
                        cancelButton.onclick = function () {
                            storage.hideUI(true);
                        };
                        cancelDiv.appendChild(cancelButton);
                        ui.appendChild(cancelDiv);
                    }
                });
            }
        }).catch(function (e) {
            if (e.status == 400) {
                storage.authorize(true);
            }
        });
        return storage._deferredPromise.promise;
    };
    GoDropBox.prototype.hideUI = function (isActionCanceled) {
        var storage = this;
        storage.menuPath = "";
        _super.prototype.hideUI.call(this, isActionCanceled);
    };
    GoDropBox.prototype.processUIResult = function (action) {
        var storage = this;
        function getSelectedFilepath() {
            var radios = document.getElementsByName('dropBoxFile');
            var selectedFile = null;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    selectedFile = radios[i].getAttribute("data");
                }
            }
            return selectedFile;
        }
        var filePath = getSelectedFilepath();
        switch (action) {
            case 'Save': {
                if (storage.menuPath || storage.menuPath === '') {
                    var name_1 = document.getElementById('userInput').value;
                    if (name_1) {
                        if (name_1.indexOf('.diagram') === -1)
                            name_1 += '.diagram';
                        storage.save(storage.menuPath + '/' + name_1);
                    }
                    else {
                        console.log('Proposed file name is not valid');
                    }
                }
                break;
            }
            case 'Load': {
                storage.load(filePath);
                break;
            }
            case 'Delete': {
                storage.remove(filePath);
                break;
            }
        }
        storage.hideUI();
    };
    GoDropBox.prototype.checkFileExists = function (path) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new es6_promise_1.Promise(function (resolve, reject) {
            storage.dropbox.filesGetMetadata({ path: path }).then(function (resp) {
                if (resp)
                    resolve(true);
            }).catch(function (err) {
                resolve(false);
            });
        });
    };
    GoDropBox.prototype.getFile = function (path) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return storage.dropbox.filesGetMetadata({ path: path }).then(function (resp) {
            if (resp)
                return resp;
        }).catch(function (err) {
            return null;
        });
    };
    GoDropBox.prototype.saveWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storage.showUI('Save', ''));
        });
    };
    GoDropBox.prototype.save = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                storage.dropbox.filesUpload({
                    contents: storage.makeSaveFile(),
                    path: path,
                    autorename: true,
                    mode: { '.tag': 'add' },
                    mute: false
                }).then(function (resp) {
                    var savedFile = { name: resp.name, id: resp.id, path: resp.path_lower };
                    storage.currentDiagramFile = savedFile;
                    resolve(savedFile);
                    storage._deferredPromise.promise.resolve(savedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }).catch(function (e) {
                    if (e.status == 400) {
                        storage.authorize(true);
                    }
                });
            }
            else if (storage.currentDiagramFile.path) {
                path = storage.currentDiagramFile.path;
                storage.dropbox.filesUpload({
                    contents: storage.makeSaveFile(),
                    path: path,
                    autorename: false,
                    mode: { '.tag': 'overwrite' },
                    mute: true
                }).then(function (resp) {
                    var savedFile = { name: resp.name, id: resp.id, path: resp.path_lower };
                    resolve(savedFile);
                }).catch(function (e) {
                    if (e.status == 400) {
                        storage.authorize(true);
                    }
                });
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoDropBox.prototype.loadWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storage.showUI('Load', ''));
        });
    };
    GoDropBox.prototype.load = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                storage.dropbox.filesGetTemporaryLink({ path: path }).then(function (resp) {
                    var link = resp.link;
                    storage.currentDiagramFile.name = resp.metadata.name;
                    storage.currentDiagramFile.id = resp.metadata.id;
                    storage.currentDiagramFile.path = path;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', link, true);
                    xhr.setRequestHeader('Authorization', 'Bearer ' + storage.dropbox.getAccessToken());
                    xhr.onload = function () {
                        if (xhr.readyState == 4 && (xhr.status == 200)) {
                            storage.loadFromFileContents(xhr.response);
                            var loadedFile = { name: resp.metadata.name, id: resp.metadata.id, path: resp.metadata.path_lower };
                            resolve(loadedFile);
                            storage._deferredPromise.promise.resolve(loadedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        }
                        else {
                            throw Error("Cannot load file from Dropbox with path " + path);
                        }
                    };
                    xhr.send();
                }).catch(function (e) {
                    if (e.status == 400) {
                        storage.authorize(true);
                    }
                });
            }
            else
                throw Error("Cannot load file from Dropbox with path " + path);
        });
    };
    GoDropBox.prototype.removeWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storage.showUI('Delete', ''));
        });
    };
    GoDropBox.prototype.remove = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                storage.dropbox.filesDelete({ path: path }).then(function (resp) {
                    if (storage.currentDiagramFile && storage.currentDiagramFile['id'] === resp['id'])
                        storage.currentDiagramFile = { name: null, path: null, id: null };
                    var deletedFile = { name: resp.name, id: resp['id'], path: resp.path_lower };
                    resolve(deletedFile);
                    storage._deferredPromise.promise.resolve(deletedFile);
                    storage._deferredPromise.promise = storage.makeDeferredPromise();
                }).catch(function (e) {
                    if (e.status == 400) {
                        storage.authorize(true);
                    }
                });
            }
            else
                throw Error('Cannot delete file from Dropbox with path ' + path);
        });
    };
    GoDropBox._MIN_FILES_IN_UI = 100;
    return GoDropBox;
}(gcs.GoCloudStorage));
exports.GoDropBox = GoDropBox;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var GoGoogleDrive = (function (_super) {
    __extends(GoGoogleDrive, _super);
    function GoGoogleDrive(managedDiagrams, clientId, pickerApiKey, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, clientId) || this;
        _this._scope = 'https://www.googleapis.com/auth/drive';
        _this._pickerApiKey = pickerApiKey;
        _this._oauthToken = null;
        _this._gapiClient = null;
        _this._gapiPicker = null;
        _this.ui.id = "goGoogleDriveSavePrompt";
        _this._serviceName = "Google Drive";
        return _this;
    }
    Object.defineProperty(GoGoogleDrive.prototype, "pickerApiKey", {
        get: function () { return this._pickerApiKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoGoogleDrive.prototype, "scope", {
        get: function () { return this._scope; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoGoogleDrive.prototype, "gapiClient", {
        get: function () { return this._gapiClient; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoGoogleDrive.prototype, "gapiPicker", {
        get: function () { return this._gapiPicker; },
        enumerable: true,
        configurable: true
    });
    GoGoogleDrive.prototype.authorize = function (refreshToken) {
        if (refreshToken === void 0) { refreshToken = false; }
        var storage = this;
        var gapi = null;
        if (window['gapi'])
            gapi = window['gapi'];
        else
            return;
        if (refreshToken) {
            var href = document.location.href;
            document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + href;
        }
        return new es6_promise_1.Promise(function (resolve, reject) {
            function auth() {
                gapi.auth.authorize({
                    'client_id': storage.clientId,
                    'scope': storage.scope,
                    'immediate': false
                }, function (authResult) {
                    if (authResult && !authResult.error) {
                        storage._oauthToken = authResult.access_token;
                    }
                    storage._gapiClient = gapi.client;
                    if (window['google'])
                        storage._gapiPicker = window['google']['picker'];
                    resolve(true);
                });
            }
            gapi.load('client:auth', auth);
            gapi.load('picker', {});
        });
    };
    GoGoogleDrive.prototype.createPicker = function (cb) {
        var storage = this;
        if (storage._oauthToken) {
            var appId = storage.clientId.substring(0, this.clientId.indexOf("-"));
            var view = new storage.gapiPicker.View(storage.gapiPicker.ViewId.DOCS);
            view.setMimeTypes("application/json");
            view.setQuery("*.diagram");
            var picker = new storage.gapiPicker.PickerBuilder()
                .enableFeature(storage.gapiPicker.Feature.NAV_HIDDEN)
                .enableFeature(storage.gapiPicker.Feature.MULTISELECT_ENABLED)
                .setAppId(appId)
                .setOrigin(window.location.protocol + '//' + window.location.host)
                .setOAuthToken(storage._oauthToken)
                .addView(view)
                .setDeveloperKey(storage.pickerApiKey)
                .setCallback(function (args) {
                cb(args);
            })
                .build();
            picker.setVisible(true);
        }
    };
    GoGoogleDrive.prototype.getUserInfo = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var request = storage.gapiClient.request({
                'path': '/drive/v3/about',
                'method': 'GET',
                'params': { "fields": "user" },
                callback: function (resp) {
                    if (resp)
                        resolve(resp.user);
                    else
                        reject(resp);
                }
            });
        });
    };
    GoGoogleDrive.prototype.getFile = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var req = storage.gapiClient.request({
                path: '/drive/v3/files/' + path,
                method: 'GET',
                callback: function (resp) {
                    if (!resp.error) {
                        resolve(resp);
                    }
                    else {
                        reject(resp.error);
                    }
                }
            });
        });
    };
    GoGoogleDrive.prototype.checkFileExists = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var req = storage.gapiClient.request({
                path: '/drive/v3/files/' + path,
                method: 'GET',
                callback: function (resp) {
                    var bool = (!!resp);
                    resolve(bool);
                }
            });
        });
    };
    GoGoogleDrive.prototype.showUI = function () {
        var storage = this;
        var ui = storage.ui;
        ui.innerHTML = '';
        ui.style.visibility = 'visible';
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "googleDrive.jpg'></img><strong>Save Diagram As</strong><hr></hr>";
        var userInputDiv = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);
        var submitDiv = document.createElement('div');
        submitDiv.id = "submitDiv";
        var actionButton = document.createElement("button");
        actionButton.id = "actionButton";
        actionButton.textContent = "Save";
        actionButton.onclick = function () {
            storage.saveWithUI();
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        cancelDiv.id = "cancelDiv";
        var cancelButton = document.createElement("button");
        cancelButton.id = "cancelButton";
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise.promise;
    };
    GoGoogleDrive.prototype.saveWithUI = function () {
        var storage = this;
        var ui = storage.ui;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (ui.style.visibility === 'hidden') {
                resolve(storage.showUI());
            }
            else {
                var saveName = document.getElementById('userInput').value;
                storage.save(saveName);
                resolve(storage.hideUI());
            }
        });
    };
    GoGoogleDrive.prototype.save = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                if (path.indexOf('.diagram') === -1)
                    path += '.diagram';
                var overwrite_1 = false;
                var overwriteFile_1 = null;
                var request = storage.gapiClient.request({
                    'path': '/drive/v3/files',
                    'method': 'GET',
                    'params': { 'q': 'trashed=false and name contains ".diagram" and mimeType = "application/json"' },
                    callback: function (resp) {
                        var savedDiagrams = resp.files;
                        if (savedDiagrams) {
                            for (var i = 0; i < savedDiagrams.length; i++) {
                                if (savedDiagrams[i]['name'] == path) {
                                    overwrite_1 = true;
                                    overwriteFile_1 = savedDiagrams[i];
                                }
                            }
                        }
                        var boundary = '-------314159265358979323846';
                        var delimiter = "\r\n--" + boundary + "\r\n";
                        var close_delim = "\r\n--" + boundary + "--";
                        var contentType = 'application/json';
                        var metadata = {
                            'name': path,
                            'mimeType': contentType
                        };
                        var data = storage.makeSaveFile();
                        var multipartRequestBody = delimiter +
                            'Content-Type: application/json\r\n\r\n' +
                            JSON.stringify(metadata) +
                            delimiter +
                            'Content-Type: ' + contentType + '\r\n\r\n' +
                            data +
                            close_delim;
                        var request = storage.gapiClient.request({
                            'path': '/upload/drive/v3/files',
                            'method': 'POST',
                            'params': { 'uploadType': 'multipart' },
                            'headers': {
                                'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                            },
                            'body': multipartRequestBody
                        });
                        request.execute(function (resp) {
                            var savedFile = { name: resp.name, id: resp.id, path: resp.name };
                            storage.currentDiagramFile = savedFile;
                            resolve(savedFile);
                            storage._deferredPromise.promise.resolve(savedFile);
                            storage._deferredPromise.promise = storage.makeDeferredPromise();
                        });
                    }
                });
            }
            else if (storage.currentDiagramFile.path) {
                var fileId = storage.currentDiagramFile.id;
                var saveFile = storage.makeSaveFile();
                storage.gapiClient.request({
                    path: '/upload/drive/v3/files/' + fileId,
                    method: 'PATCH',
                    params: { uploadType: 'media' },
                    body: saveFile,
                    callback: function (resp) {
                        if (!resp.error) {
                            var savedFile = { name: resp.name, id: resp.id, path: resp.name };
                            resolve(savedFile);
                        }
                        else if (resp.error.code == 401) {
                            storage.authorize(true);
                        }
                    }
                });
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoGoogleDrive.prototype.loadWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var loadFunction = function (data) {
                if (data.action === "picked") {
                    var file = data.docs[0];
                    storage.gapiClient.request({
                        'path': '/drive/v3/files/' + file.id + "?alt=media",
                        'method': 'GET',
                        callback: function (modelData) {
                            if (file.name.indexOf(".diagram") !== -1) {
                                var loadedFile = { name: file.name, path: file.name, id: file.id };
                                resolve(storage.load(file.id));
                                storage.currentDiagramFile = loadedFile;
                            }
                        }
                    });
                }
            };
            storage.createPicker(loadFunction);
        });
    };
    GoGoogleDrive.prototype.load = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            storage.getFile(path).then(function (file) {
                storage.gapiClient.request({
                    'path': '/drive/v3/files/' + file.id + "?alt=media",
                    'method': 'GET',
                    callback: function (modelData) {
                        if (modelData) {
                            if (file.name.indexOf(".diagram") !== -1) {
                                storage.loadFromFileContents(JSON.stringify(modelData));
                                var loadedFile = { name: file['name'], path: file['name'], id: file['id'] };
                                storage.currentDiagramFile = loadedFile;
                                resolve(loadedFile);
                            }
                        }
                    }
                });
            }).catch(function (e) {
                reject(e.message);
            });
        });
    };
    GoGoogleDrive.prototype.removeWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var deleteFunction = function (data) {
                if (data['action'] === "picked") {
                    var file = data['docs'][0];
                    resolve(storage.remove(file.id));
                }
            };
            storage.createPicker(deleteFunction);
        });
    };
    GoGoogleDrive.prototype.remove = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            storage.getFile(path).then(function (deletedFile) {
                storage.gapiClient.request({
                    'path': 'drive/v3/files/' + path,
                    'method': 'DELETE',
                    callback: function () {
                        if (storage.currentDiagramFile && path == storage.currentDiagramFile.id)
                            storage.currentDiagramFile = { name: null, path: null, id: null };
                        deletedFile['path'] = deletedFile['name'];
                        resolve(deletedFile);
                    }
                });
            }).catch(function (e) {
                reject(e.message);
            });
        });
    };
    return GoGoogleDrive;
}(gcs.GoCloudStorage));
exports.GoGoogleDrive = GoGoogleDrive;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gcs = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var GoOneDrive = (function (_super) {
    __extends(GoOneDrive, _super);
    function GoOneDrive(managedDiagrams, clientId, defaultModel, iconsRelativeDirectory) {
        var _this = _super.call(this, managedDiagrams, defaultModel, clientId) || this;
        _this._oauthToken = null;
        _this.ui.id = "goOneDriveSavePrompt";
        if (window['OneDrive']) {
            _this._oneDriveFilepicker = window['OneDrive'];
        }
        _this.authorize(false);
        _this._serviceName = "Microsoft OneDrive";
        return _this;
    }
    Object.defineProperty(GoOneDrive.prototype, "oauthToken", {
        get: function () { return this._oauthToken; },
        set: function (value) { this._oauthToken = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoOneDrive.prototype, "oneDriveFilepicker", {
        get: function () { return this._oneDriveFilepicker; },
        enumerable: true,
        configurable: true
    });
    GoOneDrive.prototype.authorize = function (refreshToken) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (!refreshToken && window.location.hash.indexOf("access_token") !== -1) {
                var accessToken = window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'));
                storage.oauthToken = accessToken;
                resolve(true);
            }
            else if (refreshToken) {
                var authUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' + storage.clientId +
                    '&scope=files.readwrite.all&response_type=token&redirect_uri=' + window.location.href + '';
                window.location.href = authUrl;
                resolve(true);
            }
        });
    };
    GoOneDrive.prototype.getUserInfo = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            if (!storage.oauthToken) {
                if (window.location.hash.indexOf("access_token") == -1) {
                    reject("No acessToken in current uri");
                    storage.authorize(true);
                }
                else {
                    reject("oauthToken not set");
                    storage.authorize(false);
                }
            }
            else {
                xhr.open('GET', 'https://graph.microsoft.com/v1.0/me');
                xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else if (xhr.status == 401) {
                        storage.authorize(true);
                        reject(xhr.response);
                    }
                };
                xhr.send();
            }
        });
    };
    GoOneDrive.prototype.checkFileExists = function (path) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new es6_promise_1.Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://graph.microsoft.com/v1.0' + path, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
            xhr.onreadystatechange = function () {
                var bool, err;
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        bool = true;
                    }
                    else if (xhr.status === 401) {
                        storage.authorize(true);
                    }
                    else if (xhr.status === 404) {
                        bool = false;
                    }
                    else {
                        err = xhr.response;
                    }
                    resolve(bool);
                    if (err)
                        reject(err);
                }
            };
            xhr.send();
        });
    };
    GoOneDrive.prototype.getFile = function (path, token) {
        var storage = this;
        if (path.indexOf('.diagram') === -1)
            path += '.diagram';
        return new es6_promise_1.Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://graph.microsoft.com/v1.0' + path, true);
            var t = (token) ? token : storage.oauthToken;
            xhr.setRequestHeader('Authorization', 'Bearer ' + t);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var file = JSON.parse(xhr.response);
                        resolve(file);
                    }
                    else if (xhr.status == 401) {
                        storage.authorize(true);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send();
        });
    };
    GoOneDrive.prototype.showUI = function () {
        var storage = this;
        var ui = storage.ui;
        ui.innerHTML = '';
        ui.style.visibility = 'visible';
        ui.innerHTML = "<img class='icons' src='" + storage.iconsRelativeDirectory + "oneDrive.png'></img><strong>Save Diagram As</strong><hr></hr>";
        var userInputDiv = document.createElement('div');
        userInputDiv.id = 'userInputDiv';
        userInputDiv.innerHTML += '<input id="userInput" placeholder="Enter filename"></input>';
        ui.appendChild(userInputDiv);
        var submitDiv = document.createElement('div');
        submitDiv.id = "submitDiv";
        var actionButton = document.createElement("button");
        actionButton.id = "actionButton";
        actionButton.textContent = "Save";
        actionButton.onclick = function () {
            storage.saveWithUI();
        };
        submitDiv.appendChild(actionButton);
        ui.appendChild(submitDiv);
        var cancelDiv = document.createElement('div');
        cancelDiv.id = "cancelDiv";
        var cancelButton = document.createElement("button");
        cancelButton.id = "cancelButton";
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = function () {
            storage.hideUI(true);
        };
        cancelDiv.appendChild(cancelButton);
        ui.appendChild(cancelDiv);
        return storage._deferredPromise.promise;
    };
    GoOneDrive.prototype.saveWithUI = function () {
        var storage = this;
        var ui = storage.ui;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (ui.style.visibility === 'hidden') {
                resolve(storage.showUI());
            }
            else {
                var saveName_1 = document.getElementById('userInput').value;
                if (saveName_1 && saveName_1.indexOf('.diagram') === -1)
                    saveName_1 += ".diagram";
                var odOptions = {
                    clientId: storage.clientId,
                    action: "query",
                    openInNewWindow: true,
                    success: function (selection) {
                        var folder = selection.value[0];
                        var token = selection.accessToken;
                        storage.currentDiagramFile = {
                            id: null,
                            name: saveName_1,
                            token: token,
                            parentReference: {
                                driveId: folder['parentReference']['driveId'],
                                id: folder['id']
                            },
                            path: 'placeholder'
                        };
                        storage.hideUI();
                        storage.save();
                    }
                };
                if (saveName_1 && saveName_1 !== "" && saveName_1 !== undefined)
                    storage.oneDriveFilepicker.save(odOptions);
                else
                    reject('Cannot save file to OneDrive with save name ' + saveName_1);
            }
        });
    };
    GoOneDrive.prototype.save = function (path) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                var xhr_1 = new XMLHttpRequest();
                if (path.indexOf(".diagram") === -1)
                    path += '.diagram';
                var bodyContent = storage.makeSaveFile();
                xhr_1.open('PUT', 'https://graph.microsoft.com/v1.0' + path + ':/content', true);
                xhr_1.setRequestHeader('Authorization', 'Bearer ' + storage.oauthToken);
                xhr_1.setRequestHeader('Content-Type', 'application/json');
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4) {
                        if (xhr_1.status >= 200 && xhr_1.status < 300) {
                            var file = JSON.parse(xhr_1.response);
                            var savedFile = { name: file['name'], id: file['id'],
                                path: file['parentReference']['path'] + '/' + file['name'], parentReference: file['parentReference'] };
                            resolve(savedFile);
                        }
                        else if (xhr_1.status == 401) {
                            storage.authorize(true);
                        }
                        else {
                            throw Error(xhr_1.response);
                        }
                    }
                };
                xhr_1.send(bodyContent);
            }
            else if (storage.currentDiagramFile.path) {
                var token_1 = storage.currentDiagramFile.token;
                var url = storage.generateGraphUrl(storage.currentDiagramFile, true, true);
                var bodyContent = storage.makeSaveFile();
                var t = (!token_1) ? storage.oauthToken : storage.currentDiagramFile.token;
                var xhr_2 = new XMLHttpRequest();
                xhr_2.open('PUT', url, true);
                xhr_2.setRequestHeader('Authorization', 'Bearer ' + t);
                xhr_2.onload = function () {
                    if (xhr_2.readyState == 4 && (xhr_2.status == 200 || xhr_2.status == 201)) {
                        var file = JSON.parse(xhr_2.response);
                        var savedFile = { name: file['name'], id: file['id'],
                            path: file['parentReference']['path'] + '/' + file['name'], token: token_1, parentReference: file['parentReference'] };
                        storage.currentDiagramFile = savedFile;
                        resolve(savedFile);
                        storage._deferredPromise.promise.resolve(savedFile);
                        storage._deferredPromise.promise = storage.makeDeferredPromise();
                    }
                    else {
                        reject(xhr_2.response);
                    }
                };
                xhr_2.send(bodyContent);
            }
            else {
                resolve(storage.saveWithUI());
            }
        });
    };
    GoOneDrive.prototype.loadWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var odOptions = {
                clientId: storage.clientId,
                action: "share",
                multiSelect: false,
                advanced: {
                    filter: ".diagram"
                },
                success: function (files) {
                    var file = files['value'][0];
                    var token = files['accessToken'];
                    var filePath = file['parentReference']['path'] + "/" + file['name'];
                    resolve(storage.load(filePath, token));
                }
            };
            storage.oneDriveFilepicker.open(odOptions);
        });
    };
    GoOneDrive.prototype.load = function (path, token) {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (path) {
                var t = (token) ? token : storage.oauthToken;
                storage.getFile(path, t).then(function (file) {
                    var downloadLink = file["@microsoft.graph.downloadUrl"];
                    var downloadxhr = new XMLHttpRequest();
                    downloadxhr.open('GET', downloadLink, true);
                    downloadxhr.onreadystatechange = function () {
                        if (downloadxhr.readyState == 4) {
                            if (downloadxhr.status == 200) {
                                storage.loadFromFileContents(downloadxhr.response);
                                var loadedFile = { name: file['name'], id: file['id'], path: file['parentReference']['path'] + '/' + file['name'], token: token,
                                    parentReference: { id: file['parentReference']['id'], driveId: file['parentReference']['driveId'] } };
                                storage.currentDiagramFile = loadedFile;
                                resolve(loadedFile);
                            }
                        }
                    };
                    downloadxhr.send();
                });
            }
            else
                reject('Cannot load file from OneDrive with path ' + path);
        });
    };
    GoOneDrive.prototype.removeWithUI = function () {
        var storage = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var odOptions = {
                clientId: storage.clientId,
                action: "share",
                openInNewWindow: true,
                success: function (files) {
                    if (files) {
                        var file = files['value'][0];
                        var token_2 = files['accessToken'];
                        var filePath_1 = file['parentReference']['path'] + "/" + file['name'];
                        resolve(new es6_promise_1.Promise(function (resolve, reject) {
                            resolve(storage.remove(filePath_1, token_2));
                        }));
                    }
                }
            };
            storage.oneDriveFilepicker.open(odOptions);
        });
    };
    GoOneDrive.prototype.remove = function (path, token) {
        var storage = this;
        var t = (token) ? token : storage.oauthToken;
        return new es6_promise_1.Promise(function (resolve, reject) {
            storage.getFile(path, t).then(function (file) {
                var deletedFile = { name: file['name'], id: file['id'], path: file['parentReference']['path'] + '/' + file['name'] };
                var xhr = new XMLHttpRequest();
                xhr.open('DELETE', 'https://graph.microsoft.com/v1.0' + path, true);
                xhr.setRequestHeader('Authorization', 'Bearer' + t);
                xhr.onload = function () {
                    if (xhr.readyState == 4 && xhr.status == 204) {
                        if (storage.currentDiagramFile && path == storage.currentDiagramFile.path)
                            storage.currentDiagramFile = { id: null, path: null, name: null };
                        resolve(deletedFile);
                    }
                    else if (xhr.status == 401) {
                        storage.authorize(true);
                    }
                    else {
                        reject(xhr.response);
                    }
                };
                xhr.send();
            }).catch(function (err) {
                throw Error(err);
            });
        });
    };
    GoOneDrive.prototype.generateGraphUrl = function (driveItem, targetParentFolder, itemRelativeApiPath) {
        var url = "https://graph.microsoft.com/v1.0/";
        if (targetParentFolder)
            url += "drives/" + driveItem['parentReference']['driveId'] + "/items/" + driveItem['parentReference']['id'] + "/children/" + driveItem['name'];
        else
            url += "drives/" + driveItem['parentReference']['driveId'] + "/items/" + driveItem['id'];
        if (itemRelativeApiPath)
            url += "/content";
        return url;
    };
    return GoOneDrive;
}(gcs.GoCloudStorage));
exports.GoOneDrive = GoOneDrive;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var go = __webpack_require__(2);
var gcs = __webpack_require__(1);
var es6_promise_1 = __webpack_require__(0);
var GoCloudStorageManager = (function () {
    function GoCloudStorageManager(storages, iconsRelativeDirectory) {
        if (storages instanceof Array) {
            var storagesSet = new go.Set();
            for (var i = 0; i < storages.length; i++) {
                if (!(storages[i] instanceof gcs.GoCloudStorage)) {
                    throw Error("Cannot create GoCloudStorageManager; provided 'storages' parameter elements are not all of type GoCloudStorage");
                }
                else {
                    storagesSet.add(storages[i]);
                }
            }
            storages = storagesSet;
        }
        if (!(storages instanceof go.Set) || !storages)
            throw Error("Cannot create GoCloudStorageManager with provided 'storages' parameter");
        var storageManager = this;
        storageManager._storages = storages;
        storageManager._currentStorage = storages.first();
        var menu = document.createElement('div');
        menu.id = 'goCloudStorageManagerMenu';
        storageManager._menu = menu;
        storageManager._deferredPromise = { promise: gcs.GoCloudStorage.prototype.makeDeferredPromise() };
        storageManager._iconsRelativeDirectory = (!!iconsRelativeDirectory) ? iconsRelativeDirectory : "../goCloudStorageIcons/";
        if (iconsRelativeDirectory) {
            storageManager._storages.iterator.each(function (storage) {
                storage.iconsRelativeDirectory = iconsRelativeDirectory;
            });
        }
        if (window.location.href.indexOf("account_id=dbid") !== -1) {
            storages.iterator.each(function (storage) {
                if (storage.constructor["name"] === "GoDropBox") {
                    storageManager._currentStorage = storage;
                }
            });
        }
    }
    Object.defineProperty(GoCloudStorageManager.prototype, "storages", {
        get: function () { return this._storages; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorageManager.prototype, "iconsRelativeDirectory", {
        get: function () { return this._iconsRelativeDirectory; },
        set: function (value) { this._iconsRelativeDirectory = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorageManager.prototype, "menu", {
        get: function () { return this._menu; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoCloudStorageManager.prototype, "currentStorage", {
        get: function () { return this._currentStorage; },
        set: function (value) { this._currentStorage = value; },
        enumerable: true,
        configurable: true
    });
    GoCloudStorageManager.prototype.create = function () {
        var storageManager = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storageManager.handleAction("Create"));
        });
    };
    GoCloudStorageManager.prototype.load = function () {
        var storageManager = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storageManager.handleAction("Load"));
        });
    };
    GoCloudStorageManager.prototype.remove = function () {
        var storageManager = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(storageManager.handleAction("Remove"));
        });
    };
    GoCloudStorageManager.prototype.save = function (isSaveAs) {
        if (isSaveAs === void 0) { isSaveAs = true; }
        var storageManager = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (isSaveAs)
                resolve(storageManager.handleAction("SaveAs"));
            else
                resolve(storageManager.handleAction("Save"));
        });
    };
    GoCloudStorageManager.prototype.showMessage = function (msg, seconds) {
        if (!seconds)
            seconds = 2;
        var messageBox = document.createElement("div");
        messageBox.id = "goCloudStorageManagerMessageBox";
        messageBox.innerHTML = "<p>" + msg + "</p>";
        document.body.appendChild(messageBox);
        setTimeout(function () {
            messageBox.style.opacity = '0';
            setTimeout(function () { messageBox.parentNode.removeChild(messageBox); }, 1000);
        }, 1000 * seconds);
    };
    GoCloudStorageManager.prototype.selectStorageService = function () {
        var storageManager = this;
        var storages = this.storages;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var menu = storageManager.menu;
            var title = 'Select Storage Service';
            menu.innerHTML = "<strong>" + title + "</strong><hr></hr>";
            document.getElementsByTagName('body')[0].appendChild(storageManager.menu);
            storageManager.menu.style.visibility = 'visible';
            var optionsDiv = document.createElement('div');
            optionsDiv.id = 'storageOptions';
            var it = storages.iterator;
            it.each(function (storage) {
                var src = storageManager.iconsRelativeDirectory;
                var type = storage.constructor['name'];
                switch (type) {
                    case 'GoGoogleDrive':
                        src += 'googleDrive.jpg';
                        break;
                    case 'GoOneDrive':
                        src += 'oneDrive.png';
                        break;
                    case 'GoLocalStorage':
                        src += 'localStorage.png';
                        break;
                    case 'GoDropBox':
                        src += 'dropBox.png';
                        break;
                }
                optionsDiv.innerHTML +=
                    "<label>" +
                        "<input id=" + type + " type='radio' name='storageSelection' />" +
                        "<img class='storageLogo' src=" + src + ">";
            });
            menu.appendChild(optionsDiv);
            var submitDiv = document.createElement('div');
            var actionButton = document.createElement("button");
            actionButton.id = "actionButton";
            actionButton.textContent = "Select";
            actionButton.onclick = function () {
                var radios = document.getElementsByName('storageSelection');
                var selectedStorage = null;
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        selectedStorage = radios[i].id;
                    }
                }
                storageManager.storages.each(function (storage) {
                    if (storage.constructor['name'] == selectedStorage)
                        storageManager.currentStorage = storage;
                });
                if (storageManager.currentStorageNeedsAuth()) {
                    storageManager.currentStorage.authorize();
                }
                resolve(storageManager.currentStorage);
                storageManager.hideMenu();
            };
            submitDiv.appendChild(actionButton);
            menu.appendChild(submitDiv);
            var cancelDiv = document.createElement('div');
            var cancelButton = document.createElement("button");
            cancelButton.id = "cancelButton";
            cancelButton.textContent = "Cancel";
            cancelButton.onclick = function () {
                storageManager.hideMenu();
            };
            cancelDiv.appendChild(cancelButton);
            menu.appendChild(cancelDiv);
        });
    };
    GoCloudStorageManager.prototype.hideMenu = function () {
        var storageManager = this;
        storageManager.menu.style.visibility = 'hidden';
    };
    GoCloudStorageManager.prototype.currentStorageNeedsAuth = function () {
        var storageManager = this;
        var currentStorageClass = storageManager.currentStorage.constructor['name'];
        if (currentStorageClass === "GoGoogleDrive" || currentStorageClass === "GoDropBox")
            return true;
        return false;
    };
    GoCloudStorageManager.prototype.handleAction = function (action) {
        var storageManager = this;
        var storage = storageManager.currentStorage;
        return new es6_promise_1.Promise(function (resolve, reject) {
            function doAction() {
                switch (action) {
                    case "Load": {
                        resolve(storage.loadWithUI());
                        break;
                    }
                    case "SaveAs": {
                        resolve(storage.saveWithUI());
                        break;
                    }
                    case "Save": {
                        resolve(storage.save());
                        break;
                    }
                    case "Remove": {
                        resolve(storage.removeWithUI());
                        break;
                    }
                    case "Create": {
                        resolve(storage.create());
                        break;
                    }
                }
                storageManager.hideMenu();
            }
            if (storageManager.currentStorageNeedsAuth())
                storage.authorize().then(function () {
                    doAction();
                });
            else
                doAction();
        });
    };
    return GoCloudStorageManager;
}());
exports.GoCloudStorageManager = GoCloudStorageManager;


/***/ })
/******/ ]);
//# sourceMappingURL=gcs.js.map