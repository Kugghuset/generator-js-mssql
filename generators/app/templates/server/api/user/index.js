'use strict'

import express from 'express';
import controller from './user.controller';
import auth from '../../services/auth';

const router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:_id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:_id', auth.isAuthenticated(), controller.update);
router.delete('/:_id', auth.isAuthenticated(), controller.remove);

export default router;
