'use strict'

var generators = require('yeoman-generator');
var Promise = require('bluebird');
var _ = require('lodash');
var utils = require('../utils');
var chalk = require('chalk');
var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Any options must be declared here
  },

  initializing: function () {
    this.log('Initializing...')
  },

  prompting: function () {
    // Ask the developer questions here

   var done = this.async();

   // Do something

   done();
  },

  configuring: function () {
    // Creates config file.
    this.config.save();
    this.config.set(this.answers);
  },

  writing: function () {
    this.log('Copying file, please wait.')

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.answers
      );

    var hiddenFiles = fs.readdirSync(this.templatePath());

    _.forEach(hiddenFiles, function (filename) {
      // Get the statObj for checking if it's a file
      var statObj = fs.statSync(this.templatePath(filename));

      // Return early if it's not a file
      if (!statObj.isFile()) { return; }

      // Copy over hidden files
      this.fs.copy(
        this.templatePath(filename),
        this.destinationPath(filename)
      );

      // Create an .env file as well
      // Cannot be added to repo as it's gitignored
      if (filename === '.env.example') {
        this.fs.copy(
          this.templatePath(filename),
          this.destinationPath('.env')
        );
      }
    }.bind(this));

  },

  install: function () {
    // TODO: Move these into separate file
    var dependencies = ['lodash', 'bluebird', 'body-parser', 'chalk', 'composable-middleware', 'express', 'jsonwebtoken', 'bcryptjs', 'moment', 'node-env-file'];
    var devDependencies = ['babel-core', 'babel-loader', 'babel-preset-es2015', 'css-loader', 'gulp', 'gulp-livereload', 'node-sass', 'raw-loader', 'sass-loader', 'shelljs', 'style-loader', 'webpack', 'webpack-livereload-plugin'];

    this.npmInstall(dependencies, { 'save': true });
    this.npmInstall(devDependencies, { 'saveDev': true });
  },

  end: function () {
    this.log('Project is all set up!');
  }
});
