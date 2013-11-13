var myModule = require('../mymodule')

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('My browserified tests', function() {

  it('should have mocha super-powers', function() {
    if (false) {
      throw new Error('false is true, I have no clue')
    }
  })

  it('should be able to use my module', function() {
    if (myModule.add(1, 1) !==  2) {
      throw new Error('Whoa. 1 + 1 is not 2?')
    }
  })

  it('should use chai coz it\'s so tasty', function() {
    myModule.add(2, 3).should.equal(5)
    myModule.mult(6, 7).should.equal(42)
  })

  it('should also use sinon and sinonChai', function() {
    var stub = sinon.stub()
    myModule.callCallback(stub)
    stub.should.have.been.called
    stub.firstCall.args[0].should.equal(1302)
  })
})
