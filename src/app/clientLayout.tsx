'use client';

import '../styles/globals.scss';
import React, { useEffect } from 'react';
import { getThemeSetting } from '../services/theme';
import {
  BackToTopComponent,
  FooterComponent,
  HeaderComponent
} from '../components/components';
import {
  headerItems,
  footerItems,
  copyrights
} from '../../config';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    let theme = getThemeSetting();
    const body = document.body;
    body.setAttribute('data-theme', theme);
  });
  return (
    <>
      <HeaderComponent
        items={headerItems}
      />
      <> {children} </>
      <BackToTopComponent />
      <FooterComponent
        copyrights={copyrights}
        items={footerItems}
      />
    </>
  )
};
