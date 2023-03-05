import Link from 'next/link';
import { Commit } from "../models/commit";
import styles from '../styles/commitLogs.module.scss';

const CommitLogsComponent: React.FunctionComponent<{ commits: Array<Commit> }> = ({ commits }) => {
  return (
    <section className={styles['articles-wrap']}>
      {commits.map((commit: Commit, idx) => {
        return (
          <article className={styles['articles']} key={idx}>
            <div className={styles['wrap']}>
              <div className={styles['timeline']}>
                (
                  <Link
                    href={`${commit.url}`}
                    prefetch={false}
                    className={styles['hash']}
                    target="_blank">
                      {`${commit.sha.slice(0, 7)}`}
                  </Link>
                )&nbsp;
                <Link
                  href={`${commit.url}`}
                  prefetch={false}
                  className='unstyled'
                  target="_blank">
                    {`${commit.message}`}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default CommitLogsComponent;
