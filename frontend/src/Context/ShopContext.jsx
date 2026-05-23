import React, { createContext, useContext, useState, useEffect } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
export const shopDataContext = createContext()

function ShopContext({ children }) {

  let [products, setProducts] = useState([])
  let [search, setSearch] = useState('')
  let [showSearch, setShowSearch] = useState(false)
  let { serverUrl } = useContext(authDataContext)
let [cartItem, setCartItem] = useState(
   JSON.parse(localStorage.getItem("cart")) || {}
)
  let currency = 'र';
  let delivery_fee = 50;;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      console.log(result.data);
      setProducts(result.data)

    } catch (error) {

    }
  }

  const addtocart = async (itemId, size) => {
    if (!size) {
  alert("Please Select Product Size")
      return;
    }

    let cartData = structuredClone(cartItem); //clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1;
      }
    }
    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData)
    console.log(cartData);
    
    
  }

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItem));
}, [cartItem]);

const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartItem) {
    for (const item in cartItem[items]) {
      if (cartItem[items][item] > 0) {
        totalCount += cartItem[items][item];
      }
    }
  }
  return totalCount;
};


useEffect(() => {
   getProducts()
}, [])

  let value = {
    products, currency, delivery_fee, getProducts, search, setSearch, showSearch, setShowSearch, cartItem, addtocart,
    getCartCount, setCartItem
  }

  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext
