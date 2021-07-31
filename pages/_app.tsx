import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import BackToTopComponent from '../components/backtotop';

function MyApp({ Component, pageProps }: AppProps) {
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
