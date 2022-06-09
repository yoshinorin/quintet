import Link from 'next/link';
import { Commit } from "../types/commit";
import styles from '../styles/commitLogs.module.scss';

const CommitLogsComponent: React.FunctionComponent<{ commits: Array<Commit> }> = ({ commits }) => {
  return (
    <section>
      {commits.map((commit: Commit, idx) => {
        return(
          <article className={styles['articles']} key={idx}>
          <div className={styles['wrap']}>
            <div className={styles['timeline']}>
              (
                <Link
                  href={`${commit.url}`}
                  prefetch={false}
                >
                  <a
                    className={styles['hash']}
                    target="_blank"
                  >
                    {`${commit.sha.slice(0, 7)}`}
                  </a>
                </Link>
              )&nbsp;
              <Link
                  href={`${commit.url}`}
                  prefetch={false}
                >
                  <a
                    className='unstyled'
                    target="_blank"
                  >
                    {`${commit.message}`}
                  </a>
              </Link>
            </div>
          </div>
        </article>
        )
      })}
    </section>
  )
}

export default CommitLogsComponent;
