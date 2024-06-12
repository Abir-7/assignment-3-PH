import express, { Application } from 'express';
import cors from 'cors';
import router from './app/router';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/Middleware/globalErrorHandler';
import notFound from './app/Middleware/notfound';
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
