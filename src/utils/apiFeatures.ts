import { Request } from 'express';
import { ToursModel } from '../models/tourModels.js';
type TourQuery = ReturnType<typeof ToursModel.find>;
export class APIFeatures {
  constructor(
    public query: TourQuery,
    public queryStr: Request['query'],
  ) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // Filtering 1
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Filtering 2
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (typeof this.queryStr.sort === 'string') {
      const sortBy = this.queryStr.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    const fields = this.queryStr.fields;

    if (typeof fields === 'string') {
      const selectedFields = fields.split(',').join(' ');

      this.query.select(selectedFields);
    } else {
      this.query.select('-__v');
    }

    return this;
  }
  paginating() {
    const page: number = Number(this.queryStr.page) || 1;
    const limit: number = Number(this.queryStr.limit) || 20;
    const skip: number = Number((page - 1) * limit);

    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 20
    ) {
      throw new Error('this is not working');
    }

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
