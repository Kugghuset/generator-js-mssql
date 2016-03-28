'use strict'

var _ = require('lodash');
var Promise = require('bluebird');
var utils = require('../utils');

/**
 * Assigns the answers of _this to themselves plus whatever is in _answers
 * and returns _this.
 *
 * NOTE: This will mutate _this, as its prototypes must be usable.
 *
 * @param {Object} _this The yo object which often is used as this.[something]
 * @return {Object}
 */
function assignAnswers(_this, _answers) {
  return _.assign(_this, { answers: _.assign({}, _this.answers, _answers) });
}

/**
 * Returns a promise of _this where _this.answers also has a name attribute.
 *
 * @param {Object} _this The yo object which often is used as this.[something]
 * @return {Promise} -> {_this}
 */
function promptAppName(_this) {
  return new Promise(function (resolve, reject) {
    _this.prompt({
      type: 'input',
      name: 'name',
      message: 'What\'s the projet name?',
      // Defaults to current folder name
      default: _this.answers.name || _this.appname,
    }, function (answers) {
      // Resolve _this extended with *answers*
      resolve(assignAnswers(_this, answers));
    });
  });
}

/**
 * Returns a promise of _this where _this.answers also has an author attribute.
 *
 * @param {Object} _this The yo object which often is used as this.[something]
 * @return {Promise} -> {_this}
 */
function promptAuthor(_this) {
  return new Promise(function (resolve, reject) {
    _this.prompt({
      type: 'input',
      name: 'author',
      message: 'What\'s the name of the author?',
      // Defaults to current folder name
      default: _this.answers.author || 'Arthur Dent',
    }, function (answers) {
      // Resolve _this extended with *answers*
      resolve(assignAnswers(_this, answers));
    });
  });
}

/**
 * Returns a promise of _this where _this.answers also has a description attribute.
 *
 * @param {Object} _this The yo object which often is used as this.[something]
 * @return {Promise} -> {_this}
 */
function promptDescription(_this) {
  return new Promise(function (resolve, reject) {
    _this.prompt({
      type: 'input',
      name: 'description',
      message: 'What\'s the projet about?',
      // Defaults to current folder name
      default: _this.answers.description || 'A project using es2015 and mssql.',
    }, function (answers) {
      // Resolve _this extended with *answers*
      resolve(assignAnswers(_this, answers));
    });
  });
}

/**
 * Prompts the user for the git repo and cleans the resulting.
 *
 * @param {Object} yo - yo instance, from generators.(Named)Base.extend used as *this*
 * @return {Promise} -> *yo* - to be chainable
 */
function promptGitUrl(_this) {
  return new Promise(function (resolve, reject) {

    _this.prompt({
      type: 'input',
      name: 'git',
      message: 'Where\'s the Git repo located?'
    }, function (answers) {
      if (answers.git) { answers.git = utils.normalizeGit(answers.git); }

      resolve(assignAnswers(_this, answers));
    });
  });
};

/**
 * Returns a promise of _this where _this.answers also has a description attribute.
 *
 * @param {Object} _this The yo object which often is used as this.[something]
 * @return {Promise} -> {_this}
 */
function promptLicense(_this) {
  return new Promise(function (resolve, reject) {
    _this.prompt({
      type: 'input',
      name: 'license',
      message: 'What\'s the projet about?',
      // Defaults to current folder name
      default: _this.answers.license || 'ISC',
    }, function (answers) {
      // Resolve _this extended with *answers*
      resolve(assignAnswers(_this, answers));
    });
  });
}

/**
 * Returns a promise of the answers from all questions.
 *
 * Questions which will be asked:
 * - App name
 * - Author
 * - Description
 * - Git URL
 *
 * @param {Object} _this The yo object which often is used as this.[something]
 * @return {Promise} -> {Object}
 */
module.exports = function (_this) {
  return new Promise(function (resolve, reject) {
    promptAppName(_this)
    .then(promptAuthor)
    .then(promptDescription)
    .then(promptGitUrl)
    .then(promptLicense)
    .then(function (__this) { resolve(__this.answers); })
    .catch(reject);
  });
}
