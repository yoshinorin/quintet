import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Archive } from '../models/archive';
import { convertUnixtimeToLocalDateSrting } from '../utils/time';
import styles from '../styles/archives.module.scss';
import inputStyles from '../styles/input.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import {
  archivesPage
} from '../../config';

const ArchivesComponent: React.FunctionComponent<{ archives: Array<Archive> }> = ({ archives }) => {

  const [keyword, setKeyword] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(archives);

  useEffect(() => {
    if (keyword === "") {
      setFilteredArticles(archives);
      return;
    }

    const searchKeywords = keyword.trim().toLowerCase();
    if (searchKeywords.length == 0) {
      setFilteredArticles(archives);
      return;
    }

    const result = archives.filter((article) => article.title.toLowerCase().includes(searchKeywords));
    setFilteredArticles(result);
  }, [keyword]);

  return (
    <section className={`${containerStyles.container}`}>
      <form className={`${inputStyles['form']}`}>
        <input
          className={`${inputStyles['control']} ${inputStyles['textbox']}`}
          placeholder={archivesPage.titlePlaceholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      <FilterdItems
        archives={filteredArticles}
      />
    </section>
  )
}

const FilterdItems: React.FunctionComponent<{ archives: Array<Archive> }> = ({ archives }) => {
  return <>
    <div className={styles['found']}>
      {archives.length} {archivesPage.found}
    </div>
    <div id={styles['archives']}>
      {archives.map((archive: Archive, idx) => {
        return (
          <li key={idx}>
            <Link href={`${archive.path}`} prefetch={false} target="_blank">
               {`${convertUnixtimeToLocalDateSrting(archive.publishedAt)}`}:{`${archive.title}`}
            </Link>
          </li>
        );
      })}
    </div>
  </>;
}

export default ArchivesComponent;
