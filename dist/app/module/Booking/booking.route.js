"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../Middleware/auth");
const booking_controller_1 = require("./booking.controller");
const validationMiddleware_1 = __importDefault(require("../../Middleware/validationMiddleware"));
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.auth)('user'), (0, validationMiddleware_1.default)(booking_validation_1.bookingZodValidationSchema), booking_controller_1.BookingController.createBooking);
router.get('/', (0, auth_1.auth)('admin'), booking_controller_1.BookingController.getAllBooking);
router.get('/user', (0, auth_1.auth)('user'), booking_controller_1.BookingController.getAllBookingByUser);
router.delete('/:id', (0, auth_1.auth)('user'), booking_controller_1.BookingController.deleteBookingByUser);
router.get('/', booking_controller_1.BookingController.getAvailableTimeSlots);
exports.BookingRouter = router;
