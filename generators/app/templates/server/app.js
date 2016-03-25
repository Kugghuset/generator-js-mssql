'use strict'

import express from 'express';
import * as bodyParser from 'body-parser';

import config from './config';

const app = express();

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import routes from './routes';
routes(app);

// Initialize the server
const server = app.listen(config.port, config.ip, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening on %s on port %s', host, port);
});
