import styles from '../styles/backtotop.module.scss';

export const BackToTopComponent: React.FunctionComponent<{}> = () => {
  return (
    <p id={styles['back-to-top']}>
      <a href="#">
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </a>
    </p>
  )
}
