import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Context/authContext.jsx'
import UserContext from './Context/UserContext.jsx'
import ShopContext from './Context/ShopContext.jsx'
import axios from "axios"

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContext>
          <ShopContext>
          <App />
          </ShopContext>
        </UserContext>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
