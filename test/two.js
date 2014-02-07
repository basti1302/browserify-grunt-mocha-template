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
});
