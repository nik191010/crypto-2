import React from 'react';
import axios from 'axios';
import btc from '../../assets/img/icon-btc.svg';
import eth from '../../assets/img/icon-eth.svg';
import eur from '../../assets/img/icon-eur.svg';

import styles from './Converter.module.scss';
import CurrencyInput1 from './CurrencyInput1';
import CurrencyInput2 from './CurrencyInput2';

interface ConverterProps {
  image: string;
  name: string;
  symbol: string;
  currentPriceConverter: Record<string, number>;
}

interface Flag {
  cca2: string;
  flags: {
    svg: string;
  };
}

const Converter: React.FC<ConverterProps> = ({
  image,
  name,
  symbol,
  currentPriceConverter,
}) => {
  const [amount1, setAmount1] = React.useState<number | string>(1);
  const [amount2, setAmount2] = React.useState<number | string>(1);
  const [currency1] = React.useState<string>(symbol);
  const [currency2, setCurrency2] = React.useState<string>('usd');
  const [flags, setFlags] = React.useState<Flag[]>([]);
  const [flagImg, setFlagImg] = React.useState<string | null>('');
  const [handle, setHandle] = React.useState<boolean>(false);

  const removeList: string[] = [
    'bch',
    'bnb',
    'btc',
    'eth',
    'eur',
    'dot',
    'eos',
    'ltc',
    'vef',
    'xag',
    'xau',
    'xdr',
    'xlm',
    'xrp',
    'yfi',
    'bits',
    'link',
    'sats',
  ];

  // Fetches data with country flags
  React.useEffect(() => {
    const currenciesForFlags: string[] = filterItems(
      Object.keys(currentPriceConverter),
    ).map((item) => item.toUpperCase().slice(0, -1));
    console.log(Object.keys(currentPriceConverter));
    axios
      .get<Flag[]>(import.meta.env.VITE_API_FLAGS_URL as string)
      .then((response) => {
        setFlags(
          response.data
            .filter((x) => currenciesForFlags.some((y) => y === x.cca2))
            .sort((a, b) => a.cca2.localeCompare(b.cca2)),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPriceConverter]); // Depend on currentPriceConverter instead 1

  const filterItems = (items: string[]): string[] => {
    return items.filter((item) => !removeList.includes(item));
  };

  React.useEffect(() => {
    if (Object.keys(currentPriceConverter).length > 0) {
      handleAmount1Change(1);
    }
  }, [currentPriceConverter]);

  const format = (number: number): string => {
    return number.toFixed(2);
  };

  const formatCoins = (number: number): string => {
    return number.toFixed(8);
  };

  const handleAmount1Change = (amount1: number | string) => {
    const numAmount1 =
      typeof amount1 === 'string' ? parseFloat(amount1) : amount1;
    if (!isNaN(numAmount1)) {
      setAmount2(
        format(numAmount1 * currentPriceConverter[currency2.toLowerCase()]),
      );
      setAmount1(numAmount1);
    }
  };

  const handleAmount2Change = (amount2: string) => {
    const numAmount2 = parseFloat(amount2);
    if (!isNaN(numAmount2)) {
      setAmount1(
        formatCoins(
          numAmount2 / currentPriceConverter[currency2.toLowerCase()],
        ),
      );
      setAmount2(numAmount2);
    }
  };

  const handleCurrency2Change = (currency2: string) => {
    const numAmount1 =
      typeof amount1 === 'string' ? parseFloat(amount1) : amount1;
    if (!isNaN(numAmount1)) {
      setAmount2(
        format(numAmount1 * currentPriceConverter[currency2.toLowerCase()]),
      );
    }
    setCurrency2(currency2);

    switch (currency2) {
      case 'BTC':
        setFlagImg(btc);
        break;
      case 'ETH':
        setFlagImg(eth);
        break;
      case 'EUR':
        setFlagImg(eur);
        break;
      default: {
        const flag: Flag | undefined = flags.find(
          (item) => item.cca2 === currency2.toUpperCase().slice(0, -1),
        );
        setFlagImg(flag?.flags.svg || null);
        break;
      }
    }

    handleChange();
  };

  const handleChange = () => {
    setHandle((prev) => !prev);
  };

  return (
    <div className={styles.converter}>
      <h2 className={styles.title}>Crypto Converter</h2>
      <div className={styles.wrapper}>
        <CurrencyInput1
          image={image}
          name={name}
          handleAmount1Change={handleAmount1Change}
          amount1={String(amount1)}
          currency1={currency1}
        />
        <CurrencyInput2
          handleChange={handleChange}
          handle={handle}
          handleCurrency2Change={handleCurrency2Change}
          handleAmount2Change={handleAmount2Change}
          flagImg={flagImg}
          flags={flags}
          currency2={currency2}
          amount2={String(amount2)}
          currentPriceConverter={Object.keys(currentPriceConverter)}
          filterItems={filterItems}
        />
      </div>
    </div>
  );
};

export default Converter;
