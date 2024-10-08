import * as z from 'zod';

export const directorySubmitSchema = z.object({
  websiteLink: z.string().url('Please enter a valid URL'),
  categories: z
    .string()
    .max(100, 'Categories should not exceed 100 characters')
    .optional(),
  contactInfo: z.string().email('Please enter a valid email').optional(),
  runDirectory: z.boolean().default(false),
  message: z
    .string()
    .max(500, 'Message should not exceed 500 characters')
    .optional(),
});

export type DirectorySubmitValues = z.infer<typeof directorySubmitSchema>;
