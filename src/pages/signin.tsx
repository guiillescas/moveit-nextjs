import React, { ReactElement, useState } from 'react';
import { signIn } from 'next-auth/client';

import styles from '../styles/pages/Signin.module.css';

export default function SignIn(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(type: string) {
    setIsLoading(true);

    await signIn(type, {
      redirect_uri: 'http://localhost:3000/',
      // redirect_uri: 'https://moveit.guilhermeillescas.dev/',
    });

    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <img src="/giant-logo.svg" alt="Logo pequena moveit" />

      <div className={styles.card}>
        <img src="/logo-full-white.svg" alt="Logo moveit" />

        <h2>Bem-vindo!</h2>

        <div className={styles.info}>
          <p>Faça login com seu GitHub, ou Gmail para começar</p>
        </div>

        <button type="button" onClick={() => handleLogin('github')}>
          {isLoading ? 'opa' : 'Entrar com GitHub'}
        </button>
        <button
          type="button"
          onClick={() => handleLogin('gmail')}
          className={styles.secondButton}
        >
          {isLoading ? 'opa' : 'Entrar com Gmail'}
        </button>
      </div>
    </div>
  );
}
