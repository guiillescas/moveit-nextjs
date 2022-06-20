import React, { ReactElement, useState } from 'react';
import { signIn } from 'next-auth/client';

import styles from '../styles/pages/Signin.module.css';
import Loading from '../components/Loading';

export enum LoginTypeEnum {
  GITHUB = 'github',
  GMAIL = 'gmail',
}

interface ILoadingProps {
  isLoading: boolean;
  type: LoginTypeEnum | null;
}

export default function SignIn(): ReactElement {
  const [loading, setLoading] = useState<ILoadingProps | null>(null);

  async function handleLogin(type: LoginTypeEnum) {
    setLoading({
      isLoading: true,
      type,
    });

    await signIn(type, {
      redirect_uri: 'http://localhost:3000/',
      // redirect_uri: 'https://moveit.guilhermeillescas.dev/',
    });

    setTimeout(() => {
      setLoading({
        isLoading: false,
        type: null,
      });
    }, 3000);
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

        <button
          type="button"
          onClick={() => handleLogin(LoginTypeEnum.GITHUB)}
          disabled={
            loading?.isLoading && loading?.type === LoginTypeEnum.GITHUB
          }
        >
          {loading?.isLoading && loading?.type === LoginTypeEnum.GITHUB ? (
            <Loading />
          ) : (
            'Entrar com GitHub'
          )}
        </button>
        <button
          type="button"
          onClick={() => handleLogin(LoginTypeEnum.GMAIL)}
          className={styles.secondButton}
          disabled={loading?.isLoading && loading?.type === LoginTypeEnum.GMAIL}
        >
          {loading?.isLoading && loading?.type === LoginTypeEnum.GMAIL ? (
            <Loading />
          ) : (
            'Entrar com Gmail'
          )}
        </button>
      </div>
    </div>
  );
}
