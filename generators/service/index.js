'use strict'

var generators = require('yeoman-generator');
var Promise = require('bluebird');
var _ = require('lodash');
var chalk = require('chalk');
var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

var utils = require('../utils');
var prompt = require('./service.prompt');

module.exports = generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Setup answers from config file
    this.answers = this.config.getAll();

    // Get the route name if defined
    this.name = (!!arguments[0] ? arguments[0][0] : undefined);
  },

  initializing: function () {
    this.log('Preparing to create a new service.');
  },

  prompting: function () {
    // This function will await user input,
    // and must therefor be async.
    var done = this.async();

    prompt(this)
    .then(function (_answers) {
      this.name = utils.camelCase((_answers || {}).name);

      // Call the done callback
      done();
    }.bind(this))
    .catch(function (err) {
      console.log(err);
    });
  },

  configuring: function () {
    // Update the config file.
    this.config.save();
    this.config.set(this.answers);
  },

  writing: function () {
    // Name is required
    if (!this.name) {
      return this.log(
        '\n' + chalk.yellow('No name given.') + '\n\n' +
        chalk.red('You must enter a name for the route to be created!') +
        '\n'
      );
    }
    // Get the name for capitalization
    var nameCapitalized = utils.pascalCase(this.name);

    // Get the options to copy files with.
    var _options = _.assign({}, this.answers, { name: this.name, nameCapitalized: nameCapitalized });

    // Copy the files
    utils.copyTemplateFiles(this, 'server/services', _options);

    // Update the routes.js file
    utils.injectText(
      this,
      'app.use(\'/services/{name}\', require(\'./services/{name}\').default);'.replace(/\{name\}/gi, this.name),
      this.destinationPath('server/routes.js'),
      utils.injectRegex('/// Start inject services ///', '/// Stop inject services ///', 'i')
    );
  },

  end: function () {
    console.log('\nService created!\n');
  }
});
