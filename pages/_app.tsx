import '../styles/globals.scss';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import BackToTopComponent from '../components/backtotop';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let theme = 'light';
    try {
      theme = localStorage.getItem('theme');
    } catch(e) {
      // Nothing to do
    };
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
