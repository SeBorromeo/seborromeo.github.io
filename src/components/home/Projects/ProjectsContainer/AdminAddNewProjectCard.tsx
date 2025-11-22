'use client';

import { useModal } from '@/components/layout/ModalProvider/Modal';
import ProjectsEditor from '@/app/admin/dashboard/_components/ProjectsEditor/ProjectsEditor';

import styles from '../Projects.module.scss';

export default function AdminAddNewProjectCard() {
    const { setContent } = useModal();

    return (
        <div className={styles.add_project_card} onClick={() => {
            setContent(
                <>
                    <button onClick={() => setContent(null)}>Close Modal</button>
                    <ProjectsEditor />
                </>
            )}}
        >
            <p>+ Add New Project</p>
        </div>
    );
}