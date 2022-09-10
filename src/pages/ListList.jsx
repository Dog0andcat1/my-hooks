import React, { useEffect, useState } from 'react'
import { List, Skeleton, Pagination, Button, message } from 'antd';
import { ArticleListApi, ArticleDelApi } from "../request/api.ts"
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment';
export default function ListList() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPagesize] = useState(10);
  const navigate = useNavigate()
  const [update,setUpdate] =useState(1)
  const getList = (num) => {
    ArticleListApi({
      num,
      count: pageSize,
    }
    ).then(res => {
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data;
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPagesize(count)
      }
    })
  }
  useEffect(() => {
    getList(current)
  }, [])

  useEffect(() => {
    getList(current)
  }, [update])

  const onChange = (pages) => {
    getList(pages);
  }
  const delFn = (id) => {
    ArticleDelApi({id}).then(res => {
      if (res.errCode === 0) {
        message.success(res.message)
        setUpdate(update+1)
      }
    })
  }
  return (
    <div className='list_table' style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<Button type='primary' onClick={() => { navigate('/edit/' + item.id) }}>编辑</Button>,
            <Button type='danger' onClick={() =>  delFn(item.id) }>删除</Button>]}
          >
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a href="!#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format('YYYY-MM-DD hh:mm:ss')}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination style={{ float: 'right', marginTop: '20px' }} onChange={onChange} total={50} />
    </div>

  )
}
