// TODO: migrate to react-server-component
'use client';

// TODO: refactor
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import { defaultRobotsMeta } from '../../../config';
import { SearchResponse, SearchResponseWithCount } from '../../models/search';
import inputStyles from '../../styles/input.module.scss';
import containerStyles from '../../styles/components/container.module.scss';
import SearchResultComponent from '../../components/searchResult';

export const Renderer: React.FunctionComponent<{
  statusCode: number,
  hits: number,
  count:number,
  contents: Array<SearchResponse>,
  queryStrings: Array<string>
}> = ({ statusCode, hits, count, contents, queryStrings }) => {
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
      <HeadMetaComponent
        robotsMeta={defaultRobotsMeta}
      />
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
          <form className={`${inputStyles['form']}`}
             onSubmit={e => { e.preventDefault(); }}
            >
            <input
              type='text'
              className={`${inputStyles['control']} ${inputStyles['textbox']}`}
              // placeholder={TODO}
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // query: {q :searchWord.split(' ')}
                  // router.push("/search", { query: {q: searchWord.split(' ')} });
                  // router.push("/search", { searchParams: {q: searchWord.split(' ')} });
                  router.push("/search?q=test");
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
