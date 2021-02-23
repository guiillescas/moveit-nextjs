import React, { ReactElement } from 'react';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(): ReactElement {
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>5</span>
    </div>
  );
}
