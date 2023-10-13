import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getThemeSetting } from '../services/theme';
import { lang } from '../../config';

class MyDocument extends Document {
  render() {
    const theme = getThemeSetting();
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
