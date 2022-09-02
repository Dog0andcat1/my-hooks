import React from 'react';
import { Menu } from 'antd';
import {ReadOutlined, EditOutlined,DatabaseOutlined } from '@ant-design/icons';

export default function Aside() {
  const handleClick = (e) => {
    console.log('click ', e);
  };

    return (
      <Menu
        onClick={handleClick}
        style={{
          width: 180,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme='dark'
        className='aside'
      >
        <Menu.Item key='1'><ReadOutlined />查看文章列表</Menu.Item>
        <Menu.Item key='2'><EditOutlined />文章编辑</Menu.Item>
        <Menu.Item key='3'><DatabaseOutlined />修改资料</Menu.Item>
      </Menu>
    );
  }

