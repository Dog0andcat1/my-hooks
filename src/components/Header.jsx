import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import defaultAvatar from '../assets/defaultAvatar.jpg'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [name, setName] = useState('游客')
    const navigate = useNavigate()

    useEffect(() => {
        let username1 = localStorage.getItem('name')
        let avatar1 = localStorage.getItem('avatar')
        if (username1) {
            setName(username1)
        }
        if (avatar1) {
            setAvatar('http://47.93.114.103:6688/' + avatar1)
        }
    }, [])
    const logout = () => {
        localStorage.clear()
        message.success('正在退出,即将返回登入页')
        setTimeout(() => {
            navigate('/login')
        }, 1500)
    }
    const menu = (
        <Menu>
            <Menu.Item key={1}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <div>
            <header>
                <img src={logoImg} alt='' className='logo'></img>
                <div className='right'>
                    <Dropdown overlay={menu}>
                        <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                                <img src={avatar} alt='' className='avatar'></img>
                                <span>{name}</span>
                                <CaretDownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </header>
        </div>
    )
}
