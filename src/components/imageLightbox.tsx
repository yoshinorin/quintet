"use client";

import { useEffect, useRef } from "react";
import styles from "../styles/components/imageLightbox.module.scss";

export interface ZoomedImage {
  src: string;
  alt: string;
}

export const ImageLightbox: React.FunctionComponent<{
  image: ZoomedImage | null;
  onClose: () => void;
}> = ({ image, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (image) {
      if (!dialog.open) {
        dialog.showModal();
      }
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [image]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      onClose={onClose}
      onClick={onClose}>
      {image && <img src={image.src} alt={image.alt} />}
    </dialog>
  );
};
