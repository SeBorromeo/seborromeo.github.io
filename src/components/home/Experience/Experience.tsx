import { prisma } from '@/lib/prisma';
import Tags from '@/components/ui/Tags/Tags';
import MaskedTextReveal from '@/components/ui/animations/MaskedTextReveal/MaskedTextReveal';
import Image from 'next/image';
import FadeInDiv from './../../ui/animations/FadeInDiv/FadeInDiv';

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
                <FadeInDiv>
                    <h1>EXPERIENCE</h1>
                </FadeInDiv>
                {experiences.map((exp: Experience) => (
                    <div key={exp.id} className={styles.experience_row}>
                        <div className={styles.text_section}>
                            {/* Date and tags */}
                            <FadeInDiv className={styles.time_tags_column}>
                                <p className={styles.date_text}>{exp.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric'})} - {exp.endDate ? exp.endDate.toLocaleString('en-US', { month: 'short', year: 'numeric'}) : "Present"}</p>
                                <Tags list={exp.skills} />
                            </FadeInDiv>

                            {/* Role, company, description */}
                            <div className={styles.role_description_column}>
                                <MaskedTextReveal>
                                    <h3>{exp.role} <span className={styles.company}>@ {exp.company}</span></h3>
                                </MaskedTextReveal>
                                <MaskedTextReveal>
                                    <p>{exp.description}</p>
                                </MaskedTextReveal>
                            </div>
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
