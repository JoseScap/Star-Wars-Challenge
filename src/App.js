// App.js
import * as React from 'react'
import './App.css'
import { Layout } from 'antd'
import { CustomHeader } from './components'

function App () {
  return (
    <React.Fragment>
      <Layout className="layout">
        <CustomHeader />
      </Layout>
    </React.Fragment>
  )
}

export default App
