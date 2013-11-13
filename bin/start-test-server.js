#!/usr/bin/env node

// Starts the server for the static assets

// You don't need to run this script when executing grunt because grunt starts
// the server itself.
var testServer = require('../server/app')
testServer.start()

