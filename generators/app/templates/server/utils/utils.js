'use strict'

import _ from 'lodash';
import DataObjectParser from 'dataobject-parser';

import _http from './utils.http';
import _logger from './utils.logger';

export const http = _http;
export const logger = _logger;

/**
 * Logs something via the logging tool.
 *
 * @param {Any} message
 */
export const log = (message) => logger.info;

/**
 * Calls sends a response to the user of 500: Internal Error
 * and logs the actual error.
 *
 * @param {Object} res Express response object
 * @param {Error} err The error
 */
export const handleError = (res, err) => {
  console.log(err);
  res.status(500).send('Internal error');
}

/**
 * Escapes characters which need escaping in a RegExp.
 * This allows for passing in any string into a RegExp constructor
 * and have it seen as literal
 *
 * @param {String} text
 * @return {String}
 */
export const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s\/]/g, "\\$&");
};

/**
 * Returns an escaped RegExp object as the literal string *text*.
 * Flags are optional, but can be provided.
 *
 * @param {String} text
 * @param {String} flags - optional
 * @return {Object} - RegExp object
 */
export const literalRegExp = (text, flags) => {
  return new RegExp(escapeRegex(text), flags);
}

/**
 * Returns a new object where property names
 * with dots are converted into nested objects and arrays.
 *
 * Example: { 'prop.sub': 'value' } -> { prop: { sub: value } }
 *
 * @param {Array|Object} sqlArray
 * @return {Array|Object}
 */
export const objectify = (sqlArray) => {
  // Ensure it's an array
  let _isObj;
  if (!_.isArray(sqlArray)) {
    sqlArray = [ sqlArray ];
    _isObj = true;
  }

  let _arr = _.map(sqlArray, (sqlObj) => {
    let _data = new DataObjectParser();

    // Get all values
    _.map(sqlObj, (value, key) => {
      _data.set(key, value);
    });

    return _data.data();
  });

  return _isObj ? _.first(_arr) : _arr;
}

/**
 * Returns an object or array of the top and offset values
 * used for paginating in SQL server.
 *
 * @param {Number} top The number of items to get
 * @param {Number} page The page at which to get items from
 * @param {Boolean} asArray If true, return is an array, defaults to false
 * @return {Object|Array} { top: Number, offset: Number } | [ *top*, *offset* ]
 */
export const paginate = (top, page, asArray = false) => {
  // Get the page number, don't allow negative pages
  let _page = page < 1 ? 1 : page;

  // Get the offset for the page
  let _offset = (_page - 1) * top;

  // Set _offset to undefined if top is undefined,
  // as the assumptions is no pagination was meant to happen.
  if (_.isUndefined(top)) {
    _offset = undefined;
  }

  // Return the object
  return !!asArray
    ? [top, _offset]
    : { top: top, offset: _offset };
}

/**
 * Returns the query which is paginated based on *query* and *attachTo*
 *
 * @param {String} query The query to paginate
 * @param {String} attachTo The string to match after which the pagination will be attached
 * @param {Number} top The number of items to get
 * @param {Number} page The page at which to get items from
 * @return {String}
 */
export const paginateQuery = (query, attachTo, top, offset) => {
  // Get the pagination strings
  let _pagination  = `${attachTo} OFFSET ${offset} ROWS FETCH NEXT ${top} ONLY`;

  // Combine the query with *_pagination*
  return query.replace(literalRegExp(attachTo, 'i'), _pagination);
}

export default {
  http: http,
  logger: logger,
  log: log,
  handleError: handleError,
  escapeRegex: escapeRegex,
  literalRegExp: literalRegExp,
  objectify: objectify,
  paginate: paginate,
  paginateQuery: paginateQuery,
}
