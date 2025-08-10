"use client";

import { useEffect, useState } from "react";
import { fetchSystemMetadata } from "../api";
import {
  AdjacentContent,
  BackendMeta,
  Content,
  ContentMeta,
  Insight
} from "../models/models";
import buttonStyles from "../styles/actionbutton.module.scss";
import containerStyles from "../styles/components/container.module.scss";
import contentStyles from "../styles/components/content.module.scss";
import { mergeBackendMeta } from "../utils/insight";
import { ActionButton } from "./actionbutton";
import { AdjacentContentComponent } from "./adjacentContent";
import { PreContent } from "./precontent";

export const ContentComponent: React.FunctionComponent<{
  content: Content;
  insight: Insight | null;
  adjacentContent?: AdjacentContent | null;
}> = ({ content, insight, adjacentContent }) => {
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);
  const [attributes, setAttributes] = useState(null);

  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [isFetchedBackendMeta, setIsFetchedBackendMeta] = useState(false);
  const [metadata, setMetaData] = useState(null);

  const [showAdjacentContent, setShowAdjacentContent] = useState(false);

  const formatAttributes = () => {
    let actualRobotsMeta = "";
    let maybeRobotsMeta = document.querySelector('meta[name="robots"]');
    if (maybeRobotsMeta) {
      const unsortedActualRobotsMeta = maybeRobotsMeta
        .getAttribute("content")
        .split(",")
        .map((r) => r.trim());
      // TODO: write test code
      const isSorted = (arr) =>
        arr.every((v, idx) => idx === 0 || v >= arr[idx - 1]);
      // @ts-ignore
      const x = isSorted(unsortedActualRobotsMeta)
        ? unsortedActualRobotsMeta
        : [...unsortedActualRobotsMeta].sort();
      actualRobotsMeta = x.join(", ");
    }

    const meta: ContentMeta = {
      id: content.id,
      robots: {
        diff: !(actualRobotsMeta === content.robotsAttributes),
        actual: actualRobotsMeta,
        expected: content.robotsAttributes
      },
      tags: content.tags,
      words: content.length,
      shouldInjectResources: content.externalResources,
      authorName: content.authorName,
      publishedAt: content.publishedAt,
      updatedAt: content.updatedAt
    };

    setAttributes(JSON.stringify({ attributes: meta }, null, 2));
  };

  const fetchBackendMetaData = async () => {
    const response: Response = await fetchSystemMetadata();
    let ins = insight;
    if (response.status === 200) {
      const bm = (await response.json()) as BackendMeta;
      ins = mergeBackendMeta(insight, bm);
      setIsFetchedBackendMeta(true);
    }

    setMetaData(JSON.stringify({ insight: ins }, null, 2));
  };

  useEffect(() => {
    if (adjacentContent) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShowAdjacentContent(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const footerElement = document.querySelector("footer");
      if (footerElement) {
        observer.observe(footerElement);
      }

      return () => {
        if (footerElement) {
          observer.unobserve(footerElement);
        }
      };
    }
  }, [adjacentContent]);

  const toggleAttributes = () => {
    formatAttributes();
    setIsMetadataOpen(false);
    setIsAttributesOpen(!isAttributesOpen);
  };

  const toggleMetadata = () => {
    if (!isFetchedBackendMeta) {
      fetchBackendMetaData();
      setIsFetchedBackendMeta(true);
    }
    setIsAttributesOpen(false);
    setIsMetadataOpen(!isMetadataOpen);
  };

  return (
    <article className={contentStyles.content}>
      <div className={containerStyles.container}>
        <div className={`${buttonStyles["actionbutton-wrap"]}`}>
          <ActionButton onclick={toggleAttributes} title="Attributes ▼" />
          <ActionButton onclick={toggleMetadata} title="Insight ▼" />
        </div>
        {isAttributesOpen && <PreContent content={attributes} />}
        {isMetadataOpen && <PreContent content={metadata} />}
        <div className={`${contentStyles["words"]}`}>
          {content.length.toLocaleString()} words
        </div>
      </div>
      <div className={`${contentStyles["content-main"]}`}>
        <div
          className={containerStyles.container}
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        {showAdjacentContent && adjacentContent && (
          <AdjacentContentComponent adjacentContent={adjacentContent} />
        )}
      </div>
    </article>
  );
};
