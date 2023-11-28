import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';

export interface NewsProps {
  simplified?: boolean;
}
export const { Title } = Typography;
export const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export const News = ({ simplified }: NewsProps) => {
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');
  const { data } = useGetCryptosQuery('');

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 4 : 10,
  });

  if (!cryptoNews?.articles) {
    return 'Loading...';
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
          >
            <Select.Option value='Cryptocurrency'>Cryptocurrency</Select.Option>
            {data?.data.coins.map((coin) => (
              <Select.Option key={coin.uuid} value={coin.name}>
                {coin.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank'>
              <div className='news-image-container'>
                <Title className='news-title' level={5} rel='noreferrer'>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={demoImage}
                  alt='crypto image'
                />
              </div>
              <p>
                {news.publisher.name} / {news.publisher.url}
              </p>
              <div className='provider-container'>
                <Avatar src={demoImage} alt='news' />
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
