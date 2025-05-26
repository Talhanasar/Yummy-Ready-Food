import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const AdminContext = createContext()

export const AdminProvider = ({children}) => {
    const [allOrders, setAllOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [allAdmins, setAllAdmins] = useState([])

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                setIsLoading(true)
                const [ordersResponse, adminResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/order`),
                    axios.get(`${import.meta.env.VITE_API_URL}/admin`)
                ]);
                
                setAllOrders(ordersResponse.data);
                setAllAdmins(adminResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data', {autoClose:1500});
            } finally {
                setIsLoading(false)
            }
        };
        fetchAllOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        try {
            setAllOrders(prevOrders => prevOrders.map(order => 
                order._id === orderId ? { ...order, status } : order
            ));
            await axios.put(`${import.meta.env.VITE_API_URL}/order/${orderId}`, { status });
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status', {autoClose:1500});
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/order/${orderId}`);
            setAllOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            toast.success('Order cancelled successfully', {autoClose:1500});
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast.error('Failed to cancel order', {autoClose:1500});
        }
    };

    const loginAdmin = ({setAdmin, admin}) => {
        setAdmin(admin);
        localStorage.setItem('admin', JSON.stringify(admin));
    }

    const approveAdmin = async (adminId) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/admin/${adminId}`, { isApproved: true });
            setAllAdmins(prevAdmins => prevAdmins.map(admin => 
                admin._id === adminId ? { ...admin, isApproved: true } : admin
            ));
            toast.success('Admin approved successfully', {autoClose:1500});
        } catch (error) {
            console.error('Error approving admin:', error);
            toast.error('Failed to approve admin', {autoClose:1500});
        }
    }

    const deleteAdmin = async (adminId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/admin/${adminId}`);
            setAllAdmins(prevAdmins => prevAdmins.filter(admin => admin._id !== adminId));
            toast.success('Admin deleted successfully', {autoClose:1500});
        } catch (error) {
            console.error('Error deleting admin:', error);
            toast.error('Failed to delete admin', {autoClose:1500});
        }
    }

    return (
        <AdminContext.Provider 
            value={{
                allOrders, 
                updateOrderStatus, 
                cancelOrder, 
                isLoading, 
                loginAdmin, 
                allAdmins,
                approveAdmin,
                deleteAdmin
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => {
    const context = useContext(AdminContext)
    if (!context) {
        throw new Error('useAdminContext must be used within an AdminProvider')
    }
    return context
}