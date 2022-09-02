import React from 'react'
import { Button,  Form, Input ,message} from 'antd';
import logoImg from '../assets/logo.png'
import "./less/Login.less"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
import { LoginApi } from '../request/api';

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    LoginApi({
      username:values.username,
      password:values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        localStorage.setItem('avatar',res.data.avatar)
        localStorage.setItem('cms-token',res.data['cms-token'])
        localStorage.setItem('editable',res.data.player)
        localStorage.setItem('player',res.data.player)
        localStorage.setItem('username',res.data.username)
        setTimeout(()=>{
          navigate('/')
        },1500)
      }else{
        console.log(res)
        message.error(res.message)
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
              <Input size='large' prefix={<UserOutlined />} placeholder='请输入用户名'/>
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
              <Input.Password size='large'  prefix={<LockOutlined />} placeholder='请输入密码'/>
            </Form.Item>
              <Form.Item>
                <Link to='/register'>还没账号?立即注册</Link>
              </Form.Item>
            <Form.Item>
              <Button size='large' type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
