import styles from '../styles/accordion.module.scss';

const Accordion: React.FunctionComponent<{ open: boolean, onclick: () => void, title: string, content: string }> = ({open, onclick, title, content}) => {
  return (
    <div className={styles.accordion} >
      <span className={`'unstyled' ${styles['menu-button']}`}
            onClick={onclick}
            dangerouslySetInnerHTML={{ __html: title }} >
      </span>
      {open && (
        <pre className="accordion-content">
          {content}
        </pre>
      )}
    </div>
  );
}

export default Accordion;
