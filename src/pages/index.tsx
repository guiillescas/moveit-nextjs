import React, { ReactElement } from 'react';
import Head from 'next/head';

import styles from '../styles/pages/Leaderboard.module.css';
import { LeftMenu } from '../components/LeftMenu';

export default function Leaderboard(): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard | move.it</title>
      </Head>

      <LeftMenu />

      <h1>Leaderboard</h1>

      <div className={styles.table}>
        <div className={styles.titles}>
          <p>POSIÇÃO</p>
          <p>USUÁRIO</p>
          <p>DESAFIOS</p>
          <p>EXPERIÊNCIA</p>
        </div>

        <div className={styles.card}>
          <div className={styles.position}>
            <p>1</p>
          </div>

          <div className={styles.profile}>
            <img src="https://github.com/guillescas.png" alt="Imagem de Guilherme Illescas" />
            <div>
              <strong>Guilherme Illescas</strong>
              <p>
                <img src="icons/level.svg" alt="Level" />
                Level
                {' '}
                2
              </p>
            </div>
          </div>

          <div className={`${styles.item} ${styles.challenges}`}>
            <span>127</span>
            <p>completados</p>
          </div>

          <div className={`${styles.item} ${styles.experience}`}>
            <span>150000</span>
            <p>xp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
