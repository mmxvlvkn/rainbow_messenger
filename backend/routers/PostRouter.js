import {Router} from 'express';
import postController from '../controllers/PostController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const postRouter = new Router();

postRouter.post('/create_post', authMiddleware, postController.createPost);

export default postRouter;