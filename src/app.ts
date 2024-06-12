import express from 'express';
import cors from 'cors';
import router from './app/router';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
