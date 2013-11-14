/*
 * An extremely lame shim for the minimatch module.
 * Actually, shimming minimatch doesn't even make sense. It would probably
 * browserify well at a reasonable file size, but since this is to demonstrate
 * how to shim an npm dependency for browserify, we shim it nonetheless.
 */

'use strict';

module.exports = function(filename, pattern) {
  pattern = pattern.replace('.', '\\.')
  pattern = pattern.replace('*', '.*')
  pattern = '^' + pattern + '$'
  var re = new RegExp(pattern, 'g')
  return re.test(filename)
}

/*
 * We don't even bother to shim minimatch.filter, minimatch.match or any other
 * methods minimatch might offer, since they are not used in our module.
 */
