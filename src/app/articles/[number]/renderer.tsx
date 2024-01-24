import {
  ArticlesComponent,
  CoverWithNavigationComponent,
  PaginationComponent
} from '../../../components/components';
import { Article } from '../../../models/models';

export const Renderer: React.FunctionComponent<{
  current: number,
  count: number,
  articles: Array<Article>
}> = ({ current, count, articles }) => {
  return (
    <>
      <CoverWithNavigationComponent
        contentCover={null}
      />
      <main>
        <ArticlesComponent
          articles={articles}
        />
        <PaginationComponent
          basePath='articles'
          current={current}
          total={count}
        />
      </main>
    </>
  )
}
