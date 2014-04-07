#!/usr/bin/env bash

# Starts the server for the static assets
#
# You don't need to run this script when executing grunt because grunt starts
# the server itself.

bin_path=`dirname $0`
pushd $bin_path/.. > /dev/null
grunt connect:keepalive
popd > /dev/null
