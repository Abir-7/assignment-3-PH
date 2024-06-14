"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableTimeRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.get('/', booking_controller_1.BookingController.getAvailableTimeSlots);
exports.AvailableTimeRouter = router;
