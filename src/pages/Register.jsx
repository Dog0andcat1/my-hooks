import React from 'react'
import { Button, Form, Input,message } from 'antd';
import logoImg from '../assets/logo.png'
import "./less/Login.less"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
import { RegisterApi } from '../request/api';
export default function Register() {
  const navigate=useNavigate()
  const onFinish = (values) => {
    RegisterApi({
      username:values.username,
      Password:values.password
    }).then(
      res=>{
        console.log(res)
        if(res.errCode===0){
          message.success(res.message);
          setTimeout(()=>{
           navigate('/login') 
          },1500)
        }else{
          message.error(res.message);
        }
      })  
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login'>
      <div className='login_box'>
        <img src={logoImg} alt=""></img>
        <div>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input size='large' prefix={<UserOutlined />} placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input.Password size='large' prefix={<LockOutlined />} placeholder='请输入密码' />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次确认密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('请输入相同密码!'));
                  },
                }),
              ]}
            >
              <Input.Password size='large' prefix={<LockOutlined />} placeholder='请确认输入密码' />
            </Form.Item>
            <Form.Item>
              <Link to='/login'>已有账号?前往登录</Link>
            </Form.Item>
            <Form.Item>
              <Button size='large' type="primary" htmlType="submit" block>
                立即注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
