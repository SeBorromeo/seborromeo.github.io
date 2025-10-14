import { prisma } from '@/lib/prisma';
import Tags from '@/components/ui/Tags/Tags';
import MaskedTextReveal from '@/components/ui/animations/MaskedTextReveal/MaskedTextReveal';
import Image from 'next/image';
import FadeInDiv from './../../ui/animations/FadeInDiv/FadeInDiv';

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
                <FadeInDiv>
                    <h1>EXPERIENCE</h1>
                </FadeInDiv>
                {experiences.map((exp: Experience) => (
                    <div key={exp.id} className={styles.experience_row}>
                        <div className={styles.text_section}>
                            {/* Date and tags */}
                            <FadeInDiv className={styles.date}>
                                <p>
                                    {exp.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric'})} - {exp.endDate ? exp.endDate.toLocaleString('en-US', { month: 'short', year: 'numeric'}) : "Present"}
                                </p>
                            </FadeInDiv>
                            
                            <FadeInDiv className={styles.tags}>
                                <Tags list={exp.skills} />
                            </FadeInDiv>

                            {/* Role, company, description */}
                            <MaskedTextReveal>
                                <h3 className={styles.company_and_role}>{exp.role} <span className={styles.company}>@ <a href={exp.companyUrl} target="_blank" rel="noreferrer">{exp.company}</a></span></h3>
                            </MaskedTextReveal>

                            <ul className={styles.role_description_list}>
                                {exp.description.map((item, i) => (
                                <FadeInDiv key={i}>
                                    <li key={i}>{item}</li>
                                </FadeInDiv>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.logo_section}>
                            <div className={styles.logo_container}>
                                <Image
                                    fill
                                    src={exp.logoUrl}
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
