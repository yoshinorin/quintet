import { AdjacentContent } from "../models/models";
import style from "../styles/components/adjacentContent.module.scss";
import containerStyles from "../styles/components/container.module.scss";

export const AdjacentContentComponent: React.FunctionComponent<{
  adjacentContent: AdjacentContent;
}> = ({ adjacentContent }) => {
  const { previous, next } = adjacentContent;

  if (!previous && !next) {
    return null;
  }

  return (
    <nav className={style.adjacentContent} id="adjacent-content">
      <div className={containerStyles.container}>
        <div className={style.navigation}>
          <div className={`${style.navItem} ${style.next}`}>
            {next && (
              <div id="next-article">
                <a href={next.path} className={style.link}>
                  <span className={style.label}>← Next</span>
                  <span className={style.title}>{next.title}</span>
                </a>
              </div>
            )}
          </div>
          <div className={`${style.navItem} ${style.previous}`}>
            {previous && (
              <div id="previous-article">
                <a href={previous.path} className={style.link}>
                  <span className={style.label}>Previous →</span>
                  <span className={style.title}>{previous.title}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
