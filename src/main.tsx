import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateProducts } from './pages/CreateProducts'
import { UserCart } from './pages/UserCarts'

const router = createBrowserRouter([
    {
    path: "/",
        element: <App />
},
{
    path: "/create_products",
        element: <CreateProducts />
},
    {
        path:"/user_cart",
        element:<UserCart/>
    }
   ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,

)
