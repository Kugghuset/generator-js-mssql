'use strict'

import _ from 'lodash';
import sql from 'seriate';
import mssql from 'mssql';
import moment from 'moment';
import Promise from 'bluebird';

import utils from '../../utils/utils';
import config from '../../config';

/**
 * Returns a params object for *<%= name %>*.
 *
 * @param {Object} <%= name %> <%= nameCapitalized %> object
 * @return {Object}
 */
const getParams = (<%= name %> = {}) => {
  return {
    <%= name %>Id: {
      type: sql.BigInt,
      val: <%= name %>.<%= name %>Id,
    },
    description: {
      type: sql.VarChar(255),
      val: <%= name %>.description,
    },
  };
};

/**
 * Initializes the <%= name %> table.
 *
 * @param {Booelan} logSuccess Defaults to false
 * @return {Promise}
 */
export const initialize = (logSuccess = false) => new Promise((resolve, reject) => {
  // Execute the query
  sql.execute({
    query: sql.fromFile('./sql/<%= name %>.initialize.sql')
  })
  .then((res) => {
    if (logSuccess) {
      utils.log('<%= nameCapitalized %> table initialized.');
    }
    resolve(res);
  })
  .catch((err) => {
    utils.log('Could not initialize <%= name %> table:');
    utils.log(err);
    reject(err);
  });
});

/**
 * Returns a promise of the *top* number of <%= name %>s at page *page*.
 *
 * @param {Number} __top The top number of <%= name %>s to get, optional
 * @param {Number} __page The page number at which to get *top* number of <%= name %>s, optional
 * @return {Promise} -> {Object}
 */
export const find = (__top, __page) => new Promise((resolve, reject) => {
  // Get the top and offset if any
  let {top, offset} = utils.paginate(__top, __page);

  // No pagination will be used if *top* is undefined.
  let _query = _.isUndefined(top)
    ? sql.fromFile('./sql/<%= name %>.find.sql')
    : utils.paginateQuery(sql.fromFile('./sql/<%= name %>.find.sql'), 'FROM [dbo].[<%= nameCapitalized %>]', top, offset);

  // Execute the query
  sql.execute({
    query: _query
  })
  .then((<%= name %>s) => resolve(utils.objectify(<%= name %>s)))
  .catch(reject);
});

/**
 * Returns a promise of the <%= name %>s at *<%= name %>Id*.
 *
 * @param {Number} <%= name %>Id The ID of the <%= name %>
 * @return {Promise} -> {Object}
 */
export const findById = (<%= name %>Id) => new Promise((resolve, reject) => {
  // Execute the query and then objectify it if needed.
  sql.execute({
    query: sql.fromFile('./sql/<%= name %>.findById.sql'),
    params: {
      <%= name %>Id: {
        type: sql.BigInt,
        val: <%= name %>Id
      }
    }
  })
  .then((<%= name %>s) => {
    // Resolve the <%= name %>
    resolve(utils.objectify(<%= name %>s[0]));
  })
  .catch(reject);
});

/**
 * Creates a <%= name %> and returns it.
 *
 * @param {Object} <%= name %> <%= nameCapitalized %> to create
 * @return {Promise} -> {Object}
 */
export const create = (<%= name %>) => new Promise((resolve, reject) => {
  let _params = getParams(<%= name %>);

  sql.execute({
    query: sql.fromFile('./sql/<%= name %>.create.sql'),
    params: _params,
  })
  .then((<%= name %>s) => resolve(utils.objectify(<%= name %>s[0])))
  .catch(reject)
});

/**
 * @param {Number} <%= name %>Id The ID of the <%= name %>
 * @param {Object} <%= name %> The <%= name %> values to update with
 * @return {Promise} -> {Object}
 */
export const update = (<%= name %>Id, <%= name %>) => new Promise((resolve, reject) => {
  // Get the params
  let _params = getParams(_.assign({}, <%= name %>, { <%= name %>Id: <%= name %>Id }));

  sql.execute({
    query: sql.fromFile('./sql/<%= name %>.update.sql'),
    params: _params,
  })
  .then((<%= name %>s) => resolve(utils.objectify(<%= name %>s[0])))
  .catch(reject)
});

/**
 * Disables the <%= name %> and returns a promise of the void that is the <%= name %>.
 *
 * @param {Number} <%= name %>Id
 * @return {Promise} -> {Object}
 */
export const remove = (<%= name %>Id) => new Promise((resolve, reject) => {
  sql.execute({
    query: sql.fromFile('./sql/<%= name %>.disable.sql'),
    params: {
      <%= name %>Id: {
        type: sql.BigInt,
        val: <%= name %>Id
      }
    }
  })
  .then(resolve)
  .catch(reject);
});

/**
 * Inserts many <%= name %>s into the DB.
 *
 * @param {Array} <%= name %>s Array of <%= name %>s to insert into the DB
 * @return {Promise} -> {Array} Array of the recently inserted <%= name %>s
 */
export const createMany = (<%= name %>s) => utils.createManySQL(<%= name %>s, '<%= nameCapitalized %>', __dirname, '<%= name %>');

export default {
  initialize: initialize,
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
  createMany: createMany
}
