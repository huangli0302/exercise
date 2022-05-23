import  './index.less';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import NavRight from './home/NavRight';
import {useEffect } from 'react';
export default function IndexPage(props:any) {
  const {history}=props;
   useEffect(() => {
     console.log("最外层");
     history.push("/index/list");
   },[]);
  let onClick=()=>{
    history.push("/index/list");
  }
  return (
    <div className='app'>
      <div className='app-header'>
      <Header className="header">
        <div className='left'>
          <a onClick={onClick}>首页</a>
        </div>
        <div className='right'>
          <NavRight {...props}></NavRight>
        </div>
      </Header>
      </div>
      <div className='app-content'>{props.children}</div>
      <div className='app-footer'>3</div>
    </div>
  );
}
