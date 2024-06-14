"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacilityZodValidationSchema = exports.facilityZodValidationSchema = void 0;
const zod_1 = require("zod");
exports.facilityZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        }),
        pricePerHour: zod_1.z.number({
            required_error: 'Price per hour is required',
            invalid_type_error: 'Price must be a number',
        }),
        location: zod_1.z.string({
            required_error: 'Location is required',
            invalid_type_error: 'Location must be a string',
        }),
    }),
});
exports.updateFacilityZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        })
            .optional(),
        pricePerHour: zod_1.z
            .number({
            required_error: 'Price per hour is required',
            invalid_type_error: 'Price must be a number',
        })
            .optional(),
        location: zod_1.z
            .string({
            required_error: 'Location is required',
            invalid_type_error: 'Location must be a string',
        })
            .optional(),
    }),
});
