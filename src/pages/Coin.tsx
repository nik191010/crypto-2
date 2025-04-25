import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';

import HistoryChart from '../components/HistoryChart';
import { abbrNum } from '../config/hooks-helpers';
import Converter from '../components/Converter';
import ReadMore from '../components/ReadMore';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
      [key: string]: number;
    };
    price_change_percentage_1h_in_currency: {
      usd: number;
    };
    price_change_percentage_24h_in_currency: {
      usd: number;
    };
    price_change_percentage_7d_in_currency: {
      usd: number;
    };
    price_change_percentage_14d_in_currency: {
      usd: number;
    };
    price_change_percentage_30d_in_currency: {
      usd: number;
    };
    price_change_percentage_1y_in_currency: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    circulating_supply: number;
  };
  description: {
    en: string;
  };
}

const Coin: React.FC = () => {
  const params = useParams<{ coinId: string }>();
  const [coin, setCoin] = useState<CoinData | null>(null);

  const url = `${import.meta.env.VITE_API_COINS_URL}/${params.coinId}`;

  useEffect(() => {
    axios
      .get<CoinData>(url)
      .then((response) => setCoin(response.data))
      .catch((error) => console.error(error));
  }, [url]);

  const checkVal = (val?: number): number => (val ? val : 0);

  if (!coin) return <div>Loading...</div>;

  const {
    description,
    market_cap_rank: rank,
    image,
    name,
    symbol,
    market_data: data,
  } = coin;

  const currentPrice = data.current_price.usd.toLocaleString('en-US');
  const currentPriceConverter = data.current_price;
  const low24h = data.low_24h.usd.toLocaleString('en-US');
  const high24h = data.high_24h.usd.toLocaleString('en-US');
  const marketCap = data.market_cap.usd;
  const circulatingSupply = data.circulating_supply.toLocaleString('en-US');

  const change1h = data.price_change_percentage_1h_in_currency.usd.toFixed(1);
  const change24h = data.price_change_percentage_24h_in_currency.usd.toFixed(1);
  const change7d = data.price_change_percentage_7d_in_currency.usd.toFixed(1);
  const change14d = data.price_change_percentage_14d_in_currency.usd.toFixed(1);
  const change30d = data.price_change_percentage_30d_in_currency.usd.toFixed(1);
  const change1y = data.price_change_percentage_1y_in_currency.usd.toFixed(1);

  return (
    <div className="coin-wrapper">
      <div className="top">
        <div className="top__left">
          <div className="top__rank">Rank #{rank}</div>
          <div className="top__desc">
            <img className="top__logo" src={image.small} alt={name} />
            <div className="top__desc-wrap">
              <h1 className="top__title">{name}</h1>
              <span className="top__short"> • {symbol.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="top__right">
          <p className="top__price">${currentPrice}</p>
          <span
            className={`top__change change-top ${
              checkVal(+change24h) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(+change24h) >= 0 ? (
                <RxTriangleUp />
              ) : (
                <RxTriangleDown />
              )}
            </IconContext.Provider>
            {checkVal(+change24h).toString().replace('-', '')}%
          </span>
        </div>
      </div>

      <HistoryChart />

      <div className="coin-percents">
        {[
          { label: '1h', value: change1h },
          { label: '24h', value: change24h },
          { label: '7d', value: change7d },
          { label: '14d', value: change14d },
          { label: '30d', value: change30d },
          { label: '1y', value: change1y },
        ].map(({ label, value }) => (
          <div key={label} className="coin-percent">
            <p className="coin-percent__time">{label}</p>
            <span
              className={`top__change change-top ${
                checkVal(+value) >= 0 ? 'change-top__up' : 'change-top__down'
              }`}>
              <IconContext.Provider value={{ className: 'change-top__icon' }}>
                {checkVal(+value) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
              </IconContext.Provider>
              {checkVal(+value).toString().replace('-', '')}%
            </span>
          </div>
        ))}
      </div>

      <div className="stats">
        <h2 className="stats__title">Market Stats</h2>
        <div className="stats__wrappper">
          <div className="stats__top">
            <div className="stats__amount">
              <p className="stats__amount-title">24 Hour Low</p>
              <p className="stats__amount-number">${low24h}</p>
            </div>
            <div className="stats__amount">
              <p className="stats__amount-title">24 Hour High</p>
              <p className="stats__amount-number">${high24h}</p>
            </div>
            <div className="stats__amount">
              <p className="stats__amount-title">Market Cap</p>
              <p className="stats__amount-number">${abbrNum(marketCap, 0)}</p>
            </div>
            <div className="stats__amount">
              <p className="stats__amount-title">Circulating Supply</p>
              <p className="stats__amount-number">{circulatingSupply}</p>
            </div>
          </div>
          <div className="stats__bottom">
            <h2 className="stats__bottom-title">{name} Price Update</h2>
            <p className="stats__bottom-text">
              {name}&nbsp;
              <b>
                price is ${currentPrice},
                <span
                  className={`stats__change change-top ${
                    +change24h >= 0 ? 'change-top__up' : 'change-top__down'
                  }`}>
                  <span>{+change24h >= 0 ? 'up' : 'down'}</span>
                  <IconContext.Provider
                    value={{ className: 'change-top__icon' }}>
                    {+change24h >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
                  </IconContext.Provider>
                </span>
                {change24h}% &nbsp;
              </b>
              in the last 24 hours, and the live market cap is{' '}
              <b>${abbrNum(marketCap, 0)}</b>. It has circulating{' '}
              <b>
                supply volume of{' '}
                {`${circulatingSupply} ${symbol.toUpperCase()}`}
              </b>
              .
            </p>
          </div>
        </div>
      </div>

      {currentPriceConverter && (
        <Converter
          image={image.small}
          name={name}
          symbol={symbol.toUpperCase()}
          currentPriceConverter={currentPriceConverter}
        />
      )}

      <ReadMore name={name} description={description.en} />
    </div>
  );
};

export default Coin;
