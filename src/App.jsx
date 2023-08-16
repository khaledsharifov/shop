import React from 'react'
import './App.css'

import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Nothing from './Pages/Nothing/Nothing'
import Basket from './Pages/Basket/Basket'
import Checkout from './Pages/Checkout/Checkout'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index:true,
                element: <Home/>
            },
            {
                path: "product/:productId",
                element: <Product/>
            },
            {
                path: "basket",
                element: <Basket/>
            },
            {
                path: "checkout",
                element: <Checkout/>
            },
            {
              path: "*",
              element: <Nothing/>
            }
        ]
    }
])


function App() {

  return (
   <RouterProvider router={router} />
  )
}

export default App
