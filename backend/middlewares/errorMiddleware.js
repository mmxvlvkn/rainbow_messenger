const ExceptionHandler = require('../exceptions/ExceptionHandler.js')
const ResService = require('../services/ResService.js');

module.exports = (err, req, res, next) => {
    if (err instanceof ExceptionHandler) {
        return ResService.create(res, err.status, {message: err.message})
    }

    return ResService.create(res, 500, {message: 'Внутренная ошибка сервера'});
};