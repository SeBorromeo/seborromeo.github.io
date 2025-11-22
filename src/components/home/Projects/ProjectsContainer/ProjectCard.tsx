import ProjectCardContent from "./ProjectCardContent";
import { Project } from "../Projects";

import styles from '../Projects.module.scss';

export const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<a href={project.demoUrl || project.repoUrl} className={styles.card} target="_blank" rel="noopener noreferrer">
			<ProjectCardContent project={project} />
		</a>
	);
};
