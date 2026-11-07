export type Coordinates = [number, number];

export type StartLocation = {
  description: string;
  type: 'Point';
  coordinates: Coordinates;
  address: string;
};

export type Location = {
  _id: string;
  description: string;
  type: 'Point';
  coordinates: Coordinates;
  day: number;
};

export type Tour = {
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  price: number;
  summary: string;
  description: string;
  imageCover: string;

  ratingsAverage: number;
  ratingsQuantity: number;

  images: string[];
  startDates: string[];
  guides: string[];

  startLocation: StartLocation;
  locations: Location[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  active: boolean;
  photo: string;
  password: string;
};
