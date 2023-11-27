import {
  MenuOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  BuildOutlined,
  FundOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, MenuProps, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Icon from '../assets/images/cryptocurrency.png';
import React from 'react';

const menuItems: MenuProps['items'] = [
  { icon: HomeOutlined, label: 'Home', path: '/' },
  { icon: FundOutlined, label: 'Cryptocurrencies', path: '/cryptocurrencies' },
  { icon: MoneyCollectOutlined, label: 'Exchanges', path: '/exchanges' },
  { icon: HomeOutlined, label: 'News', path: '/news' },
].map(({ icon, label, path }, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: <Link to={path}>{label}</Link>,
  };
});

export const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={Icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark' items={menuItems} />
    </div>
  );
};
