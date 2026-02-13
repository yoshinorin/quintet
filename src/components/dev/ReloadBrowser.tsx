"use client";

import { useEffect } from "react";

export default function ReloadBrowser() {
  useEffect(() => {
    const es = new EventSource("/api/dev/reload");
    es.onmessage = (e) => {
      if (e.data === "reload") window.location.reload();
    };
    return () => es.close();
  }, []);

  return null;
}
