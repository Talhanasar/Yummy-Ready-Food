import React from 'react';
import { NavLink } from "react-router";
import { ArrowLeft, Truck, Calendar, Phone, MapPin, Package, DollarSign } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAdminContext } from '../contexts/AdminContext';
import StatusBadge from '../components/ui/StatusBadge';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Import marker icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

export default function OrderDetails({ orderId }) {
    const { allOrders, updateOrderStatus } = useAdminContext();
    const order = allOrders.find(order => order._id === orderId);

    if (!order) {
        return (
            <div className="flex-1 p-8 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
                    <NavLink to="/admin/orders" className="text-orange-600 hover:text-orange-700">
                        ← Back to Orders
                    </NavLink>
                </div>
            </div>
        );
    }

    const handleStatusUpdate = () => {
        updateOrderStatus(orderId, 'completed');
    };

    const [lat, lng] = order.location.split(',').map(Number);

    return (
        <div className="flex-1 p-8 bg-gray-100 overflow-y-auto" data-lenis-prevent>
            <div className="max-w-4xl mx-auto">
                <NavLink to="/admin/orders" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Orders
                </NavLink>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Order #{order.phoneNumber}</h1>
                        <StatusBadge status={order.status} />
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Ordered on: {new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <Truck className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Customer: {order.customerName}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Phone: {order.phoneNumber}</span>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Address: {order.area}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Package className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-600">Total Items</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{order.products.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-600">Sub Total</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{order.subTotal}৳</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-600">Total Amount</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{order.totalPrice}৳</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Location</h2>
                        <div style={{ height: '300px', width: '100%' }}>
                            {lat && lng && (
                                <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[lat, lng]}></Marker>
                                </MapContainer>
                            )}
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.products.map((item) => (
                                <div key={item._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.productId.imagePath} alt={item.productId.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800">{item.productId.name}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{item.productId.price}৳</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {order.status === 'pending' && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <Button
                                className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
                                onClick={handleStatusUpdate}
                            >
                                Mark as Completed
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}