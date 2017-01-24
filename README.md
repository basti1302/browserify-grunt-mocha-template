Cross platform JavaScript npm module project template
=====================================================

[![Build Status](https://travis-ci.org/basti1302/browserify-grunt-mocha-template.png?branch=master)](https://travis-ci.org/basti1302/browserify-grunt-mocha-template)
[![Dependency Status](https://david-dm.org/basti1302/browserify-grunt-mocha-template.png)](https://david-dm.org/basti1302/browserify-grunt-mocha-template)

[![browser support](http://ci.testling.com/basti1302/browserify-grunt-mocha-template.png)](http://ci.testling.com/basti1302/browserify-grunt-mocha-template)

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

As of now, this issues are not trivially solved. However, there are already quite a few approaches to tackle these problems. One option is to add some [boilerplate code](http://www.2ality.com/2011/11/module-gap.html) to each module to make it compatible with CommonJS and AMD. [amdefine](https://github.com/jrburke/amdefine) works in a similar fashion. Another approach is [browserify](http://browserify.org/). In the future, this problem might be solved by the module system that comes with [Harmony/ES6](http://wiki.ecmascript.org/doku.php?id=harmony:modules). Since ES6 is not there yet and major browser support will not be available for quite some time, this is not relevant today (or maybe it is, with the help of [this transpiler](http://square.github.io/es6-module-transpiler/)).

The fact that there are various solutions to the problem doesn't make it easier. When starting out with your first cross platform npm module, the options at hand might seem confusing and getting everything set up is still way more complicated than it should be.

What Does This Project Template Offer?
--------------------------------------

This project template uses browserify to convert the CommonJS code to browser compatible code. It comes with a rather complete setup, including:
* A tiny example module with
    * a dependency on a module from npm (`minimatch`, but the choice was arbitrary, it's just an example),
    * a dependency on a node core modul (`util`, in this case),
    * inter-module dependencies (relative requires)
    * a package.json file that shows how to shim dependencies for browserify via the `browser` property (making browserify use substitutes instead of the original node dependencies)
* [Mocha](http://mochajs.org/) tests for the module to verify that the module works correctly in Node.js
* An HTML test runner to also run the same Mocha tests (browserified) in any browser
* A shell script to browserify the module and the tests _without_ Grunt
* Example HTML pages that demonstrate how to include the browserified module in other projects
    * by using a simple script tag
    * by requiring as a dependency with RequireJS
    * by requiring it as an external dependency from another browserified module
* A [Grunt](http://gruntjs.com/)file, that
    * lints the sources with [JSHint](http://www.jshint.com/),
    * runs the Mocha tests via Node.js,
    * browserifies the module and the tests,
    * starts a server via [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) to serve the static assets (test runner html, browserified code) to the browser,
    * runs the same Mocha tests as before, this time in a [PhantomJS](http://phantomjs.org/) browser via [grunt-mocha-phantomjs](https://github.com/jdcataldo/grunt-mocha-phantomjs), using the same HTML test harness that can be used to run the tests manually in any browser

This infrastructure is a good starting point for writing cross platform (Node.js and browser) JavaScript code.

Remark: The Gruntfile uses grunt-browserify to browserify the module and the tests and it actually kicks off three browserify builds. For a small module like this, the turnaround time is still good enought. For a larger module, watchify might be a better (faster) alternative.

License
-------

MIT
