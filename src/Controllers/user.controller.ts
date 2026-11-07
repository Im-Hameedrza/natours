import { readFileSync } from 'node:fs';
import { User } from '../@types.js';
import { Request, Response } from 'express';

const users: User[] = JSON.parse(
  readFileSync(
    new URL('../../dev-data/data/users.json', import.meta.url),
    'utf-8',
  ),
);

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  if (!users || users.length === 0) {
    res.status(404).json({
      status: 'fail',
      message: 'Users not found',
    });
  }

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
};

// Get user
export const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};

// update user
export const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};

// create new user
export const createNewUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};

// delete user
export const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
};
