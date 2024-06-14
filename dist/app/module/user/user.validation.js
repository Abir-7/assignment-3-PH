"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidationSchema = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
exports.userZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
            invalid_type_error: 'Invalid email format',
        }),
        password: zod_1.z.string(),
        phone: zod_1.z.string({
            required_error: 'Phone number is required',
            invalid_type_error: 'Phone must be a string',
        }),
        role: zod_1.z.enum([...user_const_1.userRole], {
            required_error: 'User role is required',
            invalid_type_error: 'Invalid Input',
        }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
    }),
});
