import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import "./index.css";

// Wrapper component for conditional layout
function Layout() {
  const location = useLocation();
  const checkOutPage = location.pathname.includes('/checkout');
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <>
      {!checkOutPage && !isAdminPage && <Header />}
      <Outlet />
      {!checkOutPage && !isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
