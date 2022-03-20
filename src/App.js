// App.js
import * as React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home'

function App () {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
