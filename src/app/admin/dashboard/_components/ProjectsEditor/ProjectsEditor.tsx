"use client";

import { useActionState } from "react";
import { z } from "zod";
import { CreateProjectSchema } from "@/lib/definitions";
import { createProject } from "@/app/actions/projects";

import styles from "./projectseditor.module.scss";

export default function ProjectsEditor() {
  const [state, action, pending] = useActionState(createProject, undefined)

  return (
    <form action={action} className={styles.projectForm}>
      <h1>Create Project</h1>

      <label>
        Name
        <input name="name" type="text" />
        {state?.errors?.name && <p className={styles.error}>{state.errors.name}</p>}
      </label>

      <label>
        Slug
        <input name="slug" type="text" />
        {state?.errors?.slug && <p className={styles.error}>{state.errors.slug}</p>}
      </label>

      <label>
        Demo URL
        <input name="demoUrl" type="url" placeholder="https://..." />
        {state?.errors?.demoUrl && <p className={styles.error}>{state.errors.demoUrl}</p>}
      </label>

      <label>
        Repo URL
        <input name="repoUrl" type="url" />
        {state?.errors?.repoUrl && <p className={styles.error}>{state.errors.repoUrl}</p>}
      </label>

      <label>
        Description
        <textarea name="description" />
        {state?.errors?.description && <p className={styles.error}>{state.errors.description}</p>}
      </label>

      <label>
        Tags (comma separated)
        <input name="tags" type="text" placeholder="react, nextjs, fullstack" />
        {state?.errors?.tags && <p className={styles.error}>{state.errors.tags}</p>}
      </label>

      <input type="file" name="image" accept="image/*" required />

      <button type="submit">
         {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
