#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander'),
		Wrapper = require('../index.js'),
		wrapper = undefined,
		options = {};

program
	.version('0.0.1')
	.option('-i, --input [input_file]', 'Input file')
	.option('-o, --output [output_file]', 'Input file')
	.option('-c, --compress', 'Compress output file')
	.parse(process.argv);


if (program.output) { options.outputFile = program.output; }
if (program.input) { options.inputFile = program.input; }
if (program.compress) { options.compress = program.compress; }

try {
	wrapper = new Wrapper(options);
}catch(e){
	console.log(e);
	process.exit(1);
}