#!/usr/bin/env bash

bin_path=`dirname $0`
pushd $bin_path/.. > /dev/null

watchify --entry mymodule.js --outfile browser/dist/mymodule.standalone.js --standalone mymodule

popd > /dev/null
