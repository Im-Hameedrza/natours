import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Tour } from '../@types.js';
import { ToursModel } from '../models/tourModels.js';

// middleware

// get all the tours
export const getAllTours = async (req: Request, res: Response) => {
  try {
    // Building Query
    // Filtering 1
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);
    // Filtering 2
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Run query
    let query = ToursModel.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const tours = await query;

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
