import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingService } from './booking.service';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { convertDate } from './booking.utils';

const createBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const data = req.body;
  data.user = id;
  const result = await BookingService.createBookingIntoDb(data);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await BookingService.getAllBookingFromDb();
  return sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? 200 : 404,
    message: result.length
      ? 'Bookings retrieved successfully'
      : 'No Data Found',
    data: result,
  });
});

const getAllBookingByUser: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.user;
    const result = await BookingService.getAllBookingByUserFromDb(id);
    return sendResponse(res, {
      success: result.length ? true : false,
      statusCode: result.length ? 200 : 404,
      message: result.length
        ? 'Bookings retrieved successfully'
        : 'No Data Found',
      data: result,
    });
  },
);

const deleteBookingByUser: RequestHandler = catchAsync(
  async (req, res, next) => {
    // const { id } = req.user;
    const { id } = req.params;
    const result = await BookingService.deleteBookingByUserFromDb(id);
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Booking cancelled successfully',
      data: result,
    });
  },
);

const getAvailableTimeSlots: RequestHandler = catchAsync(
  async (req, res, next) => {
    const date = (req.query?.date as string) || '';
    const covertedDate = convertDate(date);

    const result =
      await BookingService.getAvailableTimeSlotsFromBooking(covertedDate);

    return sendResponse(res, {
      success: result.length ? true : false,
      statusCode: result.length ? 200 : 404,
      message: result.length
        ? 'Booking available time retrives successfully'
        : 'No Data Found',
      data: result,
    });
  },
);
export const BookingController = {
  createBooking,
  getAllBooking,
  getAllBookingByUser,
  deleteBookingByUser,
  getAvailableTimeSlots,
};
