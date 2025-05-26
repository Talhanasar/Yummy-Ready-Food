import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import './index.css'
import ReactLenis from 'lenis/react'
import { CouponProvider } from './contexts/CouponContext.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <CouponProvider>
          <ReactLenis root>
            <App />
          </ReactLenis>
        </CouponProvider>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  </StrictMode>,
)