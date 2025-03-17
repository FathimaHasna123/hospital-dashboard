import './App.css'
import { Button, Layout, Menu } from 'antd';
import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Link, Outlet } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import { FcDepartment, FcList } from "react-icons/fc"
import { FaUserDoctor } from "react-icons/fa6"
import { FcContacts } from "react-icons/fc"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
 <>
<Layout className="m-0 h-screen w-full">
<Sider trigger={null} collapsible collapsed={collapsed}>
  <div className="demo-logo-vertical h-[100px]"/>
  <Menu 
  theme="dark"
  mode="inline"
  defaultSelectedKeys={['1']}>

    <Menu.Item key={'1'} icon={<FcList />}>
    <Link to={'/dashboard'}>Dashborad</Link>
    </Menu.Item>

    <Menu.Item key={'2'} icon={<FcDepartment />}>
    <Link to={'/department'}>Department</Link>
    </Menu.Item>

    <Menu.Item key={'3'} icon={<FaUserDoctor/>}>
    <Link to={'/doctors'}>Doctors</Link>
    </Menu.Item>

    <Menu.Item key={'4'} icon={<FcContacts />}>
    <Link to={'/contact'}>Contact</Link>
    </Menu.Item>

  </Menu>
</Sider>

<Layout className="h-full w-full">
  <Header
  style={{
    padding:0,
  }}>
    <Button type="text" icon={collapsed ?<MenuUnfoldOutlined/> :<MenuFoldOutlined  /> }
    onClick={() =>setCollapsed(!collapsed)}
    style={{
      fontSize:'20px',
      width:64,
      height:64,
    }}/>
  </Header>

  <Content style={{
    margin:'24px 16px',
    padding:74,
    minHeight:813,
  }}>
    <Outlet/>
  </Content>
</Layout>
</Layout>
 </>
  )
}

export default App
