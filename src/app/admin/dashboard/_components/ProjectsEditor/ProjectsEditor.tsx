"use client";

import { useActionState, useState } from "react";
import { createProject } from "@/app/actions/projects";
import { ProjectCard } from "@/components/home/Projects/ProjectsContainer/ProjectCard";

import styles from "./projectseditor.module.scss";

export default function ProjectsEditor() {
  const [state, action, pending] = useActionState(createProject, undefined);

  const [formPreview, setFormPreview] = useState({
    name: "",
    slug: "",
    demoUrl: "",
    repoUrl: "",
    description: "",
    tags: [] as string[],
    image: "",
    released: false,
  });

  // Handle file preview
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormPreview(prev => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  }

  // Handle text changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormPreview(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className={styles.editor_wrapper}>
      <form action={action} className={styles.projectForm}>
        <h1>Create Project</h1>

        <label>
          Name
          <input name="name" type="text" onChange={handleChange} />
          {state?.errors?.name && <p className={styles.error}>{state.errors.name}</p>}
        </label>

        <label>
          Slug
          <input name="slug" type="text" onChange={handleChange} />
          {state?.errors?.slug && <p className={styles.error}>{state.errors.slug}</p>}
        </label>

        <label>
          Demo URL
          <input name="demoUrl" type="url" placeholder="https://..." onChange={handleChange} />
          {state?.errors?.demoUrl && <p className={styles.error}>{state.errors.demoUrl}</p>}
        </label>

        <label>
          Repo URL
          <input name="repoUrl" type="url" onChange={handleChange} />
          {state?.errors?.repoUrl && <p className={styles.error}>{state.errors.repoUrl}</p>}
        </label>

        <label>
          Description
          <textarea name="description" onChange={handleChange} />
          {state?.errors?.description && <p className={styles.error}>{state.errors.description}</p>}
        </label>

        <label>
          Tags (comma separated)
          <input name="tags" type="text" placeholder="react, nextjs, fullstack" 
            onChange={(e) => {
              const tags = e.target.value.split(",").map(tag => tag.trim());
              setFormPreview(prev => ({ ...prev, tags }));
            }}
          />
          {state?.errors?.tags && <p className={styles.error}>{state.errors.tags}</p>}
        </label>

        <label>
          Released?
          <input
            name="released"
            type="checkbox"
            checked={formPreview.released}
            onChange={handleChange}
          />
        </label>

        {formPreview.released && (
          <label>
            Release Date
            <input
              name="publishedAt"
              type="date"
              onChange={handleChange}
            />
            {state?.errors?.publishedAt && <p className={styles.error}>{state.errors.publishedAt}</p>}
          </label>
        )}

        <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />

        {state?.message && <p className={styles.error}>{state.message}</p>}
        <button type="submit">
          {pending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <aside className={styles.preview_pane}>
        <h2>Live Preview</h2>
        <ProjectCard project={{
          name: formPreview.name,
          slug: formPreview.slug || '',
          demoUrl: formPreview.demoUrl || '',
          repoUrl: formPreview.repoUrl || '',
          description: formPreview.description || '',
          publishedAt: null,
          tags: formPreview.tags || [],
          imageUrl: formPreview.image || '',
        }} />
      </aside>
    </div>
  );
}
