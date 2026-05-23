import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './Context/UserContext'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import MyOrders from './pages/MyOrders'

function App() {
  let { userData } = useContext(userDataContext)
  let location = useLocation()
  return (
    <>
      {userData && <Nav />}
      <Routes>

        <Route path="/login"
          element={
            userData ? (<Navigate to={location.state?.from || "/"} />)
              : (<Login />)
          } />

        <Route path='/registration' element={
          userData ? (<Navigate to={location.state?.from || "/"} />)
            : (<Registration />)} />


        <Route path='/'
          element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path="/about" element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path="/collection" element={userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path="/product" element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path="/contact" element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route path="/productdetails/:productId" element={userData ? <ProductDetails /> : <Navigate to="/login" state={{ from: location.pathname }} />} />

        <Route
          path="/cart"
          element={
            userData
              ? <Cart />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/placeorder"
          element={
            userData
              ? <PlaceOrder />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/myorders"
          element={
            userData
              ? <MyOrders />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

      </Routes>
    </>
  )
}

export default App
