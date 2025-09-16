
type Project = {
  id: string;
  name: string;
  description?: string; // optional field
};

export default async function Projects() {
    const projects = await getProjects() // fetch API OR
    // const allPosts = await db.select().from(posts) // use ORM
 
    return projects.map((project) => <div key={project.id}>{project.name}</div>)
}


async function getProjects(): Promise<Project[]> {
  const res = await fetch(`https://...`)
  const projects = await res.json()
 
  return projects
}