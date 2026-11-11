import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
  path: new URL('../config.env', import.meta.url),
});
import { app } from './app.js';

const database = process.env.DATABASE;
const password = process.env.DATABASE_PASSWORD;

if (!database || !password) {
  throw new Error('Database credentials are missing');
}

const DB = database.replace('<PASSWORD>', encodeURIComponent(password));

try {
  await mongoose.connect(DB);

  console.log('Database connected successfully!');
} catch (error) {
  console.error('Database connection failed:', error);
}

// Listen
const port = Number(process.env.port) || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
