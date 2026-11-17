import mongoose, { Model } from 'mongoose';
import { Tour } from '../@types.js';
import slugify from 'slugify';
import { Query } from 'mongoose';

interface TourVirtuals {
  durationWeeks: number;
}

type TourModelType = Model<Tour, {}, {}, TourVirtuals>;

const tourSchema = new mongoose.Schema<
  Tour,
  TourModelType,
  {},
  {},
  TourVirtuals
>(
  {
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
    slug: {
      type: String,
      unique: true,
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
    secretTour: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },

    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  const week: Number = this.duration / 7;
  const remainingDays: number = this.duration - Number(week.toFixed()) * 7;
  if (this.duration > 7) {
    return `${week.toFixed()} week & ${remainingDays}days`;
  }
});

// Document middleware it runs before save() and create() commands
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
});

// Query middleware

tourSchema.pre(/^find/, function () {
  if (this instanceof Query) {
    this.where({ secretTour: { $ne: true } });
  }
});

// aggregate middleware
tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
});
export const ToursModel = mongoose.model<Tour, TourModelType>(
  'Tour',
  tourSchema,
);
