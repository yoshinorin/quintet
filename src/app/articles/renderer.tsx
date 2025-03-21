import {
  ArticlesComponent,
  CoverComponent,
  PaginationComponent
} from "../../components/components";
import { OrderSelector } from "../../components/orderSelector";
import buttonStyles from "../../styles/actionbutton.module.scss";
import articlesStyles from "../../styles/articles.module.scss";
import styles from "../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  count;
  currentPage;
  articles;
  order;
}> = ({ count, currentPage, articles, order }) => {
  return (
    <>
      <CoverComponent props={null} />
      <main>
        <section className={`${styles.container} ${articlesStyles.group}`}>
          <div className={`${buttonStyles["actionbutton-wrap"]}`}>
            <OrderSelector currentOrder={order} basePath="articles" />
          </div>
          <ArticlesComponent articles={articles} />
          {(() => {
            if (order !== "random") {
              return (
                <PaginationComponent
                  basePath="articles"
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
