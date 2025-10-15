import { z } from 'zod';

// URL validation schema
export const urlSchema = z.string()
  .trim()
  .url({ message: 'Please enter a valid URL' })
  .max(2048, { message: 'URL must be less than 2048 characters' })
  .refine((url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, { message: 'URL must use http or https protocol' });

// Text content validation
export const textContentSchema = z.string()
  .trim()
  .min(1, { message: 'Content cannot be empty' })
  .max(5000, { message: 'Content must be less than 5000 characters' });

// Title validation
export const titleSchema = z.string()
  .trim()
  .min(1, { message: 'Title cannot be empty' })
  .max(200, { message: 'Title must be less than 200 characters' });

// Tags validation
export const tagsSchema = z.string()
  .trim()
  .max(500, { message: 'Tags must be less than 500 characters' })
  .optional()
  .transform((val) => {
    if (!val) return [];
    return val
      .split(/[\s,]+/)
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.slice(1))
      .filter(tag => tag.length > 0 && tag.length <= 50)
      .slice(0, 10); // Max 10 tags
  });

// Bookmark creation schema
export const bookmarkSchema = z.object({
  url: urlSchema.optional(),
  title: titleSchema,
  content: textContentSchema.optional(),
  tags: tagsSchema,
  description: z.string().trim().max(1000).optional(),
});

// Note creation schema
export const noteSchema = z.object({
  title: titleSchema,
  content: textContentSchema,
  tags: tagsSchema,
});

// Collection creation schema
export const collectionSchema = z.object({
  name: titleSchema,
  description: z.string().trim().max(500).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').optional(),
  icon: z.string().max(10).optional(),
});

// Safe HTML sanitization helper
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

// Safe URL encoding for external services
export function encodeUrlParam(param: string): string {
  return encodeURIComponent(param.slice(0, 2000));
}
