'use strict'

import express from 'express';
import path from 'path';
import morgan from 'morgan';

const root = path.resolve();

/**
 * @param {Object} app Express instance
 * @param {Function} log To where morgan should log stuff
 */
export default (app, log) => {
  // Client side app
  app.use(express.static(root + '/public'));

  // Logging, should be below static stuff to only log API calls, and not assets
  app.use(morgan('combined', { stream: log }))

  // Do not remove this,
  // it's used for the Yo generator to find where to inject routes.
  /// Start injection ///
  app.use('/api/users', require('./api/user').default);
  /// Stop injection ///
}
