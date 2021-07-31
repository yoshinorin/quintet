import Link from 'next/link';
import { Archive } from '../types/archive';
import styles from '../styles/archives.module.scss';
import containerStyles from '../styles/components/container.module.scss';

// TODO: blush up
const ArchivesComponent: React.FunctionComponent<{ archives: Array<Archive> }> = ({ archives }) => {
  return (
    <section className={`${containerStyles.container}`}>
      <div id={styles['archives']}>
        {archives.map((archive: Archive) => {
          return (
            <li>
              <span>
              </span>
              <Link href={`${archive.path}`}>
                {`${archive.title}`}
              </Link>
            </li>
          )
        })}
      </div>
    </section>
  )
}

export default ArchivesComponent;
