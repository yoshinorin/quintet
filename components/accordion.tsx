import { useState } from 'react';
import styles from '../styles/accordion.module.scss';

const Accordion: React.FunctionComponent<{ title, content: string }> = ({title, content}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion} >
      <span className={`'unstyled' ${styles['menu-button']}`}
            onClick={toggle}
            dangerouslySetInnerHTML={{ __html: title }} >
      </span>
      {isOpen && (
        <pre className="accordion-content">
          {content}
        </pre>
      )}
    </div>
  );
}

export default Accordion;
