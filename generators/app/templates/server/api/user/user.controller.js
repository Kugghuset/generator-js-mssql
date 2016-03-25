'use strict'

import User from './user.db';
import config from '../../config';
import utils from '../../utils/utils';

/**
 * Route: GET '/api/users/'
 */
export const index = (req, res) => {
  // Get the top and page for pagination
  let {top, page} = req.query;

  User.find(top, page)
  .then(res.status(200).json)
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: GET '/api/users/:_id'
 */
export const show = (req, res) => {
  // Get the _id
  let {_id} = req.params;

  User.findById(_id)
  .then(res.status(200).json)
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: POST '/api/users/'
 */
export const create = (req, res) => {
  // Get the user
  let _user = req.body;

  User.create(_user)
  .then(res.status(200).json)
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: PUT '/api/users/:_id'
 */
export const update = (req, res) => {
  // Get the _id and user
  let {_id} = req.params;
  let _user = req.body;

  User.update(_id, _user)
  .then(res.status(200).json)
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: DELETE '/api/users/:_id'
 */
export const remove = (req, res) => {
  // Get the _id
  let {_id} = req.params;

  User.remove(_id)
  .then(() => res.status(201).send('No Content'))
  .catch((err) => utils.handleError(res, err));
}

export default {
  index: index,
  show: show,
  create: create,
  update: update,
  remove: remove,
}
