const cors = require('cors')
const siteHost = process.env.siteHost;
const ExceptionHandler = require('../exceptions/ExceptionHandler.js')

class ResService {
    create(res, status, data) {
        try {
            res.status(status);
            return res.json(data);
        } catch (err) {
            console.log('Create res error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }
}

module.exports = new ResService();