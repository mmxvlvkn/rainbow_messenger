import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routers/AuthRouter.js';
import postRouter from './routers/PostRouter.js';
import CorsService from './services/CorsService.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
CorsService.set(app);

app.use('/', authRouter);
app.use('/', postRouter);
app.use(errorMiddleware);

function start() {
    try {
        app.listen(PORT, () => console.log('Server start on ' + PORT + ' port'));
    } catch (error) {
        console.log('Error:' + error);
    }
}
start();