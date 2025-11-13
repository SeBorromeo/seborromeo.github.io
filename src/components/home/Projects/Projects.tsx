import { prisma } from '@/lib/prisma';
import ProjectsContainer from './ProjectsContainer/ProjectsContainer';
import Button, { ButtonTheme } from '@/components/ui/Button/Button';
import UnderlineHeading from '@/components/ui/animations/UnderlineHeading/UnderlineHeading';
import { ProjectCard } from './ProjectsContainer/ProjectCard';

import styles from './Projects.module.scss';

export type Project = {
	name: string;
	slug: string;
	demoUrl?: string | null;
	repoUrl: string;
	description: string;
	publishedAt: Date | null;
	tags: string[];
	imageUrl: string;
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
