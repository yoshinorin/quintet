import Document, { Html, Head, Main, NextScript } from 'next/document';
import { lang } from '../config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument
