import { model, Schema } from 'mongoose';
import { T_Facility } from './facility.interface';

export const facilitySchema = new Schema<T_Facility>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
  },
  location: { type: String, required: [true, 'Location is required'] },
  isDeleted: { type: Boolean, default: false },
});

export const Facility = model<T_Facility>('Facility', facilitySchema);
