import express from 'express';

import {getPosts,createPost,getPostsBySearch,updatePost,deletePost,getPost} from '../controllers/posts.js';

import auth from '../middleware/auth.js';
import logMid from '../middleware/logMiddleware.js';

const router = express.Router();

router.get('/',logMid, getPosts);
router.get('/search',logMid,getPostsBySearch); 
router.get('/:id',logMid, getPost);

//need authentication
router.post('/',auth,logMid,createPost);
router.patch('/:id',auth,logMid,updatePost); // dynamic id
router.delete('/:id',auth,logMid,deletePost);

export default router;