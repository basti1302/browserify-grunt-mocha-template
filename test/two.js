var myModule = require('../mymodule')

var chai = require('chai')
var expect = chai.expect

describe('Just another test', function() {
  it('that runs asynchronously', function(done) {
    setTimeout(function() {
      done()
    }, 1)
  })

  it('which uses shimmed functionality', function() {
    expect(myModule.isJs('mymodule.js')).to.be.true
  })
})
