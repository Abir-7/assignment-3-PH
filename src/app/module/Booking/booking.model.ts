import { model, Schema } from 'mongoose';
import { T_FacilityBooking } from './booking.interface';

export const facilityBookingSchema = new Schema<T_FacilityBooking>({
  facility: { type: String, required: [true, 'Facility ID is required'] },
  date: { type: String, required: [true, 'Booking date is required'] },
  startTime: { type: String, required: [true, 'Start time is required'] },
  endTime: { type: String, required: [true, 'End time is required'] },
});

const Booking = model<T_FacilityBooking>('Booking', facilityBookingSchema);
