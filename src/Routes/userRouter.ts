import express from 'express';
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../Controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createNewUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
