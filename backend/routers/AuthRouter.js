import {Router} from 'express';
import authController from '../controllers/AuthController.js';
const authRouter = new Router();

authRouter.post('/reg', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/check_auth', authController.checkAuth);
authRouter.post('/refresh', authController.refresh);

export default authRouter;