'use client';

import { useState } from 'react';
import {
  Content,
  ContentMeta,
  Insight,
  BackendMeta
} from '../models/models';
import containerStyles from '../styles/components/container.module.scss';
import contentStyles from '../styles/components/content.module.scss';
import Accordion from './contentAccordion';
import handler from '../api/metadata';
import { appendBackendMeta } from '../utils/converters';

const ContentComponent: React.FunctionComponent<{ content: Content, insight: Insight | null }> = ({content, insight}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isFetchedBackendMeta, setIsFetchedBackendMeta] = useState(false);
  const [metaAndInsight, setData] = useState(null);

  const fetchBackendMetaData = async () => {
    const response: Response = await handler();
    let ins = insight;
    if (response.status === 200) {
      const bm = await response.json() as BackendMeta;
      ins = appendBackendMeta(insight, bm);
      setIsFetchedBackendMeta(true);
    }

    let actualRobotsMeta = '';
    let maybeRobotsMeta = document.querySelector('meta[name="robots"]');
    if (maybeRobotsMeta) {
      const unsortedActualRobotsMeta = maybeRobotsMeta.getAttribute('content').split(',').map(r => r.trim());
      // TODO: write test code
      const isSorted = arr => arr.every((v, idx) => idx === 0 || v >= arr[idx - 1]);
      // @ts-ignore
      const x = isSorted(unsortedActualRobotsMeta) ? unsortedActualRobotsMeta : [...unsortedActualRobotsMeta].sort();
      actualRobotsMeta = x.join(', ');
    }

    const meta: ContentMeta = {
      id: content.id,
      robots: {
        diff: !(actualRobotsMeta === content.robotsAttributes),
        actual: actualRobotsMeta,
        expected: content.robotsAttributes,
      },
      tags: content.tags,
      words: content.length,
      shouldInjectResources: content.externalResources,
      authorName: content.authorName,
      publishedAt: content.publishedAt,
      updatedAt: content.updatedAt
    }

    setData(JSON.stringify({
      attributes: meta,
      insight: ins
    }, null, 2));
  };

  const toggle = () => {
    if (!isFetchedBackendMeta) {
      fetchBackendMetaData();
      setIsFetchedBackendMeta(true);
    }
    setIsOpen(!isOpen);
  };

  return(
    <article className={contentStyles.content}>
      <div className={containerStyles.container} >
        <div className={`${contentStyles['accordion-wrap']}`} >
          <Accordion
            open={isOpen}
            onclick={toggle}
            title="Attributes / Insight ▼"
            content={metaAndInsight}
          />
        </div>
        <div className={`${contentStyles['words']}`}>
          {content.length.toLocaleString()} words
        </div>
      </div>
      <div className={`${contentStyles['content-main']}`}>
        <div className={containerStyles.container} dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </article>
  )
}

export default ContentComponent;
