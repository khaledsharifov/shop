import React from 'react'
import './App.css'

import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Nothing from './Pages/404/NotFound'
import Basket from './Pages/Basket/Basket'
import Checkout from './Pages/Checkout/Checkout'
import NotFound from './Pages/404/NotFound'


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
              element: <NotFound/>
            },
            {
              path: "404",
              element: <NotFound/>
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
