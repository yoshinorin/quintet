import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header';
import Footer from '../components/footer';
import BackToTop from '../components/backtotop';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <BackToTop />
      <Footer />
    </>
  )
}
export default MyApp
