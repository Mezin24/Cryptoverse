import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  CheckOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Col, Row, Select, Typography } from 'antd';
import { useMemo, useState } from 'react';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import { LineChart, Loader } from '.';

const { Title, Text } = Typography;
const { Option } = Select;
const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

export const CryptoDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data } = useGetCryptoDetailsQuery(coinId!);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: coinId!,
    timeperiod: timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  const stats = useMemo(
    () => [
      {
        title: 'Price to USD',
        value: `$ ${cryptoDetails?.price && millify(+cryptoDetails?.price)}`,
        icon: <DollarCircleOutlined />,
      },
      { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
      {
        title: '24h Volume',
        value: `$ ${
          cryptoDetails?.['24hVolume'] && millify(+cryptoDetails?.['24hVolume'])
        }`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: 'Market Cap',
        value: `$ ${
          cryptoDetails?.marketCap && millify(+cryptoDetails?.marketCap)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: 'All-time-high(daily avg.)',
        value: `$ ${
          cryptoDetails?.allTimeHigh?.price &&
          millify(+cryptoDetails?.allTimeHigh?.price)
        }`,
        icon: <TrophyOutlined />,
      },
    ],
    [cryptoDetails]
  );

  const genericStats = useMemo(
    () => [
      {
        title: 'Number Of Markets',
        value: cryptoDetails?.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: 'Number Of Exchanges',
        value: cryptoDetails?.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: 'Aprroved Supply',
        value: cryptoDetails?.supply?.confirmed ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: 'Total Supply',
        value: `$ ${
          cryptoDetails?.supply?.total && millify(+cryptoDetails?.supply?.total)
        }`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: 'Circulating Supply',
        value: `$ ${
          cryptoDetails?.supply?.circulating &&
          millify(+cryptoDetails?.supply?.circulating)
        }`,
        icon: <ExclamationCircleOutlined />,
      },
    ],
    [cryptoDetails]
  );

  if (!cryptoDetails || !coinHistory) {
    return <Loader />;
  }

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} (
          {cryptoDetails.name.toLowerCase().split(' ').join('-')}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(+cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className='stats-container'>
        <Col className='col-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className='coin-stats' key={i}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Other Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col className='coin-stats' key={i}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}?{' '}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map(({ name, type, url }, i) => (
            <Row className='coin-link' key={i}>
              <Title level={5} className='link-name'>
                {type}
              </Title>
              <a href={url} target='_blank' rel='noreferrer'>
                {name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};
