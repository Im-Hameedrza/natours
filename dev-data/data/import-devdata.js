import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({
  path: fileURLToPath(new URL('../../config.env', import.meta.url)),
});
import { ToursModel } from '../../src/models/tourModels.ts';
import { readFileSync } from 'node:fs';

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

// Read Json
const tours = JSON.parse(
  readFileSync(new URL('./tours-simple.json', import.meta.url), 'utf-8'),
);

// Import data to database

const importData = async () => {
  try {
    await ToursModel.create(tours);
    console.log('data loaded sucessfully');
  } catch (error) {
    console.log(error);
  }
};

await importData();
