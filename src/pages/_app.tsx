/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'next-themes';
import { useSession } from 'next-auth/client';

import SignIn from './signin';

import '../styles/global.css';

function MyApp({ Component, pageProps }: any): ReactElement {
  const [session] = useSession();

  return (
    <ThemeProvider>
      {!session ? <SignIn /> : <Component {...pageProps} session={session} />}
    </ThemeProvider>
  );
}

export default MyApp;
