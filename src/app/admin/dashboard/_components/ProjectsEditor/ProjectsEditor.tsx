"use client";

import { useState } from "react";
import { z } from "zod";
import { CreateProjectSchema } from "@/lib/definitions";
import { createProject } from "@/app/actions/projects";

import styles from "./projectseditor.module.scss";

type FormErrors = Partial<Record<keyof z.infer<typeof CreateProjectSchema>, string[]>>;

export default function ProjectsEditor() {
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(data: FormData) {
    const result = await createProject(data);
    if (!result.success) setErrors(result.errors ?? {});
  }

  return (
    <form action={handleSubmit} className={styles.projectForm}>
      <h1>Create Project</h1>

      <label>
        Name
        <input name="name" type="text" />
        {errors.name && <p className={styles.error}>{errors.name[0]}</p>}
      </label>

      <label>
        Slug
        <input name="slug" type="text" />
        {errors.slug && <p className={styles.error}>{errors.slug[0]}</p>}
      </label>

      <label>
        Demo URL
        <input name="demoUrl" type="url" placeholder="https://..." />
        {errors.demoUrl && <p className={styles.error}>{errors.demoUrl[0]}</p>}
      </label>

      <label>
        Repo URL
        <input name="repoUrl" type="url" />
        {errors.repoUrl && <p className={styles.error}>{errors.repoUrl[0]}</p>}
      </label>

      <label>
        Description
        <textarea name="description" />
        {errors.description && <p className={styles.error}>{errors.description[0]}</p>}
      </label>

      <label>
        Tags (comma separated)
        <input name="tags" type="text" placeholder="react, nextjs, fullstack" />
        {errors.tags && <p className={styles.error}>{errors.tags[0]}</p>}
      </label>

      <input type="file" name="image" accept="image/*" required />

      <button type="submit">Create</button>
    </form>
  );
}
