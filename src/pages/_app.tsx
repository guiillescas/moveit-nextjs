/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'next-themes';

import '../styles/global.css';

function MyApp({ Component, pageProps }: any): ReactElement {
  return (
    <ThemeProvider defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
