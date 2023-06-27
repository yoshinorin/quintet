import { useState } from 'react';
import styles from '../styles/accordion.module.scss';

const Accordion: React.FunctionComponent<{ title, content: any }> = ({title, content}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const json = JSON.stringify(content, null, 2);
  return (
    <div className={styles.accordion} >
      <div className={`'unstyled' ${styles['menu-button']} ${styles['content-meta-button-wrap']}`} onClick={toggle}>
        {title}
      </div>
      {isOpen && (
        <pre className="accordion-content">
          {json}
        </pre>
      )}
    </div>
  );
}

export default Accordion;
