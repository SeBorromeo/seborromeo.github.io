"use client";

import { useActionState, useEffect, useRef } from "react";
import { useModal } from "@/components/layout/ModalProvider/Modal";
import { Experience } from "@/components/home/Experience/Experience";
import { createExperience, deleteExperience, updateExperience } from "@/app/actions/experiences";

import styles from "./ExperiencesEditor.module.scss";

type ExperiencesEditorProps =
  | { mode?: "create"; initial?: undefined }   
  | { mode: "edit"; initial: Experience };

export default function ExperiencesEditor({ initial, mode = 'create' }: ExperiencesEditorProps) {
  let serverAction: (prevState: any, formData: FormData) => Promise<any> = createExperience;
  if (mode === 'edit') {
    serverAction = updateExperience;
  }

  const [state, action, pending] = useActionState(serverAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const { setContent } = useModal();
  
  // Prevent form reset on submission 
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

  // Handle file change/upload
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2 MB
        alert("File too large (max 2MB).");
        e.target.value = "";
        return;
      }
    }
  }

  return (
    <div className={styles.editor_wrapper}>
      <form action={action} className={styles.experienceForm} ref={formRef}>
        <h1>{mode === "create" ? "Create Experience" : "Edit Experience"}</h1>
        <input type="hidden" name="experienceId" value={initial?.id} />

        <label>
          Role
          <input name="role" type="text" placeholder="Role" defaultValue={initial?.role} required />
          {state?.errors?.role && <p className={styles.error}>{state.errors.role}</p>}
        </label>

        <label>
          Company
          <input name="company" type="text" placeholder="Company" defaultValue={initial?.company} required />
          {state?.errors?.company && <p className={styles.error}>{state.errors.company}</p>}
        </label>

        <label>
          Company URL
          <input name="companyUrl" type="url" placeholder="Enter URL..." defaultValue={initial?.companyUrl} required />
          {state?.errors?.companyUrl && <p className={styles.error}>{state.errors.companyUrl}</p>}
        </label>

				{/* TODO: Figure out string array */}
        <label>
          Description
          <textarea name="description" placeholder="Description" defaultValue={initial?.description} required />
          {state?.errors?.description && <p className={styles.error}>{state.errors.description}</p>}
        </label>

        <label>
          Skills (comma separated)
          <input name="skills" type="text" placeholder="ex. Leadership, React, TailwindCSS, ..." defaultValue={initial?.skills} required />
          {state?.errors?.skills && <p className={styles.error}>{state.errors.skills}</p>}
        </label>

        <label>
          Start Date
          <input
            name="startDate"
            type="month"
            defaultValue={initial?.startDate.toISOString().split("T")[0]}
          />
          {state?.errors?.startDate && <p className={styles.error}>{state.errors.startDate}</p>}
        </label>

        <label>
          End Date (Optional)
          <input
            name="endDate"
            type="month"
            defaultValue={initial?.endDate?.toISOString().split("T")[0]}
          />
          {state?.errors?.endDate && <p className={styles.error}>{state.errors.endDate}</p>}
        </label>

        <input type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
        {state?.errors?.logo && <p className={styles.error}>{state.errors.logo}</p>}

        {state?.message && <p className={styles.error}>{state.message}</p>}
        <button type="submit" disabled={pending}>
          {mode === 'edit' ?
            (pending ? 'Saving...' : 'Save')
            : 
            (pending ? 'Submitting...' : 'Submit')
          }
        </button>
      </form>

			{mode === "edit" && <button
				type="button"
				onClick={async () => {
					if (!confirm("Are you sure you want to delete this experience?")) return;

					if (initial) {
						try {
							await deleteExperience(initial.id);
							alert("Project deleted!");
							setContent(null)
						} catch (err) {
							console.error(err);
							alert("Failed to delete project.");
						}
					}
				}}
			>
				Delete Experience
			</button>}
    </div>
  );
}
