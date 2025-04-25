import React from 'react';
import styles from './Converter.module.scss';

interface CurrencyInput1Props {
  image: string;
  name: string;
  handleAmount1Change: (value: string) => void;
  amount1: string;
  currency1: string;
}

const CurrencyInput1: React.FC<CurrencyInput1Props> = ({
  image,
  name,
  handleAmount1Change,
  amount1,
  currency1,
}) => {
  return (
    <div className={styles.converterInput}>
      <div className={styles.parent}>
        <div className={styles.childComponent}>
          <div className={styles.selectElement}>
            <img
              className={styles.converterImg}
              src={image}
              alt={`CryptoApp:${name}`}
            />
            <p>{currency1}</p>
          </div>
        </div>
        <div className={styles.csInputWrapper}>
          <input
            pattern="[0-9]+"
            inputMode="decimal"
            className={styles.csInput}
            type="text"
            value={amount1}
            onChange={(e) => handleAmount1Change(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput1;
