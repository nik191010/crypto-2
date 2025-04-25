import React from 'react';
import { Link } from 'react-router-dom';
import { abbrNum } from '../../config/hooks-helpers';
import { IconContext } from 'react-icons';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import AppContext from '../../config/context';

import styles from './CoinItem.module.scss';
import Skeleton from './Skeleton';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  current_price: number;
  total_volume: number;
  image: string;
}

interface CoinItemProps {
  coins: CoinData;
  loading?: boolean;
}

const CoinItem: React.FC<CoinItemProps> = ({ coins, loading = true }) => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('Context Error');
  }
  const { setSearch } = context;

  const coinName: string = coins?.name;
  const coinShortName: string = coins?.symbol.toUpperCase();
  const marketCap: number = coins?.market_cap;
  const marketCapRank: number = coins?.market_cap_rank;
  const price24: number =
    coins?.price_change_percentage_24h !== 0
      ? Number(coins?.price_change_percentage_24h.toFixed(2))
      : coins?.price_change_percentage_24h;
  const coinCurrent: string = coins?.current_price.toFixed(0);
  const volume: number = coins?.total_volume;

  const clickHandler = (): void => {
    setSearch('');
  };

  return loading ? (
    <Skeleton />
  ) : (
    <tr className={styles.row}>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`}>
          {marketCapRank}
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`}>
          <div className={styles.logo}>
            <img src={coins.image} alt={coinName} className={styles.pic} />
            <div className={styles.logoDesc}>
              <span className={styles.logoText}>
                {coinName}
                <span> • {coinShortName}</span>
              </span>
            </div>
          </div>
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`}>
          <span
            className={`${styles.change} ${
              price24 >= 0 ? styles.up : styles.down
            }`}>
            <IconContext.Provider value={{ className: styles.icon }}>
              {price24 >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {price24.toString().replace('-', '')}%
          </span>
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`}>
          ${coinCurrent}
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`}>
          ${abbrNum(marketCap, 2)}
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`}>
          ${abbrNum(volume, 2)}
        </Link>
      </td>
    </tr>
  );
};

export default CoinItem;
