import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/client';

import Loading from '../components/Loading';

import styles from '../styles/pages/Signin.module.css';

interface ILoadingProps {
  loading: boolean;
  provider: string | null;
}

export default function SignIn(): ReactElement {
  const [isLoading, setIsLoading] = useState<ILoadingProps>({
    loading: false,
    provider: null,
  });

  async function handleLogin(provider: string) {
    setIsLoading({
      loading: true,
      provider,
    });

    await signIn(provider, {
      redirect_uri: 'http://localhost:3000/',
      // redirect_uri: 'https://moveit.guilhermeillescas.dev/',
    });

    setIsLoading({
      loading: false,
      provider: null,
    });
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
          onClick={() => handleLogin('google')}
          disabled={isLoading.loading && isLoading.provider === 'google'}
        >
          {isLoading.loading && isLoading.provider === 'google' ? (
            <Loading />
          ) : (
            <>
              <span>Login com Google</span>
              <Image
                className="image"
                src="/google-logo.png"
                alt="Logo do Google"
                width={32}
                height={32}
              />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleLogin('github')}
          disabled={isLoading.loading && isLoading.provider === 'github'}
        >
          {isLoading.loading && isLoading.provider === 'github' ? (
            <Loading />
          ) : (
            <>
              <span>Login com GitHub</span>
              <div className="image-wrapper">
                <Image
                  src="/github-logo.png"
                  alt="Logo do GitHub"
                  width={32}
                  height={32}
                />
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
