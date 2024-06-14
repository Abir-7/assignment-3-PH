"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingZodValidationSchema = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
exports.bookingZodValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        facility: zod_1.z.string({
            required_error: 'Facility is required',
            invalid_type_error: 'Facility must be a string',
        }),
        date: zod_1.z
            .string({
            required_error: 'Date is required',
            invalid_type_error: 'Date must be a string',
        })
            .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Date must be a valid date string',
        }),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before End time !  ',
    }),
});
