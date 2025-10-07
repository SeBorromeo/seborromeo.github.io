import { prisma } from '@/lib/prisma';

import styles from './Experience.module.scss';

export type Experience = {
    id: string;
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date | null;
    description: string;
    logoUrl: string;
    createdAt: Date;
    updatedAt: Date;
    skills: string[];
};

export default async function Experience() {
    const experiences = await prisma.experience.findMany({
        orderBy: { startDate: "desc" }, 
    });

    if (!experiences || !Array.isArray(experiences))
        return <div>No experiences found.</div>;

    return (
        <section className={styles.experience_section}>
            <div className={styles.experience_logos_column_bg}/>
            <div className={styles.experience_column}>
                    {experiences.map((exp: Experience) => (
                        <div key={exp.id} className={styles.experience_card}>
                        <h3>{exp.role} @ {exp.company}</h3>
                        <p>{exp.description}</p>
                        <p>Skills: {exp.skills.join(", ")}</p>
                        </div>
                    ))}
            </div>

        </section>
    );
};
