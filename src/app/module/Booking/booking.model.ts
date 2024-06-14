import { model, Schema, Types } from 'mongoose';
import { T_Booking } from './booking.interface';

import { bookingStatus } from './booking.const';

export const bookingSchema = new Schema<T_Booking>({
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, 'Facility ID is required'],
    ref: 'Facility',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User',
  },
  date: { type: String, required: [true, 'Booking date is required'] },
  startTime: { type: String, required: [true, 'Start time is required'] },
  endTime: { type: String, required: [true, 'End time is required'] },
  payableAmount: {
    type: Number,
    required: [true, 'Payable Amount is required'],
  },
  isBooked: { type: String, enum: bookingStatus, default: 'confirmed' },
});

export const Booking = model<T_Booking>('Booking', bookingSchema);
