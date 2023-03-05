import Link from 'next/link';
import { Commit } from "../models/commit";
import CommitLogsComponent from './commitLogs';
import styles from '../styles/home.module.scss';
import flexStyles from '../styles/components/flex.module.scss';
import { viewOnGithub } from '../config'

const RecentCommitsComponent: React.FunctionComponent<{ commits: Array<Commit> }> = ({ commits }) => {
  return <>
    <div className={flexStyles['flex-row']}>
      <div className={flexStyles['col-35']}>
        <span className={styles['cat-title']}>

          {
            (() => {
              return(
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>
                </svg>
              )
            })()
          }
          &nbsp;
          Recent commits:
        </span>
      </div>
      <div className={flexStyles['col-65']}>
        <CommitLogsComponent
          commits={commits}
        />
      </div>
    </div>
    <div className={`${flexStyles['flex-right']} ${styles['external-link']}`}>
      <Link
        href={`${viewOnGithub.repoUrl}`}
        prefetch={false}
        className={`unstyled ${styles['read-more']}`}
        target="_blank">
          View on GitHub →
      </Link>
    </div>
  </>;
}

export default RecentCommitsComponent;
