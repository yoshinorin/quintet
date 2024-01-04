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
