import Link from 'next/link';
import { Series } from '../models/models';
import styles from '../styles/series.module.scss';
import containerStyles from '../styles/components/container.module.scss';

export const SeriesComponent: React.FunctionComponent<{ series: Array<Series> }> = ({ series }) => {

  return (
    <section className={`${containerStyles.container}`}>
      <div id={styles['series']}>
        {series.map((s: Series, idx) => {
          return (
            <article className={styles['article']} key={idx}>
              <div className={styles['wrap']}>
                <blockquote key={idx}>
                  <p className={styles['header']}>
                    <Link href={`/series/${s.name}`} prefetch={false} className='unstyled'>
                      {`${s.title}`}
                    </Link>
                  </p>
                  <Link href={`/series/${s.name}`}
                        prefetch={false}
                        className={`${styles['excerpt']} unstyled`}>
                    {`${s.description}`}
                  </Link>
                </blockquote>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
