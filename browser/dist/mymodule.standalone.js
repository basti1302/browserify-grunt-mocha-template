!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.mymodule=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
exports.echo = function(str) {
  return 'browser says: ' + str;
};

},{}],2:[function(_dereq_,module,exports){
/*
 * An extremely lame shim for the minimatch module.
 * Actually, shimming minimatch doesn't even make sense. It would probably
 * browserify well at a reasonable file size, but since this is to demonstrate
 * how to shim an npm dependency for browserify, we shim it nonetheless.
 */

'use strict';

module.exports = function(filename, pattern) {
  pattern = pattern.replace('.', '\\.');
  pattern = pattern.replace('*', '.*');
  pattern = '^' + pattern + '$';
  var re = new RegExp(pattern, 'g');
  return re.test(filename);
};

/*
 * We don't even bother to shim minimatch.filter, minimatch.match or any other
 * methods minimatch might offer, since they are not used in our module.
 */

},{}],3:[function(_dereq_,module,exports){
/*
 * A (very basic) shim for node's util module. Only the functionality actualy
 * used in mymodule is shimmed. Actually, it is not necessary to shim the core
 * node modules at all because browserify provides shims for most of them.
 * Sometimes it can still be a good idea to shim a node core module yourself if
 * you only use a small fraction of it's functionality which is easy to shim,
 * because this will reduce the size of the browserified file.
 */

'use strict';

module.exports = {
  isArray: function(o) {
    if (o == null) {
      return false;
    }
    return Object.prototype.toString.call(o) === '[object Array]';
  }
};

},{}],4:[function(_dereq_,module,exports){
var util = _dereq_('util');

exports.mult = function(a, b) {
  if (util.isArray([])) {
    return a * b;
  } else {
    return -666;
  }
};

},{"util":3}],5:[function(_dereq_,module,exports){
var minimatch = _dereq_('minimatch');

var helper = _dereq_('./lib/helper');
var echo = _dereq_('./lib/echo');

module.exports = {

  add: function(a, b) {
    return a + b;
  },

  mult: function(a, b) {
    return helper.mult(a, b);
  },

  isJs: function(filename) {
    return minimatch(filename, '*.js');
  },

  callCallback: function(cb) {
    return cb(1302);
  },

  echo: function(str) {
    return echo.echo(str);
  },
};

},{"./lib/echo":1,"./lib/helper":4,"minimatch":2}]},{},[5])
(5)
});