var myModule = require('../mymodule');

var chai = require('chai');
var expect = chai.expect;

describe('Just another test', function() {
  it('that runs asynchronously', function(done) {
    setTimeout(function() {
      done();
    }, 1);
  });

  it('which uses a shimmed module of this package', function() {
    expect(myModule.echo('Hello!')).to.match(/(?:node|browser) says: Hello!/);
  });

  it('which uses a shimmed module from npm', function() {
    expect(myModule.isJs('mymodule.js')).to.be.true;
  });

  it('which uses a module that is omitted by browserify', function() {
    if (isNodeJs()) {
      expect(myModule.useOptional()).to.equal(42);
    } else {
      expect(myModule.useOptional).to.throw(TypeError);
    }
  });

  function isNodeJs() {
    // can't use strict here
    if (typeof window !== 'undefined') {
      return false;
    } else if (typeof process !== 'undefined') {
      return true;
    } else {
      throw new Error('Can\'t figure out environment. ' +
          'Seems it\'s neither Node.js nor a browser.');
    }
  }

});
