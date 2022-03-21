import React from 'react'
import { Layout } from 'antd'

const CustomFooter = () => {
  const { Footer } = Layout

  return (
    <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100vw' }}>
      Star Wars Challenge ©2022 Created JosePuente
    </Footer>
  )
}

export default CustomFooter
