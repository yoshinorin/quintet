"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  CoverComponent,
  SearchResultComponent
} from "../../components/components";
import { SearchSuccessResult } from "../../models/models";
import { ProblemDetails, isProblemDetails } from "../../models/problemDetails";
import containerStyles from "../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  props: SearchSuccessResult | ProblemDetails;
  qs: Array<any>;
}> = ({ props, qs }) => {
  let result: SearchSuccessResult = {
    statusCode: 200,
    queryStrings: [],
    contents: [],
    hits: 0,
    count: 0
  };

  if (!isProblemDetails(props)) {
    const s = props as SearchSuccessResult;
    result.queryStrings = qs;
    result.contents = s.contents;
    result.hits = s.hits;
    result.count = s.count;
  }

  const router = useRouter();
  const [searchWord, setSearchWord] = useState(result.queryStrings.join(" "));
  const [searchResults, setSearchResults] = useState(result.contents);

  useEffect(() => {
    if (searchWord === "") {
      setSearchResults(result.contents);
      return;
    }

    const searchKeywords = searchWord.trim().toLowerCase();
    if (searchKeywords.length == 0) {
      setSearchResults(result.contents);
      return;
    }
    setSearchResults(result.contents);
  }, [searchWord]);

  return (
    <>
      <CoverComponent
        props={{
          title: "Search",
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <section className={`${containerStyles.container}`}>
          {(() => {
            if (isProblemDetails(props) && qs.length !== 0) {
              const messages = [];
              props.errors.forEach((e, idx) => {
                // @ts-ignore
                messages.push(<li key={idx}>{e.message}</li>);
              });
              return (
                <div className="alert warning">
                  <p>
                    <strong>ERROR</strong>
                  </p>
                  <ul>{messages}</ul>
                </div>
              );
            }
          })()}

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <input
              type="text"
              // placeholder={TODO}
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/search?q=${searchWord.split(" ").join("&q=")}`);
                }
              }}
            />
          </form>
          <SearchResultComponent
            hits={result.hits}
            count={result.count}
            contents={result.contents}
          />
        </section>
      </main>
    </>
  );
};
