var minimatch = require('minimatch');

var helper = require('./lib/helper');
var echo = require('./lib/echo');
var optional = require('./lib/optional');

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

  useOptional: function() {
    return optional.optional();
  },
};
