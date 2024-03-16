const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/AuthRouter');
const CorsService = require('./services/CorsService');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
CorsService.set(app);

app.use('/', authRouter);
app.use(errorMiddleware);

function start() {
    try {
        app.listen(PORT, () => console.log('Server start on ' + PORT + ' port'));
    } catch (error) {
        console.log('Error:' + error);
    }
}
start();