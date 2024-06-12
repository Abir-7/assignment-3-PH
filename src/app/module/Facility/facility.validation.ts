import { z } from 'zod';
export const facilityZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    pricePerHour: z.number({
      required_error: 'Price per hour is required',
      invalid_type_error: 'Price must be a number',
    }),
    location: z.string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    }),
  }),
});

export const updateFacilityZodValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
    pricePerHour: z
      .number({
        required_error: 'Price per hour is required',
        invalid_type_error: 'Price must be a number',
      })
      .optional(),
    location: z
      .string({
        required_error: 'Location is required',
        invalid_type_error: 'Location must be a string',
      })
      .optional(),
  }),
});
