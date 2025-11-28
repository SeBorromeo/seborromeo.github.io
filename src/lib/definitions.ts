import { Experience } from '@/generated/prisma'
import * as z from 'zod'
 
export const LoginFormSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim(),
})
 
export type LoginState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  userId: string
}

export const CreateProjectSchema = z.object({
  name: z.string().min(2, "Project name is required").max(100, "Project name can't be more than 100 characters"),
  slug: z.string().min(2, "Slug is required").max(100, "slug can't be more than 100 characters").regex(/^[a-z0-9-]+$/, "Slug must be URL friendly"),
  demoUrl: z.url("Invalid URL").optional().or(z.literal("")),
  repoUrl: z.url("Invalid URL"),
  description: z.string().min(10, "Description must be at least 10 characters").max(250, "Description must be at most 250 characters"),
  tags: z.string().regex(/^[A-Za-z0-9, \-\/.+#()]*$/, "Tags must be comma-separated words"),
  image: z.instanceof(File).optional()
    .refine((file) => (file ? file.size > 0 : true))
    .refine(
      (file) =>
        file
          ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          : true,
      "Only JPG, PNG, or WEBP allowed"
    )
    .refine(
      (file) => (file ? file.size <= 2 * 1024 * 1024 : true),
      "File too large (max 2MB)"
    ),
  order: z.number().optional(),
  publishedAt: z.date().optional(),
});

export type CreateProjectState =
  | {
      errors?: {
        name?: string[]
        slug?: string[]
        demoUrl?: string[]
        repoUrl?: string[]
        description?: string[]
        tags?: string[]
        image?: string[]
        order?: string[]
        publishedAt?: string[]
      }
      message?: string
    }
  | undefined

export const UpdateProjectSchema = z.object({
  projectId: z.string(),
  name: z.string().min(2, "Project name is required").optional(),
  demoUrl: z.url("Invalid URL").optional().or(z.literal("")).optional(),
  repoUrl: z.url("Invalid URL").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(250, "Description must be at most 250 characters").optional(),
  tags: z.string().regex(/^[A-Za-z0-9, \-\/.+#()]*$/, "Tags must be comma-separated words").optional(),
  image: z.instanceof(File).optional()
    .refine((file) => (file ? file.size > 0 : true))
    .refine(
      (file) =>
        file
          ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          : true,
      "Only JPG, PNG, or WEBP allowed"
    )
    .refine(
      (file) => (file ? file.size <= 2 * 1024 * 1024 : true),
      "File too large (max 2MB)"
    ),
  order: z.number().optional(),
  publishedAt: z.date().optional(),
});

export type UpdateProjectState =
  | {
      errors?: {
        name?: string[]
        slug?: string[]
        demoUrl?: string[]
        repoUrl?: string[]
        description?: string[]
        tags?: string[]
        image?: string[]
        order?: string[]
        publishedAt?: string[]
      }
      message?: string
    }
  | undefined

export const CreateExperienceSchema = z.object({
  company: z.string().min(2, "Company name required").max(50, "Company name can't exceed 50 characters"),
  companyUrl: z.url("Invalid URL"),
  role: z.string().min(2, "Role required").max(50, "Company name can't exceed 50 characters"),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.array(
    z.string().min(25, "Each description bullet must be at least 25 characters").max(300, "Each description bullet must be at most 300 characters")
  ).min(1, "At least one description bullet is required")
    .max(10, "No more than 10 description bullets allowed"),
  image: z.instanceof(File)
    .refine((file) => (file ? file.size > 0 : true))
    .refine(
      (file) =>
        file
          ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          : true,
      "Only JPG, PNG, or WEBP allowed"
    )
    .refine(
      (file) => (file ? file.size <= 2 * 1024 * 1024 : true),
      "File too large (max 2MB)"
    ),
  skills: z.string().regex(/^[A-Za-z0-9, \-\/.+#()]*$/, "Skills must be comma-separated words")
})

export const UpdateExperienceSchema = z.object({
  experienceId: z.string(),
  company: z.string().min(2, "Company name required").max(50, "Company name can't exceed 50 characters"),
  companyUrl: z.url("Invalid URL"),
  role: z.string().min(2, "Role required").max(50, "Company name can't exceed 50 characters"),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.array(
    z.string().min(25, "Each description bullet must be at least 25 characters").max(500, "Each description bullet must be at most 500 characters")
  ).min(1, "At least one description bullet is required")
    .max(10, "No more than 10 description bullets allowed"),
  image: z.instanceof(File).optional()
    .refine((file) => (file ? file.size > 0 : true))
    .refine(
      (file) =>
        file
          ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          : true,
      "Only JPG, PNG, or WEBP allowed"
    )
    .refine(
      (file) => (file ? file.size <= 2 * 1024 * 1024 : true),
      "File too large (max 2MB)"
    ),
  skills: z.string().regex(/^[A-Za-z0-9, \-\/.+#()]*$/, "Skills must be comma-separated words")
})

export type ModifyExperienceState = {
  errors?: Partial<Record<keyof Experience, string[]>>;
  message?: string;
} | undefined;

