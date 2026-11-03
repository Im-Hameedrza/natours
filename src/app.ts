import express from 'express';
import { log } from 'node:console';
import fs, { readFileSync, writeFile } from 'node:fs';

type Coordinates = [number, number];

type StartLocation = {
  description: string;
  type: 'Point';
  coordinates: Coordinates;
  address: string;
};

type Location = {
  _id: string;
  description: string;
  type: 'Point';
  coordinates: Coordinates;
  day: number;
};

type Tour = {
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  price: number;
  summary: string;
  description: string;
  imageCover: string;

  ratingsAverage: number;
  ratingsQuantity: number;

  images: string[];
  startDates: string[];
  guides: string[];

  startLocation: StartLocation;
  locations: Location[];
};

const app = express();
const port = 3000;

app.use(express.json());

const tours: Tour[] = JSON.parse(
  readFileSync(
    new URL('../dev-data/data/tours.json', import.meta.url),
    'utf-8',
  ),
);

// get all the posts
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// get a single tour
app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((item) => String(item._id) === String(req.params.id));

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// create a new tour
app.post('/api/v1/tours', (req, res) => {
  const newId: string = tours[tours.length - 1]._id + 1;
  const newTour: Tour = Object.assign({ _id: newId }, req.body);

  tours.push(newTour);

  writeFile(
    new URL('../dev-data/data/tours.json', import.meta.url),
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    },
  );
});

// update tour
app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((item) => String(item._id) === String(req.params.id));
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 200,
    data: {
      tour: '<updated tour here ...>',
    },
  });
});

// Delete tour
app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id;
  const filterdTours = tours.filter((item) => String(item._id) !== String(id));

  if (filterdTours.length === tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  writeFile(
    new URL('../dev-data/data/tours.json', import.meta.url),
    JSON.stringify(filterdTours),
    'utf-8',
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to delete tour',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Tour deleted successfully',
        data: {
          tours: filterdTours,
        },
      });
    },
  );
});

// Listen
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
