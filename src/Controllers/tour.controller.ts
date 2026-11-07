import { Request, Response } from 'express';
import { readFileSync, writeFile } from 'node:fs';
import { Tour } from '../@types.js';

const tours: Tour[] = JSON.parse(
  readFileSync(
    new URL('../../dev-data/data/tours.json', import.meta.url),
    'utf-8',
  ),
);

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
};

// update tour
export const updateTour = (req: Request, res: Response) => {
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

      res.status(204).json({
        status: 'success',
        message: 'Tour deleted successfully',
        data: {
          tours: null,
        },
      });
    },
  );
};
