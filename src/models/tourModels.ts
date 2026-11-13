import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
    trim: true,
    minlength: [1, 'Tour name cannot be empty'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a group size'],
  },

  difficulty: {
    type: String,
    required: [true, 'Tour must have a difficukty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
    min: [0, 'Price cannot be negative'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startDates: [Date],
});

export const ToursModel = mongoose.model('Tour', tourSchema);
