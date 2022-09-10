import React, { useEffect, useState } from 'react'
import './less/Means.less'
import { Button,  Form, Input, message } from 'antd';
import { GetUserDataApi,ChangeUserApi } from '../request/api.ts';
export default function Means() {

  useEffect(()=>{
    GetUserDataApi().then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        sessionStorage.setItem('username',res.data.username)
      }
    })
  },[])
  const onFinish=(values)=>{
    if(values.username && values.username!==sessionStorage.getItem('username') && values.password.trim() !==''){
      ChangeUserApi({
        username:values.username,
        password:values.password
      }).then(res=>{
        if(res.errCode===0){
          console.log(res)
          message.success(res.message)
        }
        console.log(res)
      }).catch((e)=>{
          console.log(e)
        }
      )
    }
  }
  return (
    <div className='means'>
      <Form
        style={{ width: "400px" }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名"
          name="username"
        >
          <Input placeholder='请输入用户名'/>
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"
        >
          <Input.Password  placeholder='请输入密码'/>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" style={{float:'right'}}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
