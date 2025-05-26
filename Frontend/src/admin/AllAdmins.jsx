import React, { useEffect, useState } from 'react'
import { Trash2, Search, User, Check } from 'lucide-react'
import { useAdminContext } from '../contexts/AdminContext'
import Input from '../components/ui/Input'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import Table from '../components/Table'
import { useNavigate } from "react-router"

export default function AllAdmins() {
    const { allAdmins, setAllAdmins, approveAdmin, deleteAdmin } = useAdminContext()
    const { admin } = useAuth()
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('all')

    useEffect(() => {
        if (admin.role !== 'superadmin') {
            toast.error('You are not authorized to access this page')
            navigate('/admin/dashboard')
        }
    }, [admin])

    const filteredAdmins = allAdmins.filter(admin =>
        admin.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === 'all' || admin.isApproved === (activeTab === 'active'))
    )

    const columns = [
        { key: 'username', header: 'Name', className: 'w-1/5' },
        { key: 'role', header: 'Role', className: 'w-1/5' },
        { key: 'phoneNumber', header: 'Phone Number', className: 'w-1/5' },
        { 
            key: 'isApproved', 
            header: 'Status', 
            className: 'w-1/5',
            render: (admin) => admin.isApproved ? (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                </span>
            ) : (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Not Approved
                </span>
            )
        },
    ]

    const actions = [
        {
            icon: <Check className="h-4 w-4" />,
            onClick: (admin) => approveAdmin(admin._id),
            className: "bg-green-500 text-white hover:bg-green-600",
            condition: (item) => !item.isApproved && item.username !== admin.username
        },
        {
            id: 'delete',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: (admin) => deleteAdmin(admin._id),
            className: "bg-red-500 text-white hover:bg-red-600",
            condition: (item) => item.username !== admin.username,
            false: <User className="h-4 w-4" />
        }
    ]

    return (
        <main className="flex-1 p-8 overflow-hidden bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">All Admins</h1>
                </div>
                <div className="mb-6">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        {['all', 'active', 'requests'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-2 font-medium text-sm rounded-md ${
                                    activeTab === tab
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
                            placeholder="Search admins"
                            className="w-[30vw] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={filteredAdmins}
                    actions={actions}
                />
            </div>
        </main>
    )
}