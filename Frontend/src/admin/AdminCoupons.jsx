import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'
import { useNavigate } from "react-router";
import { useCoupon } from '../contexts/CouponContext';
import Table from '../components/Table';

export default function AdminCoupons() {
    const { coupons, deleteCoupon, setCouponToEdit, setIsCouponEditOpen } = useCoupon()
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const columns = [
        { key: 'code', header: 'Code', className: 'w-1/5' },
        { 
            key: 'discountPercentage', 
            header: 'Discount', 
            className: 'w-1/5',
            render: (coupon) => `${coupon.discountPercentage}%`
        },
        { 
            key: 'validUntil', 
            header: 'Valid Until', 
            className: 'w-1/5',
            render: (coupon) => new Date(coupon.validUntil).toLocaleDateString()
        },
        { 
            key: 'isActive', 
            header: 'Status', 
            className: 'w-1/5',
            render: (coupon) => (
                <span className={`px-2 py-1 rounded-full text-xs ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
    ]

    const actions = [
        {
            icon: <Edit className="h-4 w-4" />,
            onClick: (coupon) => {
                setCouponToEdit(coupon)
                setIsCouponEditOpen(true)
            },
            className: "bg-blue-500 text-white hover:bg-blue-600"
        },
        {
            icon: <Trash2 className="h-4 w-4" />,
            onClick: (coupon) => deleteCoupon(coupon._id),
            className: "bg-red-500 text-white hover:bg-red-600"
        }
    ]

    return (
        <main className="flex-1 p-8 overflow-hidden bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
                    <Button className="bg-orange-500 text-white hover:bg-orange-600"
                        onClick={() => {
                            setCouponToEdit(null)
                            setIsCouponEditOpen(true)
                        }}
                    >
                        <Plus className="inline-block mr-2 h-5 w-5" />
                        Add Coupon
                    </Button>
                </div>
                <div className="mb-6 flex justify-between items-center">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search coupons"
                            className="w-[30vw] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={filteredCoupons}
                    onRowClick={(coupon) => navigate(`/admin/coupon/${coupon._id}`)}
                    actions={actions}
                />
            </div>
        </main>
    )
}
