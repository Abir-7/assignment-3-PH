import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';
import { T_Booking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import { getTotalTimeInHour, hasTimeConflict } from './booking.utils';

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
  const result = ''; //await Booking.create(data);
  return result;
};

const getAllBookingFromDb = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};
const getAllBookingByUserFromDb = async (id: string) => {
  //console.log(id);
  const result = await Booking.find({ user: id })
    .populate('user')
    .populate('facility');

  return result;
};

const deleteBookingByUserFromDb = async (id: string) => {
  // console.log(id);

  const isBookingExist = await Booking.findById(id);

  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  );
  return result;
};

const getAvailableTimeSlotsFromBooking = async (givenDate: string) => {
  const date = givenDate;
  console.log(date, 'gg');
  const bookings = await Booking.find({ date: date });
  // Step 2: Define the full range of available time slots (assuming 8 AM to 9 PM)

  const startHour = 0;
  const endHour = 24;
  const timeSlots = [];
  for (let hour = startHour; hour <= endHour - 2; hour += 2) {
    timeSlots.push({
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 2).toString().padStart(2, '0')}:00`,
    });
  }

  // Step 3: Filter out the time slots that overlap with existing bookings
  const availableTimeSlots = timeSlots.filter((slot) => {
    return !bookings.some((booking) => {
      return (
        booking.startTime < slot.endTime && booking.endTime > slot.startTime
      );
    });
  });
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
