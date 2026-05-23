import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Login from './pages/Login'

import Nav from './component/Nav'
import Sidebar from './component/Sidebar'

import { adminDataContext } from './contex/AdminContext'
import Edit from './pages/Edit'

function App() {

  const { adminData } = useContext(adminDataContext)

  return (

    <>

      {
        !adminData

          ?

          <Login />

          :

          <div className='min-h-screen bg-[#07131a]'>

            <Nav />

            <Sidebar />

            <Routes>

              <Route path='/' element={<Home />} />

              <Route path='/add' element={<Add />} />

              <Route path='/lists' element={<Lists />} />

              <Route path='/orders' element={<Orders />} />

              <Route path='/edit/:id' element={<Edit />} />

            </Routes>

          </div>
      }

    </>
  )
}

export default App