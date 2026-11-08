import dotenv from 'dotenv';
dotenv.config({
  path: new URL('../config.env', import.meta.url),
});
import { app } from './app.js';

// console.log(process.env);

// Listen
const port = Number(process.env.port) || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
