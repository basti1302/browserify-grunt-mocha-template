var myModule = require('../mymodule')

var chai = require('chai')
chai.should()

describe('Just another test', function() {
  it('that runs asynchronously', function(done) {
    setTimeout(function() {
      done()
    }, 42)
  })
})
