#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander'),
    Wrapper = require('../index.js'),
    wrapper,
    options = {};

program
  .version('0.0.5')
  .option('-p, --parser [parser]', "Parser. 'less' or 'stylus'")
  .option('-s, --selector [selector]', 'Your selector as prefix (e.g. .wrapper; #container')
  .option('-i, --input [filename]', 'Input file')
  .option('-o, --output [output_file]', 'Input file')
  .option('-c, --compress', 'Compress output file')
  .parse(process.argv);

if (program.parser) { options.parser = program.parser; }
if (program.selector) { options.selector = program.selector; }
if (program.output) { options.outputFile = program.output; }
if (program.input) { options.inputFile = program.input; }
if (program.compress) { options.compress = program.compress; }

try {
  wrapper = new Wrapper(options);
} catch (e) {
  console.log(e);
  process.exit(1);
}