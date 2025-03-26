import React from 'react'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      {/* // create routes here as per your requirements */}
      <Routes>
        <Route path='/' element ={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
