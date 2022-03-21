// App.js
import * as React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home/Home'
import Character from './screens/Character/Character'

function App () {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/character" element={<Character />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
