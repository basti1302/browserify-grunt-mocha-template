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
