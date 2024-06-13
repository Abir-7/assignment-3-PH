import { Router } from 'express';
import { BookingController } from './booking.controller';

const router = Router();
router.get('/', BookingController.getAvailableTimeSlots);

export const AvailableTimeRouter = router;
