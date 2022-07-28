import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';

import axios from 'axios';
import styles from '../styles/pages/Leaderboard.module.css';
import { LeftMenu } from '../components/LeftMenu';
import Loading from '../components/Loading';

export default function Leaderboard(): ReactElement {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

        {isLoading ? (
          <div className="loading-wrapper">
            <Loading />
          </div>
        ) : (
          users.map((user, index) => (
            <div className={styles.card} key={user.id}>
              <div className={styles.position}>
                <p>{index + 1}</p>
              </div>

              <div className={styles.profile}>
                <img src={user.image} alt={`Imagem de ${user.name}`} />
                <div>
                  <strong>{user.name}</strong>
                  <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {user.level}
                  </p>
                </div>
              </div>

              <div className={`${styles.item} ${styles.challenges}`}>
                <span>{user.challengesCompleted}</span>
                <p>completados</p>
              </div>

              <div className={`${styles.item} ${styles.experience}`}>
                <span>{user.totalExperience}</span>
                <p>xp</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
