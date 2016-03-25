'use strict'

import express from 'express';
import path from 'path';

const root = path.resolve();

export default (app) => {
  // Client side app
  app.use(express.static(root + '/public'));

  // Server side app
}
