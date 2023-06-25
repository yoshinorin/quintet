import Link from 'next/link';
import { Series } from '../models/series';
import styles from '../styles/series.module.scss';
import containerStyles from '../styles/components/container.module.scss';

const SeriesComponent: React.FunctionComponent<{ series: Array<Series> }> = ({ series }) => {

  return (
    <section className={`${containerStyles.container}`}>
      <div id={styles['series']}>
        {series.map((s: Series, idx) => {
          return (
            <article className={styles['articles']} key={idx}>
              <div className={styles['wrap']}>
                <blockquote key={idx}>
                  <div className={styles['header']}>
                    <h2 className={styles['title']}>
                      <Link href={`/series/${s.name}`} prefetch={false} className='unstyled'>
                        {`${s.title}`}
                      </Link>
                    </h2>
                  </div>
                  <div className={styles['excerpt']}>
                    <Link href={`/series/${s.name}`} prefetch={false} className='unstyled'>
                      {`${s.description}`}
                    </Link>
                  </div>
                </blockquote>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SeriesComponent;
