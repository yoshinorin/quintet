import {
  ArticlesComponent,
  CoverComponent,
  LinkButton,
  PaginationComponent
} from "../../../components/components";
import buttonStyles from "../../../styles/actionbutton.module.scss";
import articlesStyles from "../../../styles/articles.module.scss";
import styles from "../../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  tagName;
  currentPage;
  count;
  articles;
  randomness;
}> = ({ tagName, currentPage, count, articles, randomness }) => {
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
            <LinkButton
              title="Random"
              href={`/tags/${tagName}/?order=random`}
            />
            <LinkButton title="Reset" href={`/tags/${tagName}/`} />
          </div>
          <ArticlesComponent articles={articles} />
          {(() => {
            if (!randomness) {
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
