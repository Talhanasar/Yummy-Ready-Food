import React, { useState, useEffect } from 'react'
import { ShoppingBag, Package, DollarSign, Users, BarChart2 } from 'lucide-react'
import { useAdminContext } from '../contexts/AdminContext'
import { useProducts } from '../contexts/ProductContext'

function DashboardCard({ title, value, icon: Icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current > value) {
        clearInterval(timer);
        setCount(value);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="rounded-full bg-orange-100 p-3 mr-4">
        <Icon className="h-8 w-8 text-orange-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
    const {allOrders} = useAdminContext()
    const {products} = useProducts()
    const totalOrders = allOrders.length
    const totalProducts = products.length
    const totalRevenue = allOrders.reduce((acc, order) => acc + order.totalPrice, 0)
    const totalCustomers = new Set(allOrders.map(order => order.phoneNumber)).size
  return (
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Orders" value={totalOrders} icon={ShoppingBag} />
          <DashboardCard title="Total Products" value={totalProducts} icon={Package} />
          <DashboardCard title="Total Revenue" value={totalRevenue} icon={DollarSign} />
          <DashboardCard title="Total Customers" value={totalCustomers} icon={Users} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Overview</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
            <BarChart2 className="h-16 w-16 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart placeholder</span>
          </div>
        </div>
      </main>
  )
}