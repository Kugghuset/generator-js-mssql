'use strict'

module.exports = {
  global: [
    'gulp',
    'webpack',
    {name: 'babel-cli', command: 'babel'},
  ],
  prod: [
    'lodash',
    'bluebird',
    'seriate',
    'body-parser',
    'chalk',
    'composable-middleware',
    'express',
    'jsonwebtoken',
    'bcryptjs',
    'moment',
    'node-env-file',
    'jquery',
    'dataobject-parser',
    'winston',
    'morgan',
    'normalize.css',
    'milligram',
  ],
  dev: [
    'babel-core',
    'babel-loader',
    'babel-preset-es2015',
    'css-loader',
    'gulp',
    'gulp-livereload',
    'node-sass',
    'raw-loader',
    'sass-loader',
    'shelljs',
    'style-loader',
    'webpack',
    'webpack-livereload-plugin',
  ]
}
