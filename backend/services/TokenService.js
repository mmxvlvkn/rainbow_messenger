import jwt from 'jsonwebtoken';
import BDService from '../services/BDService.js';
import ResService from '../services/ResService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js';

export default class TokenService {
    constructor() {
        this.generateTokens = this.generateTokens.bind(this);
        this.generateAccessToken = this.generateAccessToken.bind(this);
    }

    static generateAccessToken(payload) {
        try {
            return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
        } catch (err) {
            console.log('Generate access token error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }

    static generateTokens(payload) {
        try {
            const accessToken = this.generateAccessToken(payload);
            if (!accessToken) {
                throw ExceptionHandler.InternalServerError();
            }

            return {
                accessToken,
                refreshToken: jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '60d'}),
            }
        } catch (err) {
            console.log('Generate tokens error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }

    static async pushTokens(res, nick, id = -1) {
        try {
            if (id === -1) {
                const idData = await BDService.getUserIdByNick(nick);
                if (!idData.status) throw ExceptionHandler.InternalServerError();
                id = idData.data;
            }

            const tokens = this.generateTokens({
                id,
                nick
            });

            if (!(await BDService.saveToken(id, tokens.refreshToken)).status) throw ExceptionHandler.InternalServerError();

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 2 * 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return ResService.create(res, 200, {accessToken: tokens.accessToken, message: 'ОК'});
        } catch (err) {
            console.log('Push tokens error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }
    static validateRefreshToken(token) {
        try {
            try {
                return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
            } catch {
                throw ExceptionHandler.UnauthorizedError();   
            }
        } catch(err) {
            //console.log('Validate refresh token error');
            throw err || ExceptionHandler.InternalServerError();
        }
    }
    static validateAccessToken(token) {
        try {
            try {
                return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            } catch {
                throw ExceptionHandler.UnauthorizedError();   
            }
        } catch(err) {
            //console.log('Validate access token error');
            throw err || ExceptionHandler.InternalServerError();
        }
    }
}