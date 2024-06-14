"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_utils_1 = require("./booking.utils");
const createBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = req.body;
    data.user = id;
    const result = yield booking_service_1.BookingService.createBookingIntoDb(data);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking created successfully',
        data: result,
    });
}));
const getAllBooking = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookingFromDb();
    return (0, sendResponse_1.default)(res, {
        success: result.length ? true : false,
        statusCode: result.length ? 200 : 404,
        message: result.length
            ? 'Bookings retrieved successfully'
            : 'No Data Found',
        data: result,
    });
}));
const getAllBookingByUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield booking_service_1.BookingService.getAllBookingByUserFromDb(id);
    return (0, sendResponse_1.default)(res, {
        success: result.length ? true : false,
        statusCode: result.length ? 200 : 404,
        message: result.length
            ? 'Bookings retrieved successfully'
            : 'No Data Found',
        data: result,
    });
}));
const deleteBookingByUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userID } = req.user;
    const { id: bookingID } = req.params;
    const result = yield booking_service_1.BookingService.deleteBookingByUserFromDb(userID, bookingID);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking cancelled successfully',
        data: result,
    });
}));
const getAvailableTimeSlots = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const formattedDate = (0, booking_utils_1.getFormattedDate)();
    const date = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.date) || formattedDate;
    const covertedDate = (0, booking_utils_1.convertDate)(date);
    const result = yield booking_service_1.BookingService.getAvailableTimeSlotsFromBooking(covertedDate);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking available time retrives successfully',
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBooking,
    getAllBookingByUser,
    deleteBookingByUser,
    getAvailableTimeSlots,
};
