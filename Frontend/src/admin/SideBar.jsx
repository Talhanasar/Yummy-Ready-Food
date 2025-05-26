import React from 'react'
import { NavLink } from "react-router"
import { useAuth } from '../contexts/AuthContext';

const SideBar = () => {
    const { admin } = useAuth();
    return (
        <aside className="w-64 bg-orange-500 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <NavLink to="/" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-orange-600' : 'hover:bg-orange-600'}`}>Home</NavLink>
                <NavLink to="/admin/dashboard" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-orange-600' : 'hover:bg-orange-600'}`}>Dashboard</NavLink>
                <NavLink to="/admin/products" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-orange-600' : 'hover:bg-orange-600'}`}>Products</NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-orange-600' : 'hover:bg-orange-600'}`}>Orders</NavLink>
                <NavLink to="/admin/coupons" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-orange-600' : 'hover:bg-orange-600'}`}>Coupons</NavLink>
                {admin.role === "superadmin" && <NavLink to="/admin/admins" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-orange-600' : 'hover:bg-orange-600'}`}>Admins</NavLink>}
            </nav>
        </aside>
    )
}

export default SideBar
