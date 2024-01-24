'use client';

import '../styles/globals.scss';
import React, { useEffect } from 'react';
import { getThemeSetting } from '../services/theme';
import { HeaderComponent } from '../components/header';
import { FooterComponent } from '../components/footer';
import BackToTopComponent from '../components/backtotop';

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
      <HeaderComponent />
      <> {children} </>
      <BackToTopComponent />
      <FooterComponent />
    </>
  )
};
