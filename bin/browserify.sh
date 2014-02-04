#!/usr/bin/env bash

# This script is just provided to show how to invoke browserify without using
# Grunt. When using Grunt, everything is handled in Gruntfile.js and this script
# is not needed.

# Script to browserify without Grunt
# This script assumes that browserify is installed globally. If that is not the
# case, one could also use the command
# node_modules/browserify/bin/cmd.js or even
# node_modules/grunt-browserify/node_modules/browserify/bin/cmd.js
# instead of `browserify`

bin_path=`dirname $0`
pushd $bin_path/.. > /dev/null

# This browserify build be used by users of the module. It contains a
# UMD (universal module definition) and can be used via an AMD module
# loader like RequireJS or by simply placing a script tag in the page,
# which registers mymodule as a global var. You can see examples for both
# usages in browser/example/index.html (script tag) and
# browser/example/index-require.html (RequireJS).
browserify \
  --entry mymodule.js \
  --outfile browser/dist/mymodule.standalone.js \
  --standalone mymodule

# This browserify build can be required by other browserify modules that
# have been created with an --external parameter. See
# browser/test/index.html for an example.
browserify \
  --entry mymodule.js \
  --outfile browser/dist/mymodule.require.js \
  --require ./mymodule

# These are the browserified tests. We need to browserify the tests to be
# able to run the mocha tests while writing the tests as clean, simple
# CommonJS mocha tests (that is, without cross-platform boilerplate
# code). This build will also include the testing libs chai, sinon and
# sinon-chai but must not include the module under test.
browserify \
  --entry browser/test/suite.js \
  --outfile browser/test/browserified_tests.js \
  --external ./mymodule.js

popd > /dev/null
