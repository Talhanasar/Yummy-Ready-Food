import { RouterProvider, createBrowserRouter } from 'react-router'
import Applayout from './Applayout'
import LandingPage from './pages/LandingPage'
import ShopPage from './pages/ShopPage'
import AboutUsPage from './pages/AboutUsPage'
import NotFound from './pages/404Page'
import ProductDetails from './pages/ProductDetail'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'
import AdminPage from './pages/AdminPage'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout/>,
      errorElement:<NotFound/>,
      children:([
        { 
          path:"/",
          element:<LandingPage/>
        },
        {
          path:"/shop",
          element:<ShopPage/>
        },
        {
          path:"/aboutus",
          element:<AboutUsPage/>
        },
        {
          path:"/product/:name",
          element:<ProductDetails/>
        },
        {
          path:"/checkout",
          element:<CheckoutPage/>
        },
        {
          path:"/order-confirmation",
          element:<ConfirmationPage/>
        },
        {
          path:"/admin/:page",
          element:<AdminPage/>
        },
        {
          path:"/admin/order/:id",
          element:<AdminPage/>
        },
        {
          path:"/admin/product/:id",
          element:<AdminPage/>
        },
        {
          path:"/admin/coupon/:id",
          element:<AdminPage/>
        }
      ])
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
export default App
