import { useEffect, useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Loader } from '.';

interface CryptocurrenciesProps {
  simplified?: boolean;
}

export const Cryptocurrencies = ({ simplified }: CryptocurrenciesProps) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  useEffect(() => {
    setCryptos(cryptoList?.data.coins);
    const filteredData = cryptoList?.data.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptoceurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.slice(0, count)?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            key={currency.uuid}
            className='crypto-card'
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(+currency.price)}</p>
                <p>Market Cap: {millify(+currency.marketCap)}</p>
                <p>
                  Daily Change:{' '}
                  <span
                    style={{ color: +currency.change > 0 ? 'green' : 'red' }}
                  >
                    {millify(+currency.change)}%
                  </span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
