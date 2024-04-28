import ExceptionHandler from '../exceptions/ExceptionHandler.js';
import TokenService from '../services/TokenService.js';

export default (req, res, next) => {
    try {
        console.log()
        const token = req.headers.authorization;
        TokenService.validateAccessToken(token.split(' ')[1]);
        next();
    } catch (error) {
        next(ExceptionHandler.UnauthorizedError());
    }
}