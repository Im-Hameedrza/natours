import express from 'express';
import morgan from 'morgan';

import { tourRouter } from './Routes/tourRoutes.js';
import { userRouter } from './Routes/userRouter.js';
import dotenv from 'dotenv';
dotenv.config({
  path: new URL('../config.env', import.meta.url),
});

const app = express();
app.set('query parser', 'extended');
// ----------------------------Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
console.log(process.env.NODE_ENV);

// ----------------------------Tours Route

app.use('/api/v1/tours', tourRouter);

// ----------------------------User Route

app.use('/api/v1/users', userRouter);

export { app };
