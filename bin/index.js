#!/usr/bin/env node

const program = require('commander');
const images = require('../lib/images');

program
    .version('0.0.1')
    .parse(process.argv);

program
    .command('images')
    .alias('i')
    .description('Select for delete docker images')
    .action(function () {
        images();
    });

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    // e.g. display usage
    program.help();
}