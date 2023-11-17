import express from 'express';

import {login,signup,deleteAccount} from '../controllers/auth.js';

import logMid from '../middleware/logMiddleware.js';

const router = express.Router();

router.post('/login',logMid, login);
router.post('/signup',logMid, signup);
router.delete('/deleteAccount/:id',logMid, deleteAccount);

export default router;