import '../styles/globals.scss';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { getThemeSetting } from '../services/theme';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import BackToTopComponent from '../components/backtotop';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let theme = getThemeSetting();
    const body = document.body;
    body.setAttribute('data-theme', theme);
  });
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
      <BackToTopComponent />
      <FooterComponent />
    </>
  )
}
export default MyApp
