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
  .then((<%= name %>s) => utils.objectify(<%= name %>s[0]))
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
export const createMany = (<%= name %>s) => new Promise((resolve, reject) => {
  // Create a name for the temp table as a GUID
  let _tableName = '<%= nameCapitalized %>';

  // Create the temp table
  let _table = new mssql.Table(_tableName);

  // Get the column definitions for the table, execpt for the IDS
  let _columns = utils.parseSQLCreateTable(sql.fromFile('./sql/<%= name %>.initialize.sql'), ['isDisabled', 'dateUpdated', 'dateCreated']);

  // Set table creation to true, to ensure the table is created if it doesn't exist,
  // which it shouldn't do
  _table.create = true;

  // Add all columns to the table
  _.forEach(_columns, (col, i) => {
    _table.columns.add(col.name, col.type, _.omit(col, ['name', 'type']));
  });

  // Add all rows
  _.forEach(<%= name %>s, (<%= name %>) => {
    // Get all parameters from the <%= name %> in the order of the column names
    let _data = _.map(_columns, (col) => <%= name %>[col.name]);

    // Add all rows
    _table.rows.add(..._data);
  });

  // Create a request instace and make the bulk operation
  new mssql.Connection(config.db).connect()
  .then((connection) => {
    // Get the current request
    let _request = new mssql.Request(connection);

    return _request.bulk(_table);
  })
  .then((rowCount) => {
    // Query the DB and return the latest inserts
    return sql.execute({
      query: sql.fromFile('./sql/<%= name %>.find.sql')
        .replace('SELECT', `SELECT TOP ${rowCount}`)
        + 'ORDER BY [<%= name %>Id] DESC'
    });
  })
  // Objectify, reverse and resolve the data
  .then((<%= name %>s) => resolve(utils.objectify(<%= name %>s).reverse()))
  .catch(reject);
});

export default {
  initialize: initialize,
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
  createMany: createMany
}
