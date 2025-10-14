import { prisma } from '@/lib/prisma';
import FadeInDiv from '@/components/ui/animations/FadeInDiv/FadeInDiv';
import ProjectsContainer from './ProjectsContainer/ProjectsContainer';

import styles from './Projects.module.scss';
import Tags from '@/components/ui/Tags/Tags';

export type Project = {
	id: string;
	name: string;
	slug: string;
	demoUrl?: string | null;
	repoUrl: string;
	description: string;
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
		<section className={styles.projects_section}>
			<FadeInDiv>
				<h1>PROJECTS</h1>
			</FadeInDiv>
			<ProjectsContainer>
				{projects.map((project, index) => (
					<ProjectCard project={project} key={index} />
				))}
			</ProjectsContainer>
		</section>
    );
}

const ProjectCard = ({ project }: { project: Project}) => {
	return (
		<div className={styles.card}>
			<div className={styles.card_content}>
				<h2>{project.name}</h2>
				<p>{project.description}</p>
				<Tags list={project.tags} />
			</div>
		</div>
	);
};
