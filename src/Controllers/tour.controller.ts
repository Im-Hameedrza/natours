import { NextFunction, Request, Response } from 'express';
import { readFileSync, writeFile } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { Tour } from '../@types.js';

let tours: Tour[] = JSON.parse(
  readFileSync(
    new URL('../../dev-data/data/tours.json', import.meta.url),
    'utf-8',
  ),
);

export const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string,
) => {
  console.log(`id is: ${val}`);

  const tour = tours.find((item) => String(item._id) === String(val));
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id',
    });
  }
  next();
};

// get all the tours
export const getAllTours = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// get a single tour
export const getSingleTour = (req: Request, res: Response) => {
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
};

// create a new tour
export const createNewTour = (req: Request, res: Response) => {
  if (
    !req.body ||
    typeof req.body !== 'object' ||
    Array.isArray(req.body) ||
    typeof req.body.name !== 'string' ||
    req.body.name.trim() === '' ||
    typeof req.body.price !== 'number' ||
    !Number.isFinite(req.body.price) ||
    req.body.price < 0
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'A tour must have a name and a valid price',
    });
  }

  const newId: string = randomUUID();
  const newTour: Tour = Object.assign({}, req.body, { _id: newId });
  const newTours = [...tours, newTour];

  writeFile(
    new URL('../../dev-data/data/tours.json', import.meta.url),
    JSON.stringify(newTours),
    'utf-8',
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to create tour',
        });
      }

      tours = newTours;

      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    },
  );
};

// update tour
export const updateTour = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};

// Delete tour
export const deleteTour = (req: Request, res: Response) => {
  const id = req.params.id;
  const filterdTours = tours.filter((item) => String(item._id) !== String(id));

  if (filterdTours.length === tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  writeFile(
    new URL('../../dev-data/data/tours.json', import.meta.url),
    JSON.stringify(filterdTours),
    'utf-8',
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to delete tour',
        });
      }

      tours = filterdTours;

      res.status(204).end();
    },
  );
  return res.status(204).json({
    status: 'success',
  });
};
