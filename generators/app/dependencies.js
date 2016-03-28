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
    'body-parser',
    'chalk',
    'composable-middleware',
    'express',
    'jsonwebtoken',
    'bcryptjs',
    'moment',
    'node-env-file',
    'jquery',
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
    'normalize.css',
    'milligram',
  ]
}
