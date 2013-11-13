require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  isArray: function(o) {
    if (o == null) {
      return false
    }
    return Object.prototype.toString.call(o) === '[object Array]'
  }
}

},{}],2:[function(require,module,exports){
var util = require('util')

exports.mult = function(a, b) {
  if (util.isArray([])) {
    return a * b
  } else {
    return -666
  }
}

},{"util":1}],"ktcxVp":[function(require,module,exports){
var helper = require('./lib/helper')

module.exports = {
  add: function(a, b) {
    return a + b
  },
  mult: function(a, b) {
    return helper.mult(a, b)
  },
  callCallback: function(cb) {
    return cb(1302)
  }
}

},{"./lib/helper":2}],"/home/bastian/projekte/browserify-grunt-mocha-template/mymodule.js":[function(require,module,exports){
module.exports=require('ktcxVp');
},{}]},{},["ktcxVp"])
;