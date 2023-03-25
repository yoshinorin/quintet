import Document, { Html, Head, Main, NextScript } from 'next/document';
import { lang } from '../config';

class MyDocument extends Document {
  render() {
    let theme = 'light';
    try {
      theme = localStorage.getItem('theme');
    } catch(e) {
      // Nothing to do
    };
    return (
      <Html lang={lang}>
        <Head />
        <body data-theme={`${theme}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument
