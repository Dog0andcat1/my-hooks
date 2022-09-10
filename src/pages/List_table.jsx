import React, { useState, useEffect } from 'react'
import './less/ListTable.less'
import { Space, Table, Button,message } from 'antd';
import { Link ,useNavigate} from 'react-router-dom';
import { ArticleListApi,ArticleDelApi } from '../request/api.ts';
import moment from 'moment/moment';

function Mytitle(props) {
    return (
        <div>
            <a href={'http://codesohigh.com:8765/article/' + props.id} className='table_title' target='_blank'>{props.title}</a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    )
}
export default function List_table() {
    const [pagination,setPagination] =useState({
        current:1,
        pageSize:10,
        total:10,
    })
    const navigate=useNavigate()
    //列表数组
    const [update,setUpdate] =useState(1)
    const [arr, setArr] = useState()
    const  getArticleList=(current,pageSize)=>{
        ArticleListApi({
            num:current,
            count:pageSize
        }).then(res => {
            if (res.errCode === 0) {
                let newArr = JSON.parse(JSON.stringify(res.data.arr))
                let myarr = []
                let {num,count,total}=res.data
                setPagination({
                    current:num,
                    pageSize:count,
                    total:total,
                })
                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
                        mytitle: <Mytitle title={item.title} subTitle={item.subTitle} id={item.id} />
                    }
                    myarr.push(obj)
                })
                setArr(myarr)
            }
        })
    }
    const delFn = (id) => {
        ArticleDelApi({id}).then(res => {
          if (res.errCode === 0) {
            message.success(res.message)
            getArticleList(1,pagination.pageSize);
          }
        })
      }
    useEffect(() => {
       getArticleList(pagination.current,pagination.pageSize);
    }, [])
    const pageChange=(arg)=>{
        console.log(pagination)
        getArticleList(arg.current,arg.pageSize)
    }
    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => (
                <div>{text}</div>
            )
        },
        {
            dataIndex: 'age',
            key: 'age',

        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => (
                <p>{text}</p>
            )
        },
        {
            key: 'action',
            render: (text) => {
                return (
                <Space size="middle">
                    <Button type='primary' onClick={()=>navigate('/edit/' + text.key) }>编辑</Button>
                    <Button type='danger' onClick={()=>delFn(text.key)}>删除</Button>
                </Space>
                )
            },
        },
    ];
    return (
        <div className='list_table'>
            <Table onChange={pageChange} 
            showHeader={false} 
            columns={columns} 
            dataSource={arr}
            pagination={pagination} />
        </div>
    )
}
