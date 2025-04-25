import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { chartDays } from '../../config/data';
import styles from './HistoryChart.module.scss';

import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Decimation,
  ChartData,
  ChartOptions,
  TooltipItem,
  TooltipModel,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Decimation,
);

interface ChartDay {
  label: string;
  value: number | string;
  format: string;
}

interface CoinChartData {
  prices?: [number, number][];
}

interface Params {
  coinId?: string;
}

const HistoryChart: React.FC = () => {
  const { coinId } = useParams<Params>();
  const [chartData, setChartData] = React.useState<CoinChartData>({});
  const [days, setDays] = React.useState<number | string>(1);
  const [format, setFormat] = React.useState<string>('H:mm');
  const [active, setActive] = React.useState<number>(0);

  React.useEffect(() => {
    if (!coinId) return;

    const url = `${
      import.meta.env.VITE_API_COINS_URL
    }/${coinId}/market_chart?vs_currency=usd&days=${days}`;
    axios
      .get<CoinChartData>(url)
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [days, coinId]);

  if (!coinId) return <div>No coin specified</div>;

  const coinChartData = chartData.prices?.map((value) => ({
    x: value[0],
    y: Number(value[1].toFixed(2)),
  }));

  const labelName = coinId[0].toUpperCase() + coinId.slice(1);

  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: days === 'max' ? false : {},
    elements: {
      point: {
        radius: days === 'max' ? 0 : 3,
      },
    },
    plugins: {
      decimation: {
        enabled: true,
        algorithm: 'lttb' as const,
        samples: 10,
        threshold: 20,
      },
      tooltip: {
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            let label = 'USD';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
          labelColor: function (
            this: TooltipModel<'line'>,
            tooltipItem: TooltipItem<'line'>,
          ) {
            return {
              backgroundColor: '#ff9332',
              borderColor: '#ff9332',
            };
          },
        },
      },
    },
  };

  const data: ChartData<'line'> = {
    labels: coinChartData?.map((value) => moment(value.x).format(format)) ?? [],
    datasets: [
      {
        fill: true,
        label: labelName.toUpperCase(),
        data: coinChartData?.map((value) => value.y) ?? [],
        borderColor: '#ff9332',
      },
    ],
  };

  const handleClick = (index: number, day: ChartDay) => {
    setActive(index);
    setDays(day.value);
    setFormat(day.format);
  };

  return (
    <div className={styles.root}>
      <div className={styles.chartWrap}>
        <Line options={options} data={data} />
      </div>
      <div className={styles.options}>
        {chartDays.map((day, index) => (
          <span
            key={index}
            id={String(index)}
            className={`${styles.item} ${
              active === index ? styles.item_active : ''
            }`}
            onClick={() => handleClick(index, day)}>
            {day.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HistoryChart;
