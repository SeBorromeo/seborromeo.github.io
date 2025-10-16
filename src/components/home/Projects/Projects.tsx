import { prisma } from '@/lib/prisma';
import FadeInDiv from '@/components/ui/animations/FadeInDiv/FadeInDiv';
import ProjectsContainer from './ProjectsContainer/ProjectsContainer';
import Tags, { TagTheme } from '@/components/ui/Tags/Tags';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';

import styles from './Projects.module.scss';

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
		<section id="projects" className={styles.projects_section}>
			<FadeInDiv>
				<h1>PROJECTS</h1>
			</FadeInDiv>
			<ProjectsContainer>
				{projects.map((project, index) => (
					<ProjectCard project={project} key={index} />
				))}
			</ProjectsContainer>
			<Button href="/projects" className={styles.resume_button}>
				VIEW ALL
			</Button>
		</section>
    );
}

const ProjectCard = ({ project }: { project: Project}) => {
	return (
		<a href={project.demoUrl || project.repoUrl} className={styles.card} target="_blank" rel="noreferrer">
			<div className={styles.card_content}>
				<div className={styles.card_image}>
					<Image src={project.imageUrl} alt={project.name} fill/>
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
