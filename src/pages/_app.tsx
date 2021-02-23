/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import '../styles/global.css';

function MyApp({ Component, pageProps }: any): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
