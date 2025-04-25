import { z } from 'zod';
export const UnitEnum = z.enum(['pcs', 'tray', 'box', 'ml', 'g', 'kg', 'liter']);

export const ProductValidator = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is required*' })
    .max(50, 'Product name should not exceed 50 characters'),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number with up to two decimal places')
    .superRefine((val, ctx) => {
      const price = parseFloat(val);
      if (price <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Price must be greater than 0',
          path: ['price'],
        });
      }
    }),
  description: z.string().optional(),
  weightUnit: z
    .string()
    .min(1, 'Product classification is required*')
    .max(20, 'Classification should not exceed 20 characters'),
  weightValue: z.string().optional(),
  // .superRefine((val, ctx) => {
  //   if (val && val !== '') {
  //     const isValid = /^\d+$/.test(val);
  //     if (!isValid) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: 'Must be a positive whole number',
  //       });
  //     }
  //   }
  // }),
  quantity: z
    .string()
    .min(1, 'Product unit size is required*')
    .superRefine((val, ctx) => {
      const quantity = parseFloat(val);
      if (quantity <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Price must be greater than 0',
          path: ['price'],
        });
      }
    }),
  unit: z
    .string()
    .min(1, { message: 'Product unit is required*' })
    .max(20, 'Product unit should not exceed 20 characters'),
  unitValue: z
    .string()
    .regex(/^\d+$/, { message: 'Only positive whole numbers are allowed' })
    .min(1, { message: 'Product unit value is required*' })
    .max(20, 'Product unit value should not exceed 20 characters'),
  category: z.array(z.number()).nonempty('At least one category is required'),
});
