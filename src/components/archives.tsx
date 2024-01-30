'use client';

import React, { useState, useEffect } from 'react';
import { Archive, ArchiveFormatedDate } from '../models/models';
import { toDate } from '../utils/time';
import styles from '../styles/archives.module.scss';
import containerStyles from '../styles/components/container.module.scss';
import {
  archivesPage
} from '../../config';
import { DropdownComponent } from './components';
import { sequentialPadPosNum } from '../utils/nums';

export const ArchivesComponent: React.FunctionComponent<{ archives: Array<Archive> }> = ({ archives }) => {

  // TODO: clean up
  let years: string[] = [];
  const allArticles = archives.map((a) => {
    // TODO: move somewhere
    const d = toDate(a.publishedAt).toLocaleDateString('ja-JP', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");

    years.push(d[0].toString());

    return {
      path: a.path,
      title: a.title,
      yyyy: d[0],
      mm: d[1],
      dd: d[2]
    } as ArchiveFormatedDate
  });
  years = Array.from(new Set(years));

  const [keyword, setKeyword] = useState("");
  const [selectedYear, setYear] = useState('YYYY');
  const [selectedMonth, setMonth] = useState('MM');
  const [selectedDay, setDay] = useState('DD');
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  useEffect(() => {
    let resultArticles = allArticles;
    const searchKeywords = keyword.trim().toLowerCase();
    if (searchKeywords.length !== 0) {
      resultArticles = resultArticles.filter((a) => a.title.toLowerCase().includes(searchKeywords));
    }

    if (selectedYear !== 'YYYY') {
      resultArticles = resultArticles.filter((a) => a.yyyy === selectedYear);
    }

    if (selectedMonth !== 'MM') {
      resultArticles = resultArticles.filter((a) => a.mm === selectedMonth);
    }

    if (selectedDay !== 'DD') {
      resultArticles = resultArticles.filter((a) => a.dd === selectedDay);
    }

    setFilteredArticles(resultArticles);
  }, [keyword, selectedYear, selectedMonth, selectedDay]);

  return (
    <section className={`${containerStyles.container}`}>
      <div className={styles['filters']}>
        <form>
          <DropdownComponent
            list={['YYYY'].concat(years)}
            defaultValue={selectedYear}
            onChange={(e) => setYear(e.target.value)}
          />
        </form>
        <form>
          <DropdownComponent
              list={['MM'].concat(sequentialPadPosNum(1, 12))}
              defaultValue={selectedMonth}
              onChange={(e) => setMonth(e.target.value)}
            />
        </form>
        <form>
          <DropdownComponent
              list={['DD'].concat(sequentialPadPosNum(1, 31))}
              defaultValue={selectedDay}
              onChange={(e) => setDay(e.target.value)}
            />
        </form>
        <form>
          <input
            placeholder={archivesPage.titlePlaceholder}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
      </form>
      </div>

      <FilterdItems
        archives={filteredArticles}
      />
    </section>
  )
}

const FilterdItems: React.FunctionComponent<{ archives: Array<ArchiveFormatedDate> }> = ({ archives }) => {
  return <>
    <div className={styles['found']}>
      {archives.length} {archivesPage.found}
    </div>
    <div id={styles['archives']}>
      {archives.map((archive: ArchiveFormatedDate, idx) => {
        return (
          <li key={idx}>
            <a href={`${archive.path}`}
               target="_blank">
                <span className={styles['date']}>
                  {`${archive.yyyy}/${archive.mm}/${archive.dd}`} :
                </span>
                <span>
                  {`${archive.title}`}
                </span>
            </a>
          </li>
        );
      })}
    </div>
  </>;
}
