"use client";

import React, { useEffect } from "react";
import { copyrights, footerItems, headerItems } from "../../config";
import {
  BackToTopComponent,
  FooterComponent,
  HeaderComponent
} from "../components/components";
import {
  getTheme,
  getSyntaxTheme,
  getEffectiveSyntaxTheme
} from "../services/theme";
import "../styles/globals.scss";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const theme = getTheme();
    const syntaxTheme = getSyntaxTheme();
    const effectiveSyntaxTheme = getEffectiveSyntaxTheme(syntaxTheme, theme);
    document.body.setAttribute("data-theme", theme);
    document.documentElement.setAttribute(
      "data-syntax-theme",
      effectiveSyntaxTheme
    );
  }, []);
  return (
    <>
      <HeaderComponent items={headerItems} />
      <> {children} </>
      <BackToTopComponent />
      <FooterComponent copyrights={copyrights} items={footerItems} />
    </>
  );
}
