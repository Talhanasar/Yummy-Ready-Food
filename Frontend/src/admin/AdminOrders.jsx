import React, { useState } from 'react'
import { Check, Search, Trash2 } from 'lucide-react'
import { useAdminContext } from '../contexts/AdminContext'
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'
import { useNavigate } from "react-router"
import StatusBadge from '../components/ui/StatusBadge'
import Table from '../components/Table'

export default function AdminOrders() {
    const { allOrders, cancelOrder, updateOrderStatus } = useAdminContext()
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('pending')
    const navigate = useNavigate()

    const handleCompleteOrder = (orderId) => {
        updateOrderStatus(orderId, 'completed')
    }

    const handleCancelOrder = (orderId) => {
        cancelOrder(orderId)
    }

    const filteredOrders = allOrders.filter(order =>
        (order.status.toLowerCase() === activeTab) &&
        (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phoneNumber.includes(searchTerm))
    )

    const columns = [
        { key: 'customerName', header: 'Customer', className: 'w-[18.4%]' },
        { key: 'phoneNumber', header: 'Phone', className: 'w-[18.4%]' },
        { 
            key: 'createdAt', 
            header: 'Date', 
            className: 'w-[18.4%]',
            render: (order) => new Date(order.createdAt).toLocaleDateString()
        },
        { 
            key: 'totalPrice', 
            header: 'Total', 
            className: 'w-[15%]',
            render: (order) => (
                <div className="text-sm font-medium text-gray-900">{order.totalPrice}৳</div>
            )
        },
        { 
            key: 'status', 
            header: 'Status', 
            className: 'w-[15%]',
            render: (order) => <StatusBadge status={order.status} />
        },
    ]

    const actions = [
        {
            icon: activeTab === 'pending' ? <Check className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />,
            onClick: (order) => activeTab === 'pending' ? handleCompleteOrder(order._id) : handleCancelOrder(order._id),
            className: activeTab === 'pending' ? "bg-green-500 text-white hover:bg-green-600" : "bg-red-500 text-white hover:bg-red-600"
        }
    ]

    return (
        <main className="flex-1 p-8 overflow-hidden bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
                {/* Tab Navigation */}
                <div className="mb-6">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        {['pending', 'completed'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === tab
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mb-6 flex justify-between items-center">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search by customer or phone"
                            className="w-[30vw] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex space-x-2">
                        <Button className="bg-orange-500 text-white hover:bg-orange-600">
                            Export Orders
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={filteredOrders.reverse()}
                    onRowClick={(order) => navigate(`/admin/order/${order._id}`)}
                    actions={actions}
                />
            </div>
        </main>
    )
}
