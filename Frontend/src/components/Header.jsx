import { NavLink } from "react-router-dom"
import { useState } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import SideCart from "./SideCart"
// import { useAuth } from "../contexts/AuthContext"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { toggleCart } = useCart()
    // const { admin } = useAuth()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    // const cartItemCount = cart.length

    return (
        <>
            <header className={`px-4 lg:px-6 h-[5rem] flex items-center bg-orange-500 sticky top-0 z-30`}>
                <NavLink className="flex items-center justify-center" to="/">
                    <img
                        src="/images/logo.jpg"
                        alt="Yummy Ready Food Logo"
                        className="w-12 h-12 mr-2 rounded-full"
                    />
                </NavLink>
                <div className="relative ml-auto mr-[2rem] text-white cursor-pointer"
                    onClick={toggleCart}
                >
                    <ShoppingCart size={24} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        0
                        {/* {cartItemCount} */}
                    </span>
                </div>
                <button
                    className="lg:hidden text-white"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <nav className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute top-[5rem] left-0 right-0 bg-orange-500 lg:static lg:gap-6 justify-center lg:items-center`}>
                    <NavLink className={({ isActive }) => `text-sm font-medium text-white hover:underline underline-offset-4 p-4 lg:p-0 border-b lg:border-b-0 ${isActive ? 'underline' : ''}`} to="/" onClick={toggleMenu}>
                        Home
                    </NavLink>
                    <NavLink className={({ isActive }) => `text-sm font-medium text-white hover:underline underline-offset-4 p-4 lg:p-0 border-b lg:border-b-0 ${isActive ? 'underline' : ''}`} to="/" onClick={toggleMenu}>
                        Shop
                    </NavLink>
                    <NavLink className={({ isActive }) => `text-sm font-medium text-white hover:underline underline-offset-4 p-4 lg:p-0 border-b lg:border-b-0 ${isActive ? 'underline' : ''}`} to="/" onClick={toggleMenu}>
                        About Us
                    </NavLink>
                    {/* {admin.role && <NavLink className={({ isActive }) => `text-sm font-medium text-white hover:underline underline-offset-4 p-4 lg:p-0 border-b lg:border-b-0 ${isActive ? 'underline' : ''}`} to="/admin/dashboard" onClick={toggleMenu}>
                        Admin Panel
                    </NavLink>} */}
                </nav>
            </header>
            <SideCart/>
        </>
    )
}

export default Header