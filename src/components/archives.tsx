"use client";

import React, { useEffect, useState } from "react";
import { archivesPage } from "../../config";
import { Archive, ArchiveFormatedDate } from "../models/models";
import styles from "../styles/archives.module.scss";
import containerStyles from "../styles/components/container.module.scss";
import { sequentialPadPosNum } from "../utils/nums";
import { splittedBy } from "../utils/time";
import { DropdownComponent } from "./components";

export const ArchivesComponent: React.FunctionComponent<{
  archives: Array<Archive>;
}> = ({ archives }) => {
  // TODO: clean up
  let years: string[] = [];
  const allArticles = archives.map((a) => {
    const d = splittedBy(a.publishedAt, "ja-JP", "/");
    years.push(d[0].toString());

    return {
      path: a.path,
      title: a.title,
      yyyy: d[0],
      mm: d[1],
      dd: d[2]
    } as ArchiveFormatedDate;
  });
  years = Array.from(new Set(years));

  const [inputtedTitle, setTitle] = useState("");
  const [inputtedPath, setPath] = useState("");
  const [selectedYear, setYear] = useState("YYYY");
  const [selectedMonth, setMonth] = useState("MM");
  const [selectedDay, setDay] = useState("DD");
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  useEffect(() => {
    let resultArticles = allArticles;
    const searchTitle = inputtedTitle.trim().toLowerCase();
    if (searchTitle.length !== 0) {
      resultArticles = resultArticles.filter((a) =>
        a.title.toLowerCase().includes(searchTitle)
      );
    }

    if (selectedYear !== "YYYY") {
      resultArticles = resultArticles.filter((a) => a.yyyy === selectedYear);
    }

    if (selectedMonth !== "MM") {
      resultArticles = resultArticles.filter((a) => a.mm === selectedMonth);
    }

    if (selectedDay !== "DD") {
      resultArticles = resultArticles.filter((a) => a.dd === selectedDay);
    }

    const searchPath = inputtedPath.trim().toLowerCase();
    if (searchPath.length !== 0) {
      // TODO: write test code and move somewhere.
      for (let i = 0; i < searchPath.length; i++) {
        const code = searchPath.charCodeAt(i);
        if (code < 0 || code > 127) {
          setFilteredArticles(resultArticles);
          return;
        }
      }
      resultArticles = resultArticles.filter((a) =>
        // NOTE: `path` is `/articles/yyyy/mm/dd/post-title/`
        a.path.split("/").at(-2).toLowerCase().includes(searchPath)
      );
    }

    setFilteredArticles(resultArticles);
  }, [inputtedTitle, inputtedPath, selectedYear, selectedMonth, selectedDay]);

  return (
    <section className={`${containerStyles.container}`}>
      <div className={styles["filters"]}>
        <form>
          <DropdownComponent
            options={["YYYY"].concat(years)}
            defaultValue={selectedYear}
            onChange={(e) => setYear(e.target.value)}
          />
        </form>
        <form>
          <DropdownComponent
            options={["MM"].concat(sequentialPadPosNum(1, 12))}
            defaultValue={selectedMonth}
            onChange={(e) => setMonth(e.target.value)}
          />
        </form>
        <form>
          <DropdownComponent
            options={["DD"].concat(sequentialPadPosNum(1, 31))}
            defaultValue={selectedDay}
            onChange={(e) => setDay(e.target.value)}
          />
        </form>
        <form>
          <input
            placeholder={archivesPage.titlePlaceholder}
            value={inputtedTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
        <form>
          <input
            placeholder={archivesPage.pathPlaceholder}
            value={inputtedPath}
            onChange={(e) => setPath(e.target.value)}
          />
        </form>
      </div>

      <FilterdItems archives={filteredArticles} />
    </section>
  );
};

const FilterdItems: React.FunctionComponent<{
  archives: Array<ArchiveFormatedDate>;
}> = ({ archives }) => {
  return (
    <>
      <div className={styles["found"]}>
        {archives.length} {archivesPage.found}
      </div>
      <div id={styles["archives"]}>
        {archives.map((archive: ArchiveFormatedDate, idx) => {
          return (
            <li key={idx}>
              <a href={`${archive.path}`} target="_blank">
                <span className={styles["date"]}>
                  {`${archive.yyyy}/${archive.mm}/${archive.dd}`} :
                </span>
                <span>{`${archive.title}`}</span>
              </a>
            </li>
          );
        })}
      </div>
    </>
  );
};
