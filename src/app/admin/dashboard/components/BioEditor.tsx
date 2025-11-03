'use client'

import { useState } from 'react';
import { updateBio } from '@/app/actions/bio';
import { RichTextNode } from '@/types/richText';
import { Paragraph } from '@/components/home/Bio/BioParagraph/BioParagraph';

import styles from './BioEditor.module.scss';

export default function BioEditor({ initialParagraphs }: { initialParagraphs: Paragraph[] }) {
    const [paragraphs, setParagraphs] = useState<Paragraph[]>(initialParagraphs);

    const handleTextChange = (paraIdx: number, nodeIdx: number, text: string) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[paraIdx][nodeIdx].text = text;
        setParagraphs(newParagraphs);
    };

    const handleLinkChange = (paraIdx: number, nodeIdx: number, url: string) => {
        const newParagraphs = [...paragraphs];
        const node = newParagraphs[paraIdx][nodeIdx];
        if (node.type === 'link') node.url = url;
        setParagraphs(newParagraphs);
    };

    const addParagraph = () => {
        setParagraphs([...paragraphs, [{ type: 'text', text: '' }]]);
    };

    const deleteParagraph = (paraIdx: number) => {
        const newParagraphs = paragraphs.filter((_, i) => i !== paraIdx);
        setParagraphs(newParagraphs);
    };

    const addNode = (paraIdx: number, type: RichTextNode['type'] = 'text') => {
        const newParagraphs = [...paragraphs];
        if (type === 'link') {
            newParagraphs[paraIdx].push({ type: 'link', text: '', url: '' });
        } else {
            newParagraphs[paraIdx].push({ type, text: '' });
        }
        setParagraphs(newParagraphs);
    };

    const handleSubmit = async () => {
        try {
            await updateBio(paragraphs);
            alert('Bio saved!');
        } catch (err) {
            console.error(err);
            alert('Failed to save bio.');
        }
    };

    return (
        <div className={styles.editor}>
            {paragraphs.map((para, paraIdx) => (
                <div key={paraIdx} className={styles.paragraph}>
                    {para.map((node, nodeIdx) => (
                        <div key={nodeIdx} className={styles.node}>
                            {node.type === 'link' ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Text"
                                        value={node.text}
                                        onChange={(e) => handleTextChange(paraIdx, nodeIdx, e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={node.url}
                                        onChange={(e) => handleLinkChange(paraIdx, nodeIdx, e.target.value)}
                                    />
                                </>
                            ) : (
                                <input
                                    type="text"
                                    value={node.text}
                                    placeholder={node.type}
                                    onChange={(e) => handleTextChange(paraIdx, nodeIdx, e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    <div className={styles.nodeButtons}>
                        <button type="button" onClick={() => addNode(paraIdx, 'text')}>+ Text</button>
                        <button type="button" onClick={() => addNode(paraIdx, 'bold')}>+ Bold</button>
                        <button type="button" onClick={() => addNode(paraIdx, 'italic')}>+ Italic</button>
                        <button type="button" onClick={() => addNode(paraIdx, 'link')}>+ Link</button>
                        <button type="button" onClick={() => deleteParagraph(paraIdx)} className={styles.deleteBtn}>
                            Delete Paragraph
                        </button>
                    </div>
                </div>
            ))}

            <div className={styles.footer}>
                <button type="button" onClick={addParagraph}>+ Paragraph</button>
                <button type="button" onClick={handleSubmit} className={styles.saveBtn}>Save Bio</button>
            </div>
        </div>
    );
}
