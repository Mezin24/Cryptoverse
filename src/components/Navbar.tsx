import {
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Menu, MenuProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../assets/images/cryptocurrency.png';

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
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={Icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        <Button
          className='menu-control-container'
          onClick={() => setActiveMenu((prev) => !prev)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && <Menu theme='dark' items={menuItems} />}
    </div>
  );
};
