/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'next-themes';

import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }: any): ReactElement {
  return (
    <ThemeProvider defaultTheme="system">
      <ChallengesProvider>
        <Component {...pageProps} />
      </ChallengesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
