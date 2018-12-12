#!/usr/bin/env node

const program = require('commander');
const image = require('../lib/images');
const container = require('../lib/container');

program
    .version('0.0.1')
    .parse(process.argv);

program
    .command('image')
    .alias('i')
    .description('Select for delete docker image')
    .action(function () {
        image();
    });

program
    .command('container')
    .alias('c')
    .description('Select for delete docker container')
    .action(function () {
        container();
    });

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    // e.g. display usage
    program.help();
}