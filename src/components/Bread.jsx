import React ,{useState,useEffect}from 'react'
import { Breadcrumb } from 'antd';
import {useLocation} from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons';

export default function Bread() {
    const [breadName,setBreadName] =useState('')
    const {pathname} =useLocation()
    useEffect(()=>{
        switch(pathname){
            case '/listlist':
                setBreadName('列表查看文章列表');
                break;
            case '/listtable':
                setBreadName('表格查看文章列表');
                break;
            case '/edit':
                setBreadName('文章编辑');
                break;
            case '/means':
                setBreadName('修改资料');
                break;
            default:
                setBreadName(pathname.includes('edit') ? '文章编辑' : '')
                break;
        }
    },[pathname])
    return (
        <div>
            <Breadcrumb style={{height:'30px',lineHeight:"30px"}}>
                <Breadcrumb.Item href='/'>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
