'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CoverWithNavigationComponent,
  SearchResultComponent
} from '../../components/components';
import { SearchResponse, SearchResponseWithCount } from '../../models/models';
import containerStyles from '../../styles/components/container.module.scss';

export const Renderer: React.FunctionComponent<{
  hits: number,
  count:number,
  contents: Array<SearchResponse>,
  queryStrings: Array<string>
}> = ({ hits, count, contents, queryStrings }) => {
  let contentsWithCount: SearchResponseWithCount = {
    count: 0,
    contents: []
  };
  const router = useRouter();
  const [searchWord, setSearchWord] = useState(queryStrings.join(' '));
  const [searchResults, setSearchResults] = useState(contents);

  useEffect(() => {
    if (searchWord === "") {
      setSearchResults(contentsWithCount.contents);
      return;
    }

    const searchKeywords = searchWord.trim().toLowerCase();
    if (searchKeywords.length == 0) {
      setSearchResults(contentsWithCount.contents);
      return;
    }
    setSearchResults(contents);
  }, [searchWord]);

  return (
    <>
      <CoverWithNavigationComponent
        contentCover={{
          title: "Search (β)",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <section className={`${containerStyles.container}`}>

          <div className="alert warning">
            <p><strong>NOTE:</strong>
              The search feature is <strong>WIP</strong> and it has some undocumented limitations.
              For more details please see belows.
            </p>
            <ul>
              <li><a href="https://github.com/yoshinorin/qualtet/blob/27778232dac650153393a10dacfbc2ae62f36ac3/src/main/scala/net/yoshinorin/qualtet/domains/search/SearchService.scala#L33-L44">Validation</a></li>
              <li><a href="https://github.com/yoshinorin/qualtet/blob/27778232dac650153393a10dacfbc2ae62f36ac3/src/main/scala/net/yoshinorin/qualtet/syntax/string.scala#L6">Invalid Chars</a></li>
            </ul>
          </div>
          <form
             onSubmit={e => { e.preventDefault(); }}
            >
            <input
              type='text'
              // placeholder={TODO}
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/search?q=${searchWord.split(' ').join('&q=')}`);
                };
              }}
            />
          </form>
          <SearchResultComponent
            hits={hits}
            count={count}
            contents={contents}
          />
        </section>
      </main>
    </>
  )
}
