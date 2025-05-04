import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { ReactLenis, useLenis } from 'lenis/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root>
      <CartProvider>
        <App />
      </CartProvider>
    </ReactLenis>
  </StrictMode>,
)
