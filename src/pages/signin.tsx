import React, { ReactElement, useState } from 'react';
import { signIn } from 'next-auth/client';

import styles from '../styles/pages/Signin.module.css';
import Loading from '../components/Loading';

export default function SignIn(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);

    await signIn(null, {
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
          <p>Faça login com seu GitHub ou Gmail para começar</p>
        </div>

        <button type="button" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? <Loading /> : 'Fazer login'}
        </button>
      </div>
    </div>
  );
}
