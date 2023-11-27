import { Col, Row, Statistic, Typography } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';

export const Homepage = () => {
  const { Title } = Typography;
  const { data, isFetching } = useGetCryptosQuery('');
  const globalStats = data?.data.stats;
  console.log(globalStats);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  if (!globalStats) {
    return <h1>Fetch problems</h1>;
  }

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
        <Row>
          <Col span={12}>
            <Statistic
              title='Total Cryptocurrencies'
              value={globalStats.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Exchange'
              value={millify(globalStats.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Market Cap'
              value={millify(+globalStats.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total 24h Volume'
              value={millify(+globalStats.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Markets'
              value={millify(globalStats?.totalMarkets)}
            />
          </Col>
        </Row>
      </Title>
    </>
  );
};
