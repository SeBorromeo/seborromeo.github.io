import Tags, { TagTheme } from "@/components/ui/Tags/Tags";
import Image from "next/image";
import { Project } from "../Projects";
import { GitHubButton } from "../GitHubButton/GitHubButton";

import styles from '../Projects.module.scss';

export const ProjectCard = ({ project }: { project: Project}) => {
	return (
		<a href={project.demoUrl || project.repoUrl} className={styles.card} target="_blank" rel="noopener noreferrer">
			<div className={styles.card_content}>
				<div className={styles.card_image}>
					{project.imageUrl && <Image src={project.imageUrl} alt={project.name} fill sizes='100%, 100%'/>}
					{project.demoUrl && project.repoUrl && <GitHubButton url={project.repoUrl}/> }
				</div>
				<div className={styles.card_text_container}>
					<h2>{project.name}</h2>
					<p>{project.description}</p>
					<Tags list={project.tags} theme={TagTheme.WhiteOutline}/>
				</div>
			</div>
		</a>
	);
};
