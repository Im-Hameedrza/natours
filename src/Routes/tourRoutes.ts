import express from 'express';
import {
  checkID,
  checkTourValidation,
  createNewTour,
  deleteTour,
  getAllTours,
  getSingleTour,
  updateTour,
} from '../Controllers/tour.controller.js';

export const tourRouter = express.Router();

tourRouter.param('id', checkID);

tourRouter.route('/').get(getAllTours).post(checkTourValidation, createNewTour);
tourRouter
  .route('/:id')
  .get(getSingleTour)
  .patch(updateTour)
  .delete(deleteTour);
