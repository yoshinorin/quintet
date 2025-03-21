import {
  ArticlesComponent,
  CoverComponent,
  PaginationComponent
} from "../../../components/components";
import { OrderSelector } from "../../../components/orderSelector";
import buttonStyles from "../../../styles/actionbutton.module.scss";
import articlesStyles from "../../../styles/articles.module.scss";
import styles from "../../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  tagName;
  currentPage;
  count;
  articles;
  order;
}> = ({ tagName, currentPage, count, articles, order }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: tagName,
          tags: null,
          publishedAt: null
        }}
      />
      <main>
        <section className={`${styles.container} ${articlesStyles.group}`}>
          <div className={`${buttonStyles["actionbutton-wrap"]}`}>
            <OrderSelector currentOrder={order} basePath={`tags/${tagName}`} />
          </div>
          <ArticlesComponent articles={articles} />
          {(() => {
            if (order !== "random") {
              return (
                <PaginationComponent
                  basePath={`tags/${tagName}`}
                  current={currentPage}
                  total={count}
                />
              );
            }
          })()}
        </section>
      </main>
    </>
  );
};
