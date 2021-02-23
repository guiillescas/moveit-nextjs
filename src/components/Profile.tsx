import React, { ReactElement } from 'react';
import styles from '../styles/components/Profile.module.css';

export function Profile(): ReactElement {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/guillescas.png" alt="Imagem de Guilherme Illescas" />
      <div>
        <strong>Guilherme Illescas</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
