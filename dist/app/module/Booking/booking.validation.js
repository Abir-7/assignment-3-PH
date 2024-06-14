"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingZodValidationSchema = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // 00-23 for hours, 00-59 for minutes, both requiring two digits
    return regex.test(time);
}, {
    message: 'Invalid time format, expected "HH:MM" in 24-hour format',
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
