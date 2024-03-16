require('dotenv').config();
const passSalt = process.env.passSalt;
const bcrypt = require('bcrypt');
const ValidationService = require('../services/ValidationService.js');
const ResService = require('../services/ResService.js');
const BDService = require('../services/BDService.js');
const TokenService = require('../services/TokenService.js');
const ExceptionHandler = require('../exceptions/ExceptionHandler.js')


class regController {
    constructor() {
        //this.sendEmailCode = this.sendEmailCode.bind(this);
    }

    async registration(req, res, next) {
        try {
            const userData = req.body

            // Проверяем валидность данных
            const validInfo = ValidationService.regValidation(userData)
            if (!validInfo.status) {
                console.log('Invalid registration data');
                throw ExceptionHandler.BadRequest(validInfo.errorMessage);
            }
            
            // Сравниваем код регистрации
            const DBCode = await BDService.getCode();
            if (!DBCode.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }
            if (userData.code !== DBCode.data) {
                throw ExceptionHandler.BadRequest('Неверный код');
            }

            // Проверяем пользователя на уникальность
            const userExistence = await BDService.checkUserExistence(userData.email, userData.nick);
            if (!userExistence.status) {
                throw ExceptionHandler.BadRequest(userExistence.message);
            }

            //Создаем нового пользователя
            const newUserData = await BDService.createUser(
                userData.email,
                userData.nick,
                await bcrypt.hash(userData.pass, Number(passSalt)),
                'user'
            );
            if (!newUserData.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            //Создаем и отправляем токены
            return await TokenService.pushTokens(res, userData.nick)
        } catch (error) {
            console.log('Registration error: ' + error.message);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const userData = req.body

            // Проверяем валидность данных
            const validInfo = ValidationService.loginValidation(userData)
            if (!validInfo.status) {
                console.log('Invalid login data');
                throw ExceptionHandler.BadRequest(validInfo.errorMessage);
            }

            // Получаем пользователя из бд
            let bdUserData = (await BDService.getUserByNick(userData.nick));

            if (!bdUserData.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            if (!bdUserData.data.length) {
                throw ExceptionHandler.BadRequest('Такого пользователя не существует');
            }

            bdUserData = bdUserData.data[0];

            // Проверяем пароль
            const isPassEquals = await bcrypt.compare(userData.pass, bdUserData.pass);

            if (!isPassEquals) {
                throw ExceptionHandler.BadRequest('Пароли не совпадают');
            }

            return await TokenService.pushTokens(res, userData.nick)
        } catch (error) {
            console.log('Login error: ' + error.message);
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const userData = req.body;
            let {refreshToken} = req.cookies;
            if (!refreshToken) {
                throw ExceptionHandler.UnauthorizedError();
            }

            // Проверяем токен
            const tokenData = TokenService.validateRefreshToken(refreshToken);

            // Получаем id пользователя из бд
            let bdUserData = (await BDService.getUserIdByToken(refreshToken));
            if (!bdUserData.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            // Удаляем токен из бд
            if (!(await BDService.deleteToken(refreshToken)).status) throw ExceptionHandler.UnauthorizedError();

            // Проверяем соотстветствие пользователя
            if (tokenData.id !== bdUserData.data.person_id) {
                throw ExceptionHandler.UnauthorizedError();
            }

            return await TokenService.pushTokens(res, tokenData.nick);
        } catch (error) {
            console.log('Refresh token error: ' + error.message);
            next(error);
        }
    }
    async checkAuth(req, res, next) {
        try {
            const token = req.headers.authorization;
            TokenService.validateAccessToken(token.split(' ')[1]);
            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            next(error);
        }
    }
}

export default new regController();
