import { z } from 'zod';

export const UpdateList = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .min(3, 'Title must be at least 3 characters long'),
  boardId: z.string()
});
