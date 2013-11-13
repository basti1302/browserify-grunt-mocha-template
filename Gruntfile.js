'use strict';

var request = require('request')

var serverRootUri = 'http://127.0.0.1:1604'
var serverStatusUri = serverRootUri + '/status'
var serverKillUri = serverRootUri + '/quit'
var mochaPhantomJsTestRunner = serverRootUri + '/static/browser/test/index.html'
var serverWasAlreadyRunning = false

/* jshint -W106 */
module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        '**/*.js',
        'Gruntfile.js',
        '!node_modules/**/*',
        '!browser/example/lib/**/*',
        '!browser/dist/**/*'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // run the mocha tests via Node.js
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          slow: 300,
          timeout: 100
        },
        src: ['test/**/*.js']
      }
    },

    // remove all previous browserified builds
    clean: {
      dist: ['./browser/dist/**/*']
    },

    // browserify everything
    browserify: {
      // This browserify build be used by users of the module. It contains a
      // UMD (universal module definition) and can be used via an AMD module
      // loader like RequireJS or by simply placing a script tag in the page,
      // which registers mymodule as a global var. You can see examples for both
      // usages in browser/example/index.html (script tag) and
      // browser/example/index-require.html (RequireJS).
      standalone: {
        src: [ '<%= pkg.name %>.js' ],
        dest: './browser/dist/<%= pkg.name %>.standalone.js',
        options: {
          standalone: '<%= pkg.name %>'
        }
      },
      // This browserify build can be required by other browserify modules that
      // have been created with an --external parameter. See
      // browser/test/index.html for an example.
      require: {
        src: [ '<%= pkg.name %>.js' ],
        dest: './browser/dist/<%= pkg.name %>.require.js',
        options: {
          alias: [ './<%= pkg.name %>.js:' ]
        }
      },
      // These are the browserified tests. We need to browserify the tests to be
      // able to run the mocha tests while writing the tests as clean, simple
      // CommonJS mocha tests (that is, without cross-platform boilerplate
      // code). This build will also include the testing libs chai, sinon and
      // sinon-chai but must not include the module under test.
      tests: {
        src: [ 'browser/test/suite.js' ],
        dest: './browser/dist/browserified_tests.js',
        options: {
          external: [ './<%= pkg.name %>.js' ],
          // Embed source map for tests
          debug: true
        }
      }
    },

    // run the mocha tests in the browser via PhantomJS
    'mocha_phantomjs': {
      all: {
        options: {
          urls: [
            mochaPhantomJsTestRunner
          ]
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    },
  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-mocha-phantomjs')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Start
  grunt.registerTask('start-test-server', 'Start the test server.',
      function() {
    var done = this.async()

    function pingTestServer(callback) {
      request.get(serverStatusUri, function(error, response) {
        if (error) {
          callback(error)
        } else if (response.statusCode === 200) {
          callback()
        } else {
          callback(new Error('HTTP status code was not 200 (as expected), ' +
              'but ' + response.statusCode))
        }
      })
    }

    grunt.log.writeln('Starting test server from grunt.')
    pingTestServer(function(error) {
      // Only start a test server instance if none is running. Rationale:
      // If an instance is running via supervisor while watching changed files,
      // we do not need to (and can not due to port conflicts) start a second
      // instance.
      if (error) {
        if (error.message !== 'connect ECONNREFUSED') {
          grunt.log.writeln('(Message from ping was: ' + error.message + ')')
        }
        grunt.log.writeln('It seems the test server is currently not ' +
            'running, will start a new instance to run mocha-phantomjs tests.')
        require('./bin/start-test-server')
        done()
      } else {
        serverWasAlreadyRunning = true
        grunt.log.writeln('Test server is already running.')
        done()
      }
    })
  })

  grunt.registerTask('stop-test-server', 'Stops the test server.',
      function() {
    var done = this.async()
    if (serverWasAlreadyRunning) {
      grunt.log.writeln('Server was already running when Grunt build started,' +
          ' thus it will not be shut down now from Grunt.')
      return done()
    } else {
      grunt.log.writeln('Stopping test server from grunt.')
    }
    request.get(serverKillUri, function(error, response) {
      if (error) {
        if (error.message !== 'connect ECONNREFUSED') {
          grunt.log.writeln('(Message from stop request was: ' + error.message +
              ')')
        }
        grunt.log.writeln('It seems the test server is not running at all, ' +
            'doing nothing')
        return done()
      } else {
        grunt.log.writeln('Poison pill request has been send to test server, ' +
            'test server should have been shut down.')
        grunt.log.writeln('')
        return done()
      }
    })
  })

  grunt.registerTask('default', [
    'jshint',
    'mochaTest',
    'clean',
    'browserify',
    'start-test-server',
    'mocha_phantomjs',
    'stop-test-server'
  ])
}
/* jshint +W106 */
