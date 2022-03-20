import * as React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const CustomHeader = () => {
  const { Header } = Layout
  const { Item } = Menu

  // Usamos location para marcar en que pagina estamos parados en el Header
  const location = useLocation()

  return (
    <Header
        className="header"
        style={{ position: 'fixed', zIndex: 1, width: '100%' }}
    >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
            <Item key="/">
                <Link to="/">
                    Home
                </Link>
            </Item>
            <Item key="/about">
                <Link to="/about">
                    About this project
                </Link>
            </Item>
        </Menu>
    </Header>
  )
}

export default CustomHeader
