import React from 'react';
import ClientLayout from './clientLayout';
import { getThemeSetting } from '../services/theme';
import { lang } from '../../config';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = getThemeSetting();
  // https://github.com/vercel/next.js/discussions/44506#discussioncomment-7901181
  return (
    <html lang={lang}>
      <body data-theme={`${theme}`}>
        <ClientLayout>
          { children }
        </ClientLayout>
      </body>
    </html>
  );
};
