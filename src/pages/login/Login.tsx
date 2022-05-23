import React ,{useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './login.less'
import {TranslationOutlined,UserOutlined,LockOutlined} from '@ant-design/icons';
import {login} from '@/api/login';
import {connect} from 'umi';
 function Login(props:any) {

  console.log(props);
  const {history,dispatch}=props;
  const [loading, setLoding] = useState(false);
  let onFinish=(value:any)=>{
    console.log(value);
    setLoding(true);
    login(value).then((res:any)=>{
      console.log(res);
      localStorage.setItem("isLogin","true");
      localStorage.setItem("token",res.token);
      localStorage.setItem("username",value.username);
      dispatch({
        type: "user/saveName",
        payload: { username: value.username },
      });
      history.replace("/");
    })
  }
  return (
    <div className='login'>
      <div className='login-container'>
        <div className='login-header'>
          <div className='logo-title'>
            <TranslationOutlined className='logo'/>
            <span className='logo-name'>倍智智能</span>
          </div>
          <div className='title-name-2'><span>倍智大数据基础平台</span></div>
        </div>
        <div className='login-from'>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名必填' }]}
            >
              <Input placeholder="用户名：admin or user" prefix={<UserOutlined />}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码必填' }]}
            >
              <Input.Password placeholder="请输入密码" prefix={<LockOutlined className="site-form-item-icon" />}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default connect(({user}:any)=>({user}))(Login);
