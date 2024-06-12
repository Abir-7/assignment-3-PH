import { z } from 'zod';
import { userRole } from './user.const';
export const userZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid email format',
    }),
    password: z.string(),
    phone: z.string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone must be a string',
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'User role is required',
      invalid_type_error: 'Invalid Input',
    }),
    address: z.string({ required_error: 'Address is required' }),
  }),
});
