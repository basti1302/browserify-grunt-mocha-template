var myModule = require('../mymodule');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('My browserified tests', function() {

  it('should have mocha super-powers', function() {
    if (false) {
      throw new Error('false is true, I have no clue');
    }
  });

  it('should be able to use my module', function() {
    if (myModule.add(1, 1) !==  2) {
      throw new Error('Whoa. 1 + 1 is not 2?');
    }
  });

  it('should use chai coz it\'s so tasty', function() {
    expect(myModule.add(2, 3)).to.equal(5);
    expect(myModule.mult(6, 7)).to.equal(42);
  });

  it('should also use sinon and sinonChai', function() {
    var stub = sinon.stub();
    myModule.callCallback(stub);
    expect(stub).to.have.been.called;
    expect(stub.firstCall.args[0]).to.equal(1302);
  });
});
