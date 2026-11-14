import type { NextFunction, Request, Response } from 'express';
import { ToursModel } from '../models/tourModels.js';
import { APIFeatures } from '../utils/apifeatures.js';
// middleware

export const aliasTopTours = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.tourQuery = {
    limit: '5',
    sort: '-ratingsAverage,price',
    fields: 'name,price,ratingsAverage,summary,difficulty',
  };

  next();
};

// get all the tours
export const getAllTours = async (req: Request, res: Response) => {
  try {
    const params = {
      ...req.query,
      ...(res.locals.tourQuery ?? {}),
    };

    const features = new APIFeatures(ToursModel.find(), params)
      .filter()
      .sort()
      .fieldLimiting()
      .paginating();

    const tours = await features.query;

    // Response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// get a single tour
export const getSingleTour = async (req: Request, res: Response) => {
  try {
    const tour = await ToursModel.findById(req.params.id);
    if (!tour) {
      res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// create a new tour
export const createNewTour = async (req: Request, res: Response) => {
  try {
    const newTour = await ToursModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

// update tour
export const updateTour = async (req: Request, res: Response) => {
  try {
    const newTour = await ToursModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// Delete tour
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const deletedTour = await ToursModel.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
