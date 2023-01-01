// TODO: refactor
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadMetaComponent from '../../components/headmeta';
import CoverWithNavigationComponent from '../../components/cover/withNavigation';
import { ContentCover } from '../../types/content';
import { defaultRobotsMeta } from '../../config';
import { getRequestContext } from '../../utils/requestContext';
import { SearchResponse, SearchResponseWithCount } from '../../types/search';
import { search } from '../api/search';
import inputStyles from '../../styles/input.module.scss';
import containerStyles from '../../styles/components/container.module.scss';
import SearchResultComponent from '../../components/searchResult';

const emptyResult = {
  count: 0,
  contents: []
} as SearchResponseWithCount;

const Page: React.FunctionComponent<{
  statusCode: number,
  hits: number,
  count:number,
  contents: Array<SearchResponse>,
  queryStrings: Array<string>
}> = ({ statusCode, hits, count, contents, queryStrings }) => {
  const contentCover = {
    title: "Search (β)",
    tags: null,
    publishedAt: null,
  } as ContentCover;

  let contentsWithCount: SearchResponseWithCount = emptyResult;
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
        contentCover={contentCover}
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
                  router.push({
                    pathname:"/search",
                    query: {q :searchWord.split(' ')}
                  });
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

export async function getServerSideProps(ctx: any) {
  // TODO: refactor
  // TODO: assert query params
  try {
    if (ctx.query['q'] === undefined) {
      return {
        props: {
          statusCode: ctx.res.statusCode,
          hits: 0,
          count: 0,
          contents: [],
          queryStrings: [],
        }
      }
    }
    const qs = ctx.query['q'] instanceof Array ? ctx.query['q'] : [ctx.query['q']]
    if (qs.length > 0) {
      const result = await execute(ctx, qs);
      return {
        props: {
          statusCode: ctx.res.statusCode,
          hits: result.count,
          count: result.contents.length,
          contents: result.contents,
          queryStrings: qs,
        }
      }
    } else {
      return {
        props: {
          statusCode: ctx.res.statusCode,
          hits: 0,
          count: 0,
          contents: [],
          queryStrings: qs,
        }
      }
    }
  } catch {
    return {
      props: {
        statusCode: ctx.res.statusCode,
        hits: 0,
        count: 0,
        contents: [],
        queryStrings: [],
      }
    }
  }

}

async function execute(ctx, words: Array<string>) {
  const response = await search(getRequestContext(ctx.req), words);
  ctx.res.statusCode = response.status;
  if (response.status !== 200) {
    return emptyResult;
  }
  const sr = await response.json() as SearchResponseWithCount;
  if (sr.count === 0) {
    return emptyResult;
  }
  let contents = [];
  contents = sr.contents.map(content => {
    return {
      path: content.path,
      title: content.title,
      content: content.content,
      publishedAt: content.publishedAt
    } as SearchResponse});

  return {
    count: sr.count,
    contents: contents
  } as SearchResponseWithCount
  // TODO: Error handling
}

export default Page;
