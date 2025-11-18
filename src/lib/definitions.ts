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
  name: z.string().min(2, "Project name is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be URL friendly"),
  demoUrl: z.url("Invalid URL").optional().or(z.literal("")),
  repoUrl: z.url("Invalid URL"),
  description: z.string().min(10, "Description must be at least 10 characters").max(250, "Description must be at most 250 characters"),
  tags: z.string().regex(/^[A-Za-z0-9, ]*$/, "Tags must be comma-separated words"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File is required")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, or WEBP allowed"
    )
    .refine((file) => file.size <= 2 * 1024 * 1024, "File too large (max 2MB)"),
  order: z.number().optional(),
  publishedAt: z.date().optional(),
});

export type CreateProjectState =
  | {
      values?: {
        name?: string
        slug?: string
        demoUrl?: string
        repoUrl?: string
        description?: string
        tags?: string[]
        order?: number
        publishedAt?: string
      }
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
  name: z.string().min(2, "Project name is required").optional(),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be URL friendly").optional(),
  demoUrl: z.url("Invalid URL").optional().or(z.literal("")).optional(),
  repoUrl: z.url("Invalid URL").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(250, "Description must be at most 250 characters").optional(),
  tags: z.string().regex(/^[A-Za-z0-9, ]*$/, "Tags must be comma-separated words").optional(),
  image: z.instanceof(File).optional().refine((file) => (file ? file.size > 0 : true), "File is required")
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
      values?: {
        name?: string
        slug?: string
        demoUrl?: string
        repoUrl?: string
        description?: string
        tags?: string[]
        order?: number
        publishedAt?: string
      }
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