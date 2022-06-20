import React, { ReactElement } from 'react';
import { signIn } from 'next-auth/client';

import styles from '../styles/pages/Signin.module.css';

export default function SignIn(): ReactElement {
  return (
    <div className={styles.container}>
      <img src="/giant-logo.svg" alt="Logo pequena moveit" />

      <div className={styles.card}>
        <img src="/logo-full-white.svg" alt="Logo moveit" />

        <h2>Bem-vindo!</h2>

        <div className={styles.info}>
          <img src="/github.svg" alt="Logo GitHub" />

          <p>Faça login com seu GitHub para começar</p>
        </div>

        <button
          type="button"
          onClick={() => {
            signIn('github', { redirect_uri: 'https://moveit.guilhermeillescas.dev/' });
          }}
        >
          Entrar no move.it
        </button>
      </div>
    </div>
  );
}
