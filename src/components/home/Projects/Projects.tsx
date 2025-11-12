import { prisma } from '@/lib/prisma';
import ProjectsContainer from './ProjectsContainer/ProjectsContainer';
import Tags, { TagTheme } from '@/components/ui/Tags/Tags';
import Image from 'next/image';
import Button, { ButtonTheme } from '@/components/ui/Button/Button';
import UnderlineHeading from '@/components/ui/animations/UnderlineHeading/UnderlineHeading';

import styles from './Projects.module.scss';

export type Project = {
	id: string;
	name: string;
	slug: string;
	demoUrl?: string | null;
	repoUrl: string;
	description: string;
	publishedAt: Date | null;
	tags: string[];
	imageUrl: string;
	order: number;
	createdAt: Date;
	updatedAt: Date;
};

export default async function Projects () {
	const projects = await prisma.projects.findMany({
		orderBy: { order: "asc" }, 
	});
	
    return (
		<section id="projects" className={styles.projects_section}>
			<UnderlineHeading text={'PROJECTS'} />
			<ProjectsContainer>
				{projects.map((project, index) => (
					<ProjectCard project={project} key={index} />
				))}
			</ProjectsContainer>
			<div className={styles.view_all_button_container}>
				<Button href="/projects" className={styles.view_all_button} theme={ButtonTheme.White}>
					VIEW ALL
				</Button>
			</div>
		</section>
    );
}

const ProjectCard = ({ project }: { project: Project}) => {
	return (
		<a href={project.demoUrl || project.repoUrl} className={styles.card} target="_blank" rel="noreferrer">
			<div className={styles.card_content}>
				<div className={styles.card_image}>
					<Image src={project.imageUrl} alt={project.name} fill sizes='100%, 100%'/>
					{project.demoUrl && project.repoUrl && <a href={project.repoUrl} className={styles.card_github_icon}>
						<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<title>GitHub</title>
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
						</svg>
					</a>}
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
