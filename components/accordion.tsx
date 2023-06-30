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
      <span className={`'unstyled' ${styles['menu-button']}`}
            onClick={toggle}
            dangerouslySetInnerHTML={{ __html: title }} >
      </span>
      {isOpen && (
        <pre className="accordion-content">
          {json}
        </pre>
      )}
    </div>
  );
}

export default Accordion;
