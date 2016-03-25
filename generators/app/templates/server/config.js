'use strict'

import env from 'node-env-file';
import path from 'path';
env(path.resolve(__dirname, '../.env'));

/**
 * Converts somewhat boolean values and strings such as 'false'.
 *
 * @param {Any} input
 * @return {Boolean}
 */
const parseBool = (input) => {
  if (typeof input === 'undefined') { return undefined; }
  if (typeof input === 'boolean') { return input; }
  if (typeof input === 'string') { return input != 'false'; }

  return !!input;
}

export default {
  port: process.env.PORT || 3000,
  ip: process.env.IP || 'localhost',
  app_secret: process.env.APP_SECRET || 'sssshhhh',
}
