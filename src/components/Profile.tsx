import React, { ReactElement, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(): ReactElement {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/guillescas.png" alt="Imagem de Guilherme Illescas" />
      <div>
        <strong>Guilherme Illescas</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level
          {' '}
          {level}
        </p>
      </div>
    </div>
  );
}
