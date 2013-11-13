Cross platform JavaScript npm module project template
=====================================================

What?
-------------

This is a small example project or project template for npm modules that are supposed to work in Node.js and in the browser.

Why?
----

When writing JavaScript code that is ought to work in Node.js as well as in the browser, there are a couple of questions that need to be answered:
* How to write modular code
* How to make the code compatible with the different capabilities of both platforms
* How to make the code compatible with different module loaders (CommonJS, AMD, ...)
* How to write your tests only once but run them in Node.js and in the browser

As of now, this issues are not trivially solved. However, there are already quite a few approaches to tackle these problems. One option is to add some boilerplate code to each module to make it compatible with CommonJS and AMD (TODO link). Another approach is browserify. In the future, this problem might be solved by using the ES6 module format. Since this is not available and major browser support will not be there for quite some time, this is not relevant today.

The fact that there are various solutions to the problem doesn't make it easier. When starting out with the first cross platform npm module, the options at hand might seem confusing and getting everything set up is still way more complicated than it should be.

What Does This Project Template Offer?
--------------------------------------

This project template uses browserify to convert the CommonJS code to browser compatible code. It comes with a rather complete setup, including:
* A tiny example module with
    * custom dependencies and
    * a dependency on a node core module
* Mocha tests for the module to verify that the module works correctly in Node.js
* An HTML test runner to also run the same Mocha tests (browserified) in any browser
* A tiny express server to serve the static assets needed to run the Mocha tests in a browser
* A shell script to browserify the module and the tests _without_ Grunt
* Example HTML pages that demonstrate how to include the browserified module in other projects
    * by using a simple script tag
    * by requiring as a dependency with RequireJS
    * by requiring it as an external dependency from another browserified module
* A Gruntfile, that
    * lints the sources with JSHint
    * runs the Mocha tests via Node.js
    * browserifies the module and the tests
    * Starts the express server
    * Runs the same Mocha tests as before, this time in a PhantomJS browser via grunt-mocha-phantomjs, using the same HTML test harness that can be used to run the tests manually in any browser
    * Stops the test server when tests are finished

This infrastructure is a good starting point for writing cross platform (Node.js and browser) JavaScript code.

Remark: The Gruntfile uses grunt-browserify to browserify the module and the tests and it actually kicks off three browserify builds. For a small module like this, the turnaround time is still good enought. For a larger module, watchify might be a better (faster) alternative.

TODO
----

* Minifiy the browser builds with uglify JS and use this in the example and test HTML
* Integrate testling-ci
