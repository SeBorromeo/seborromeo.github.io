'use client';

import { useModal } from "@/components/layout/ModalProvider/Modal";
import ExperiencesEditor from "./ExperiencesEditor";
import { Experience } from "@/components/home/Experience/Experience";

export default function ExperienceButton({ experience }: { experience?: Experience }) {
    const { setContent } = useModal();
    
    return (
        <button onClick={() => {
            setContent(
                <>
                    <button onClick={() => setContent(null)}>Close Modal</button>
                    {experience ?
                        <ExperiencesEditor initial={experience} mode={'edit'} />
                        :
                        <ExperiencesEditor />
                    }
                </>
            )}}
        >
            {experience ? 'Edit Experience' : 'Add New Experience'}
        </button>
    );
}