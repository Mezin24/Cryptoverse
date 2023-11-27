import {
  MenuOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  BuildOutlined,
  FundOutlined,
} from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Icon from '../assets/images/cryptocurrency.png';

export const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={Icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
    </div>
  );
};
