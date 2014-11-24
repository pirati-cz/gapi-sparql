#!/usr/bin/env node

var gapi_sparql = require('../lib/gapi_sparql'),
    argv = require('yargs')
        .usage('Usage: $0')
        .alias('h', 'host')
        .alias('p', 'port')
        .alias('d', 'debug')
        .alias('m', 'mode')
        .argv;

function exit(message, exit_code) {
    if (!exit_code) { exit_code = 0; }
    if (!message) { message = 'bye...'; }
    console.log(message);
    process.exit(exit_code);
}

process.on('SIGINT', function () {
    exit("\nRecieved SIGINT. bye");
});
gapi_sparql.run(argv, exit);
