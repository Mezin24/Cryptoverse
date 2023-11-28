import { Col, Row, Typography } from 'antd';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CoinHistory } from '../types';

const { Title } = Typography;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface LineChartProps {
  coinHistory: CoinHistory;
  currentPrice: string;
  coinName: string;
}

export const LineChart = ({
  coinHistory,
  coinName,
  currentPrice,
}: LineChartProps) => {
  const coinPrice = coinHistory.data.history.map(({ price }) => +price);
  const coinTimestamp = coinHistory.data.history.map(({ timestamp }) =>
    new Date(timestamp).toLocaleDateString()
  );

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <>
      <Row className='chart-header' style={{ marginTop: '1rem' }}>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {coinHistory.data.change}%
          </Title>
          <Title level={5} className='current-price'>
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};
