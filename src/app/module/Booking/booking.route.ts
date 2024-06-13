import { Router } from 'express';
import { auth } from '../../Middleware/auth';
import { BookingController } from './booking.controller';
import validationMiddleware from '../../Middleware/validationMiddleware';

import { bookingZodValidationSchema } from './booking.validation';

const router = Router();
router.post(
  '/',
  auth('user'),
  validationMiddleware(bookingZodValidationSchema),
  BookingController.createBooking,
);

router.get('/', auth('admin'), BookingController.getAllBooking);
router.get('/user', auth('user'), BookingController.getAllBookingByUser);

router.delete('/:id', auth('user'), BookingController.deleteBookingByUser);

router.get('/', BookingController.getAvailableTimeSlots);

export const BookingRouter = router;
