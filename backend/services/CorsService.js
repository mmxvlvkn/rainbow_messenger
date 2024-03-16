const cors = require('cors')
const siteHost = process.env.siteHost;

class CorsService {
    set(app) {
        try {
            app.use(cors(this.corsOptions));
            app.options('*', cors(this.corsOptions));
        } catch (err) {
            console.log('Set cors error: ' + err);
            throw new Error(err);
        }
    }

    corsOptions = {
        "origin": siteHost,
        "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
        "credentials": true,
        "allowedHeaders": "Content-Type, Authorization",
    }
}

module.exports = new CorsService();