import express from 'express';
import morgan from 'morgan';
import fs, { readFileSync } from 'node:fs';

import { User } from './@types.js';
import { tourRouter } from './Routes/tourRoutes.js';
import { userRouter } from './Routes/userRouter.js';

const app = express();
const port = 3000;

// ----------------------------Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('this is a simple middleware');
  next();
});

// ----------------------------Tours Route

app.use('/api/v1/tours', tourRouter);

// ----------------------------User Route

app.use('/api/v1/users', userRouter);

// Listen
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
