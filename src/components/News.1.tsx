import { Avatar, Card, Col, Row, Select } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import { useState } from 'react';
import { NewsProps, demoImage } from './News';

export const News = ({ simplified }: NewsProps) => {
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');
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
            onChange={(value) => console.log(value)}
            filterOption={(input, option) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
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
                <Text>{moment(news.published_date).format('LL')}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
