import Tags, { TagTheme } from "@/components/ui/Tags/Tags";
import { prisma } from "@/lib/prisma";
import PageTransitionLink from "@/components/layout/page-transition/PageTransitionLink";

import styles from './projects.module.scss';

export default async function ProjectsTablePage () {
    const projects = await prisma.projects.findMany({
        orderBy: { publishedAt: "desc" }, 
    });
    
    return (
        <main className={styles.main}>
            <PageTransitionLink href="/">← Back to Portfolio</PageTransitionLink>
            <h1>All Projects</h1>
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th className={styles.year}>Year</th>
                        <th>Project</th>
                        <th className={styles.tags}>Built with</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.slug}>
                            <td className={styles.year}>{project.publishedAt ? project.publishedAt.getFullYear() : 'In Progress'}</td>
                            <td className={styles.project}>{project.name}</td>
                            <td className={styles.tags}><Tags list={project.tags} theme={TagTheme.WhiteOutline}/></td>
                            <td>
                                <a className={styles.link} href={project.demoUrl || project.repoUrl} target="_blank" rel="noreferrer">
                                    <span>
                                        {project.demoUrl ? project.demoUrl.replace(/^https?:\/\//, '') : "Source Code"}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}