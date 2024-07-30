"use client";

import React, { useEffect } from "react";
import { copyrights, footerItems, headerItems } from "../../config";
import {
  BackToTopComponent,
  FooterComponent,
  HeaderComponent
} from "../components/components";
import { getTheme } from "../services/theme";
import "../styles/globals.scss";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const theme = getTheme();
    document.body.setAttribute("data-theme", theme);
  });
  return (
    <>
      <HeaderComponent items={headerItems} />
      <> {children} </>
      <BackToTopComponent />
      <FooterComponent copyrights={copyrights} items={footerItems} />
    </>
  );
}
