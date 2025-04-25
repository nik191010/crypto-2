import React from 'react';
import styles from './Converter.module.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import btc from '../../assets/img/icon-btc.svg';
import eth from '../../assets/img/icon-eth.svg';
import eur from '../../assets/img/icon-eur.svg';

// Define interfaces for props
interface Flag {
  cca2: string;
  flags: {
    svg: string;
  };
}

interface CurrencyInput2Props {
  handleChange: () => void;
  handle: boolean;
  handleCurrency2Change: (value: string) => void;
  handleAmount2Change: (value: string) => void;
  flagImg: string | null;
  flags: Flag[];
  currency2: string;
  amount2: string;
  currentPriceConverter: string[];
  filterItems: (items: string[]) => string[];
}

const CurrencyInput2: React.FC<CurrencyInput2Props> = ({
  handleChange,
  handle,
  handleCurrency2Change,
  handleAmount2Change,
  flagImg,
  flags,
  currency2,
  amount2,
  currentPriceConverter,
  filterItems,
}) => {
  {
    console.log(flagImg === '');
  }
  return (
    <div className={styles.converterInput}>
      <div className={styles.parent}>
        <div className={styles.childComponent}>
          <div onClick={handleChange} className={styles.selectElement}>
            <img
              className={styles.converterImg}
              src={
                !flagImg
                  ? flags.find((element) => element.cca2 === 'US')?.flags.svg
                  : flagImg || ''
              }
              alt={`CryptoApp:${currency2}`}
            />
            <p>{currency2.toUpperCase()}</p>
            <MdKeyboardArrowDown
              className={`${styles.iconDown} ${handle ? styles.rotated : ''}`}
            />
          </div>
          {handle && (
            <ul className={styles.selectValues}>
              <div className={styles.dropDownElement}>
                <img src={btc} alt="Bitcoin" />
                <li
                  onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                    handleCurrency2Change(e.currentTarget.innerHTML)
                  }
                  className={styles.selectOption}>
                  BTC
                </li>
              </div>
              <div className={styles.dropDownElement}>
                <img src={eth} alt="Ethereum" />
                <li
                  onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                    handleCurrency2Change(e.currentTarget.innerHTML)
                  }
                  className={styles.selectOption}>
                  ETH
                </li>
              </div>
              <div className={styles.dropDownElement}>
                <img src={eur} alt="Euro" />
                <li
                  onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                    handleCurrency2Change(e.currentTarget.innerHTML)
                  }
                  className={styles.selectOption}>
                  EUR
                </li>
              </div>
              {filterItems(currentPriceConverter).map((currency, index) => (
                <div key={index} className={styles.dropDownElement}>
                  <img src={flags[index]?.flags?.svg} alt={currency} />
                  <li
                    onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                      handleCurrency2Change(e.currentTarget.innerHTML)
                    }
                    className={styles.selectOption}>
                    {currency.toUpperCase()}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.csInputWrapper}>
          <input
            pattern="[0-9]+"
            inputMode="decimal"
            className={styles.csInput}
            type="text"
            value={amount2}
            onChange={(e) => handleAmount2Change(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput2;
