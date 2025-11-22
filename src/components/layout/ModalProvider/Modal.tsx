"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollControl } from "../SmoothScrollLayout/SmoothScrollLayout";

import styles from "./Modal.module.scss";

interface ModalContextType {
    setContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const { disableScroll } = useScrollControl();
    const [content, setContent] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (content) {
            disableScroll(true);
        } else {
            disableScroll(false);
        }
    }, [content, disableScroll]);

    return (
        <ModalContext.Provider value={{ setContent }}>
        {children}

        {content && createPortal(
            <div className={styles.backdrop}>
                <div className={styles.modal_box}>{content}</div>
            </div>,
            document.body
        )}
        </ModalContext.Provider>
    );
}

export function useModal(): ModalContextType {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
