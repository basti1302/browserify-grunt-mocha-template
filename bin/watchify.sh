#!/usr/bin/env bash

# This script assumes that watchify is installed globally. To do that execute
# npm install -g watchify

# Three watchify processes are started in the background. Use
# pkill -f watchify or pkill -f "node.*watchify"
# to stop them.

bin_path=`dirname $0`
pushd $bin_path/.. > /dev/null

watchify \
  --entry mymodule.js \
  --outfile browser/dist/mymodule.standalone.js \
  --standalone mymodule \
  --verbose \
  &

watchify \
  --entry mymodule.js \
  --outfile browser/dist/mymodule.require.js \
  --require ./mymodule \
  --verbose \
  &

watchify \
  --entry browser/test/suite.js \
  --outfile browser/test/browserified_tests.js \
  --external ./mymodule.js \
  --verbose \
  &

popd > /dev/null
