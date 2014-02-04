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
