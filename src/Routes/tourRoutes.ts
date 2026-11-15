import express from 'express';
import {
  aliasTopTours,
  createNewTour,
  deleteTour,
  getAllTours,
  getMonthlyPlan,
  getSingleTour,
  getToursStats,
  updateTour,
} from '../Controllers/tour.controller.js';

export const tourRouter = express.Router();

// tourRouter.param('id', checkID);

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRouter.route('/tour-stats').get(getToursStats);
tourRouter.route('/monthlyPlan/:year').get(getMonthlyPlan);

tourRouter.route('/').get(getAllTours).post(createNewTour);
tourRouter
  .route('/:id')
  .get(getSingleTour)
  .patch(updateTour)
  .delete(deleteTour);
