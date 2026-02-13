"use client";

import dynamic from "next/dynamic";

// Dynamic import with NODE_ENV check ensures dev-only components like ReloadBrowser
// are completely excluded from the production bundle via tree-shaking.
// This wrapper exists because layout.tsx is a Server Component, where
// next/dynamic with { ssr: false } is not allowed.
const ReloadBrowser =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./ReloadBrowser"), { ssr: false })
    : () => null;

export default function DevTools() {
  return <ReloadBrowser />;
}
