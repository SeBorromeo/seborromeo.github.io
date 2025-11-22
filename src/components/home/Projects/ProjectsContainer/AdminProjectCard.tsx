'use client';

import ProjectCardContent from "./ProjectCardContent";
import { Project } from "../Projects";
import { useModal } from "@/components/layout/ModalProvider/Modal";

import styles from '../Projects.module.scss';

export const AdminProjectCard = ({ project }: { project: Project }) => {
    const { setContent } = useModal();

	return (
		<div className={styles.card} onClick={() => {
            setContent(
                <button onClick={() => setContent(null)} >Close Modal</button>
            )}}
        >
			<ProjectCardContent project={project} />
		</div>
	);
};
