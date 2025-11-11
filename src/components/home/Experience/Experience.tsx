import { prisma } from '@/lib/prisma';
import Tags from '@/components/ui/Tags/Tags';
import Image from 'next/image';
import UnderlineHeading from '@/components/ui/animations/UnderlineHeading/UnderlineHeading';

import styles from './Experience.module.scss';

export type Experience = {
    id: string;
    company: string;
    companyUrl: string;
    role: string;
    startDate: Date;
    endDate?: Date | null;
    description: string[];
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
        <section id="experience" className={styles.experience_section}>
            <div className={styles.experience_logos_column_bg}/>
            <div className={styles.experience_column}>
                <div className={styles.heading_container}>
                    <UnderlineHeading text={'EXPERIENCE'} />
                </div>
                {experiences.map((exp: Experience) => (
                    <div key={exp.id} className={styles.experience_row}>
                        <div className={styles.text_section}>
                            {/* Date and tags */}
                            <div className={styles.date}>
                                <p>
                                    {exp.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric'})} - {exp.endDate ? exp.endDate.toLocaleString('en-US', { month: 'short', year: 'numeric'}) : "Present"}
                                </p>
                            </div>
                            
                            <div className={styles.tags}>
                                <Tags list={exp.skills} />
                            </div>

                            {/* Role, company, description */}
                            <div>
                                <h3 className={styles.company_and_role}>{exp.role} <span className={styles.company}>@ <a href={exp.companyUrl} target="_blank" rel="noreferrer">{exp.company}</a></span></h3>
                            </div>

                            <div>
                                <ul className={styles.role_description_list}>
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.logo_section}>
                            <div className={styles.logo_container}>
                                <Image
                                    fill
                                    src={exp.logoUrl}
                                    sizes='100%, 100%'
                                    alt="Photo of Sebastian"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
