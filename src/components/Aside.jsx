import React,{useEffect,useState} from 'react';
import { Menu } from 'antd';
import {useNavigate,useLocation} from 'react-router-dom'
import {ReadOutlined, EditOutlined,DatabaseOutlined } from '@ant-design/icons';

export default function Aside() {
  const location = useLocation()
  const navigate =useNavigate()
  const [defaultKey,setDefaultKey] = useState('')
  const handleClick = (e) => {
    navigate('/'+e.key);
    setDefaultKey(e.key)

  };
  useEffect(()=>{
    let path =location.pathname.split('/')[1]
    setDefaultKey(path)
  },[location.pathname])
    return (
      <Menu
        onClick={handleClick}
        style={{
          width: 185,
        }}
        selectedKeys={[defaultKey]}
        mode="inline"
        theme='dark'
        className='aside'
      >
        <Menu.Item key='listlist'><ReadOutlined />查看文章列表List</Menu.Item>
        <Menu.Item key='listtable'><ReadOutlined />查看文章列表Table</Menu.Item>
        <Menu.Item key='edit'><EditOutlined />文章编辑</Menu.Item>
        <Menu.Item key='means'><DatabaseOutlined />修改资料</Menu.Item>
      </Menu>
    );
  }

