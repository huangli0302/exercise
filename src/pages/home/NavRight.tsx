import React from 'react'
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {logout} from '@/api/login';
import {connect} from 'umi';
function NavRight(props:any) {
  console.log(props);
  const {history,user} = props;
  let logoutHandle = async()=>{
    let res = await logout();
    if(res){
      const removeList =["isLogin","token"]
      removeList.forEach((res:String)=>{
        console.log(res);
        localStorage.removeItem(res);
      })
      history.push('/login');
    }
  }
  const menu = (
    <Menu
      items={[
        {
          label: <span>退出</span>,
          key: '0',
        },
      ]}
      onClick={logoutHandle}
      className="menu"
    />
  );
  return (
    <div className='right-nav-container'>
       <Dropdown overlay={menu} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            {user.username}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}
export default connect(({user}:any)=>({user}))(NavRight);