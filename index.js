var less = require('less'),
    stylus = require('stylus'),
    utils = require('./utils.js'),
    fs = require('fs'),
    parser = new (less.Parser);


var Wrapper = function (options) {
  var stack = new utils.Stack(),
      tmpOptions = {};

  this.options = {compress: false};
  utils.append(options, this.options);

  stack.push(this.readFile);
  stack.push(this.addPrefixAndSuffix);
  stack.push(this.parse);
  if ('outputFile' in this.options) {
    stack.push(this.saveResults);
  } else {
    stack.push(this.printResults);
  }
  stack.run(this, tmpOptions);
};

Wrapper.prototype = {

  readFile: function (next, $) {
    if ('inputFile' in this.options) {
      fs.readFile(this.options.inputFile, 'utf-8', function (err, data) {
        if (err) {
          throw (err.message);
        } else {
          $.data = data;
          next();
        }
      });
    } else {
      throw ("You must specify input filename!");
    }

  },

  addPrefixAndSuffix: function (next, $) {
    if ('selector' in this.options) {
      if ('data' in $) {
        $.data = this.options.selector + ' {' + $.data + '}';
        next();
      }
    } else {
      throw ("You must specify a selector");
    }

  },

  parse: function (next, $) {
    var options = this.options;
    if (this.options.parser === 'less') {
      parser.parse($.data, function (err, data) {
        if (err) {
          throw (err.message);
        }
        $.data = data.toCSS({compress: options.compress});
        next();
      });
    } else if (this.options.parser === 'stylus') {
      stylus($.data).render(function (err, data) {
        if (err) {
          throw (err.message);
        }
        $.data = data;
        next();
      });
    } else if (!('parser' in this.options)) {
      throw ("You must specify a parser");
    } else {
      throw (self.options.parser + ' is not a valid parser.');
    }
  },

  printResults: function (next, $) {
    console.log($.data);
  },

  saveResults: function (next, $) {
    fs.writeFile(this.options.outputFile, $.data, function (err) {
      if (err) {
        throw (err.message);
      }
    });
  }

};


// var w = new Wrapper({
//   inputFile: './testcss.css',
//   outputFile: './testout.css',
//   compress: true,
//   selector: '#main'
// });

module.exports = Wrapper;
