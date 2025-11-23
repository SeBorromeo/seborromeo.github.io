'use client';

import ProjectCardContent from "./ProjectCardContent";
import { Project } from "../Projects";
import { useModal } from "@/components/layout/ModalProvider/Modal";

import styles from '../Projects.module.scss';
import ProjectsEditor from "@/app/admin/dashboard/_components/ProjectsEditor/ProjectsEditor";

export const AdminProjectCard = ({ project }: { project: Project }) => {
    const { setContent } = useModal();

	return (
		<div className={styles.card} onClick={() => {
            setContent(
                <>
                    <button onClick={() => setContent(null)}>Close Modal</button>
                    <ProjectsEditor initial={project} mode="edit" />
                </>
            )}}
        >
			<ProjectCardContent project={project} />
		</div>
	);
};
