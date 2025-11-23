"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createProject, deleteProject, updateProject } from "@/app/actions/projects";
import { PreviewProjectCard } from "@/components/home/Projects/ProjectsContainer/ProjectCard";
import { Project } from "@/components/home/Projects/Projects";
import { useModal } from "@/components/layout/ModalProvider/Modal";

import styles from "./ProjectsEditor.module.scss";

type ProjectsEditorProps =
  | { mode: "create"; initial?: undefined }   
  | { mode: "edit"; initial: Project };

export default function ProjectsEditor({ initial, mode = 'create' }: ProjectsEditorProps) {
  let serverAction: (prevState: any, formData: FormData) => Promise<any> = createProject;
  if (mode === 'edit') {
    serverAction = updateProject;
  }
  
  const [state, action, pending] = useActionState(serverAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const { setContent } = useModal();
  
  useEffect(() => {
    function watchReset(e: Event) { 
      e.preventDefault();
    }
    
    const currRef = formRef.current!
    currRef.addEventListener('reset', watchReset);

    return () => {
      currRef.removeEventListener('reset', watchReset);
    };
  }, []);

  const newProjectState = {
    id: "",
    name: "",
    slug: "",
    demoUrl: "",
    repoUrl: "",
    description: "",
    publishedAt: null,
    tags: [] as string[],
  };

  const [formPreview, setFormPreview] = useState(
    mode === "edit" && initial
      ? {
          ...newProjectState,
          ...initial,
        }
      : newProjectState
  );

  // Handle file preview
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2 MB
        alert("File too large (max 2MB).");
        e.target.value = "";
        return;
      }

      setFormPreview(prev => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  }

  // Handle text changes function 
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { 
    const { name, type } = e.target; 
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value; 
    setFormPreview(prev => ({ ...prev, [name]: value })); 
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const fileInput = formRef.current?.elements.namedItem("image") as HTMLInputElement | null;
    if (fileInput && (!fileInput.files || fileInput.files.length === 0)) {
      fileInput.removeAttribute("name"); // To remove empty image file from form data 
    }
  };

  // TODO: Fix no live preview changes
  return (
    <div className={styles.editor_wrapper}>
      <form action={action} className={styles.projectForm} ref={formRef} onSubmit={handleSubmit}>
        <h1>{mode === "create" ? "Create Project" : "Edit Project"}</h1>
        <input type="hidden" name="projectId" value={initial?.id} />

        <label>
          Name
          <input name="name" type="text" placeholder="Project name" defaultValue={formPreview.name} onChange={handleChange} required />
          {state?.errors?.name && <p className={styles.error}>{state.errors.name}</p>}
        </label>

        {mode === 'create' && 
        <label>
          Slug
          <input name="slug" type="text" placeholder="example-project" onChange={handleChange} required />
          {state?.errors?.slug && <p className={styles.error}>{state.errors.slug}</p>}
        </label>}

        <label>
          Demo URL (Optional)
          <input name="demoUrl" type="url" placeholder="Enter URL..." defaultValue={formPreview.demoUrl ?? ''} onChange={handleChange} />
          {state?.errors?.demoUrl && <p className={styles.error}>{state.errors.demoUrl}</p>}
        </label>

        <label>
          Repo URL
          <input name="repoUrl" type="url" placeholder="Enter URL..." defaultValue={formPreview.repoUrl} onChange={handleChange} required />
          {state?.errors?.repoUrl && <p className={styles.error}>{state.errors.repoUrl}</p>}
        </label>

        <label>
          Description
          <textarea name="description" placeholder="Description" defaultValue={formPreview.description} onChange={handleChange} required />
          {state?.errors?.description && <p className={styles.error}>{state.errors.description}</p>}
        </label>

        <label>
          Tags (comma separated)
          <input name="tags" type="text" placeholder="ex. React, Nextjs, TailwindCSS, ..." defaultValue={formPreview.tags} required
            onChange={(e) => {
              const tags = e.target.value.split(",").map(tag => tag.trim());
              setFormPreview(prev => ({ ...prev, tags }));
            }}
            
          />
          {state?.errors?.tags && <p className={styles.error}>{state.errors.tags}</p>}
        </label>

        <label>
          Release Date (Optional If Released)
          <input
            name="publishedAt"
            type="date"
            defaultValue={formPreview.publishedAt ? formPreview.publishedAt.toISOString().split("T")[0] : ""}
          />
          {state?.errors?.publishedAt && <p className={styles.error}>{state.errors.publishedAt}</p>}
        </label>

        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        {state?.errors?.image && <p className={styles.error}>{state.errors.image}</p>}

        {state?.message && <p className={styles.error}>{state.message}</p>}
        <button type="submit" disabled={pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <aside className={styles.preview_pane}>
        <h2>Live Preview</h2>
        <PreviewProjectCard project={formPreview} />
        {mode === "edit" && <button
          type="button"
          onClick={async () => {
            if (!confirm("Are you sure you want to delete this project?")) return;

            if (initial) {
              try {
                await deleteProject(initial.id); // call your function
                alert("Project deleted!");
                setContent(null)
              } catch (err) {
                console.error(err);
                alert("Failed to delete project.");
              }
            }
          }}
        >
          Delete Project
        </button>}
      </aside>
    </div>
  );
}
