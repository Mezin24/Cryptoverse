import { Col, Row, Statistic, Typography } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '.';

export const Homepage = () => {
  const { Title } = Typography;
  const { data, isFetching } = useGetCryptosQuery('');
  const globalStats = data?.data.stats;

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
        <div className='home-heading-container'>
          <Title className='home-title' level={2}>
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title className='show-more' level={3}>
            <Link to='/cryptocurrencies'>Show More</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
        <div className='home-heading-container'>
          <Title className='home-title' level={2}>
            Latest Crypto News
          </Title>
          <Title className='show-more' level={3}>
            <Link to='/news'>Show More</Link>
          </Title>
        </div>
        <News simplified />
      </Title>
    </>
  );
};
