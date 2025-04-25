import React, { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import styles from './ReadMore.module.scss';

interface ReadMoreProps {
  name: string;
  description: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ name, description }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<number>(0);

  // Gets the height of all paragraphs to make the text expandable
  useEffect(() => {
    if (refContainer.current) {
      setDimensions(refContainer.current.offsetHeight);
    }
  }, [description]);

  // 'Split' breaks the whole text(description) into paragraphs
  // DOMPurify cleans HTML
  // To make the text expandable it's required to set max-height
  return (
    <div className={styles.about}>
      <h2 className={styles.title}>About {name}</h2>
      <div className={styles.readMore}>
        <div
          style={{ maxHeight: `${!showMore ? '210px' : dimensions + 'px'}` }}
          className={styles.expandingText}>
          <div ref={refContainer}>
            {!description ? (
              <p>No description available</p>
            ) : (
              description.split('\n').map((item, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item),
                  }}
                />
              ))
            )}
          </div>
        </div>
        <span
          onClick={() => setShowMore(!showMore)}
          className={styles.showMore}>
          {!showMore ? 'Read more' : 'Show Less'}
        </span>
      </div>
    </div>
  );
};

export default ReadMore;
