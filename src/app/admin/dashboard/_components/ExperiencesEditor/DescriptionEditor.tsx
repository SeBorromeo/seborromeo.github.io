'use client';

import { useState } from "react";

import styles from "./ExperiencesEditor.module.scss";

export default function DescriptionEditor({ initialDescriptions = [], errors }: { initialDescriptions: string[] | undefined, errors?: any }) {
  const [descriptions, setDescriptions] = useState<string[]>(initialDescriptions);

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const updateDescription = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const deleteDescription = (index: number) => {
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDescriptions);
  };

  return (
    <label>
      Description
      {descriptions.map((bulletPoint, index) => (
        <div key={index} className={styles.descriptionItem}>
          <textarea
            name="description"
            placeholder="Enter Text..."
            value={bulletPoint}
            onChange={(e) => updateDescription(index, e.target.value)}
            maxLength={500}  
            required
          />
          <p>{500 - bulletPoint.length} characters left</p>
          <button
            type="button"
            onClick={() => deleteDescription(index)}
            className={styles.deleteButton}
          >
            Delete
          </button>
          {errors && (
            <p className={styles.error}>{errors}</p>
          )}
        </div>
      ))}
      <button type="button" onClick={addDescription} className={styles.addButton}>
        Add Description
      </button>
    </label>
  );
}
