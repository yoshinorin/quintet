import React from 'react';
import { Metadata } from 'next'
import ClientLayout from './clientLayout';
import { getThemeSetting } from '../services/theme';
import {
  siteName,
  mainAuthor,
  lang,
  url,
  locale,
  defaultImage,
} from '../../config';
import HeadMetaComponent from '../components/headmeta';
import { fullUrl, fullUrlWithoutTrailingSlash } from '../utils/url';

export const metadata: Metadata = {
  title: siteName,
  authors: [{ name: mainAuthor }],
  robots: {
    noarchive: true,
    follow: false,
    noimageindex: true,
    index: false
  },
  /* NOTE:
    I don't want insert `twitter:<field>` to head. But how to...???
    If enable openGraph, `twitter:<field>` will be generate automatically.
  */
  openGraph: {
    siteName: siteName,
    locale: locale,
    title: siteName,
    type: 'website',
    url: fullUrl(url),
    images: fullUrlWithoutTrailingSlash(defaultImage)
  },
  // Twitter og will be generate automatically, evenif I set empty object.
  // twitter: {}
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = getThemeSetting();
  // https://github.com/vercel/next.js/discussions/44506#discussioncomment-7901181
  return (
    <html lang={lang}>
      <HeadMetaComponent />
      <body data-theme={`${theme}`}>
        <ClientLayout>
          { children }
        </ClientLayout>
      </body>
    </html>
  );
};
