import { z } from 'zod';

export const ExcelRowSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email(),
  school: z.string().min(1),
  city: z.string().optional(),
  books: z.string(), // comma separated
});

export type ExcelRow = z.infer<typeof ExcelRowSchema>;

export const BatchIdSchema = z.object({
  batchId: z.string().uuid(),
});

export type BatchIdInput = z.infer<typeof BatchIdSchema>;

export const DuplicateResolveSchema = z.object({
  duplicateId: z.string(),
  action: z.enum(['merge', 'keep_separate']),
});

export type DuplicateResolveInput = z.infer<typeof DuplicateResolveSchema>;

export const MessageResendSchema = z.object({
  communicationId: z.string(),
  channel: z.enum(['whatsapp', 'email']).optional(),
});

export type MessageResendInput = z.infer<typeof MessageResendSchema>;

export const DLQRetrySchema = z.object({
  failedMessageIds: z.array(z.string()).optional(),
  retryAll: z.boolean().default(false),
  batchId: z.string().optional(),
});

export type DLQRetryInput = z.infer<typeof DLQRetrySchema>;

export const BatchCancelSchema = z.object({
  reason: z.string().optional(),
});

export type BatchCancelInput = z.infer<typeof BatchCancelSchema>;

export const PaginationSchema = z.object({
  limit: z.number().default(20),
  startAfter: z.string().optional(),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;
