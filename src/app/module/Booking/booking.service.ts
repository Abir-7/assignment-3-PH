import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';
import { T_Booking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import {
  findAvailableTimeSlotForBooking,
  getTotalTimeInHour,
  hasTimeConflict,
} from './booking.utils';

const createBookingIntoDb = async (data: T_Booking) => {
  //console.log(data);
  const isFacilityExist = await Facility.findById(data.facility);

  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  const getAllBookingTimeForProvidedDate = await Booking.find({
    facility: data.facility,
    date: data.date,
  }).select(['startTime', 'endTime', '_id']);

  // console.log(getAllBookingTimeForProvidedDate);

  //check time conflict

  if (
    hasTimeConflict(getAllBookingTimeForProvidedDate, {
      startTime: data.startTime,
      endTime: data.endTime,
    })
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Seleted Time Not Available');
  }

  const totalTime = getTotalTimeInHour(data.startTime, data.endTime);

  data.payableAmount = totalTime * isFacilityExist.pricePerHour;
  console.log(totalTime);
  const result = await Booking.create(data);

  return result;
};

const getAllBookingFromDb = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};
const getAllBookingByUserFromDb = async (id: string) => {
  console.log(id);
  const result = await Booking.find({ user: id }).populate('facility');

  return result;
};

const deleteBookingByUserFromDb = async (userID: string, bookingID: string) => {
  console.log(userID, bookingID);

  const isBookingExist = await Booking.findOne({
    _id: bookingID,
    user: userID,
  });

  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await Booking.findByIdAndUpdate(
    bookingID,
    { isBooked: 'canceled' },
    { new: true },
  );
  return result;
};

const getAvailableTimeSlotsFromBooking = async (givenDate: string) => {
  const date = givenDate;

  const bookings = await Booking.find({ date: date }).select([
    'date',
    'startTime',
    'endTime',
  ]);
  console.log(bookings);
  // if (!bookings.length) {
  //   return bookings;
  // }
  const availableTimeSlots = findAvailableTimeSlotForBooking(bookings);
  //console.log(timeSlots, availableTimeSlots, bookings, 'gg');
  return availableTimeSlots;
};

export const BookingService = {
  createBookingIntoDb,
  getAllBookingFromDb,
  getAllBookingByUserFromDb,
  deleteBookingByUserFromDb,
  getAvailableTimeSlotsFromBooking,
};
