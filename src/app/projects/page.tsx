import Tags, { TagTheme } from "@/components/ui/Tags/Tags";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProjectsTablePage () {
    const projects = await prisma.projects.findMany({
        orderBy: { publishedAt: "desc" }, 
    });
    
    return (
        <section style={{ padding: '2rem' }}>
            <Link href="/">← Sebastian Borromeo</Link>
            <h1>All Projects</h1>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Project</th>
                        <th>Built with</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.slug} style={{ marginBottom: '2rem' }}>
                            <td><div>{project.publishedAt ? project.publishedAt.getFullYear() : 'In Progress'}</div></td>
                            <td>{project.name}</td>
                            <td><Tags list={project.tags} theme={TagTheme.WhiteOutline}/></td>
                            <td>
                                <a href={project.demoUrl || project.repoUrl} target="_blank" rel="noreferrer">
                                    {project.demoUrl ? "Live Demo" : "Source Code"}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}