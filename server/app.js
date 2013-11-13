/*
 * Serves static files for grunt-mocha-phantomjs
 */

var express = require('express')
var http = require('http')
var path = require('path')
var app = express()
var server

exports.start = function() {
  // all environments
  app.set('port', process.env.PORT || 1604)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded())
  app.use(express.methodOverride())
  app.use(app.router)

  // serve files from the root folder of the project
  app.use('/static', express.static(path.join(__dirname, '..')))

  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler())
  }

  app.get('/status', function(req, res) {
    res.send({status: 'Everything is fine. The sun is shining.'})
  })

  app.get('/quit', function(req, res) {
    res.status(204).end()
    console.log('Received request to /quit, shutting down.')
    exports.stop()
  })

  global.port = app.get('port')

  server = http.createServer(app)
  server.listen(app.get('port'), function() {
    console.log('Test server listening on port ' + app.get('port'))
  })
}

exports.stop = function() {
  console.log('Stopping test server.')
  server.close()
}
