const Router = require('express');
const regRouter = new Router();
import authController from '../controllers/AuthController';

regRouter.post('/reg', authController.registration);
regRouter.post('/login', authController.login);
regRouter.get('/check_auth', authController.checkAuth);
regRouter.post('/refresh', authController.refresh);

module.exports = regRouter;