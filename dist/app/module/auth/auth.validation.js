"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Id is required.' })
            .email('This is not a valid email'),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
// const changePasswordValidationSchema = z.object({
//   body: z.object({
//     oldPassword: z.string({ required_error: 'Old Password is required' }),
//     newPassword: z.string({ required_error: 'New Password is required' }),
//   }),
// });
// const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh token is required!',
//     }),
//   }),
// });
exports.AuthValidation = {
    loginValidationSchema,
    // changePasswordValidationSchema,
    // refreshTokenValidationSchema,
};
