import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import {
  CryptoDetails,
  Cryptocurrencies,
  Exchanges,
  Homepage,
  Navbar,
  News,
} from './components';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default App;
