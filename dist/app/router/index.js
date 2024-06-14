"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../module/auth/auth.route");
const facility_route_1 = require("../module/Facility/facility.route");
const booking_route_1 = require("../module/Booking/booking.route");
const availableTime_route_1 = require("../module/Booking/availableTime.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/auth', route: auth_route_1.AuthRouter },
    { path: '/facility', route: facility_route_1.FacilityRouter },
    { path: '/bookings', route: booking_route_1.BookingRouter },
    { path: '/check-availability', route: availableTime_route_1.AvailableTimeRouter },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
