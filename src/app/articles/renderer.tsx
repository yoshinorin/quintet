import {
  ArticlesComponent,
  CoverComponent,
  LinkButton,
  PaginationComponent
} from "../../components/components";
import buttonStyles from "../../styles/actionbutton.module.scss";
import articlesStyles from "../../styles/articles.module.scss";
import styles from "../../styles/components/container.module.scss";

export const Renderer: React.FunctionComponent<{
  count;
  currentPage;
  articles;
  randomness;
}> = ({ count, currentPage, articles, randomness }) => {
  return (
    <>
      <CoverComponent props={null} />
      <main>
        <section className={`${styles.container} ${articlesStyles.group}`}>
          <div className={`${buttonStyles["actionbutton-wrap"]}`}>
            <LinkButton title="Random" href="/articles/?order=random" />
          </div>
          <ArticlesComponent articles={articles} />
          {(() => {
            if (!randomness) {
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
