import React, { useEffect } from 'react'
import AdminLogin from '../admin/AdminLogin'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router'
import AdminDashboard from '../admin/AdminDashboard'
import { AdminProvider, useAdminContext } from '../contexts/AdminContext'
import SideBar from '../admin/SideBar'
import AdminProducts from '../admin/AdminProducts'
import AdminOrders from '../admin/AdminOrders'
import OrderDetails from '../admin/OrderDetail'
import ProductDetails from '../admin/ProductDetail'
import Loader from '../components/Loader'
import FullPageLoader from '../components/ui/FullPageLoader'
import { toast } from 'react-toastify'
import EditProductModal from '../admin/EditProductModal'
import AdminCoupons from '../admin/AdminCoupons'
import { useAuth } from '../contexts/AuthContext'
import EditCouponModal from '../admin/EditCouponModal'
import { useProducts } from '../contexts/ProductContext'
import CouponDetails from '../admin/CouponDetail'
import AllAdmins from '../admin/AllAdmins'
import AdminSignup from '../admin/AdminSignup'

// Constants for path checks
const PUBLIC_PATHS = ['/admin/login', '/admin/signup'];

const AdminPageContent = () => {
    const { page, id } = useParams()
    const currentPath = useLocation().pathname
    const { isLoading, allAdmins } = useAdminContext()
    const { deletingProduct } = useProducts()
    const { admin, setAdmin } = useAuth()
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isLoading) return;
        
        // Check if current path is public (login/signup)
        const isPublicPath = PUBLIC_PATHS.includes(currentPath);
        
        // If not public path and no admin role, redirect to login
        if (!isPublicPath && !admin.role) {
            toast.error('Login as Admin to access this page', { autoClose: 1500 });
            navigate('/admin/login');
            return;
        }

        // If has admin role but not in allAdmins array and not on public path
        if (!isPublicPath && admin.role) {
            const isAuthorizedAdmin = allAdmins.some(adminUser => adminUser._id === admin.id);
            if (!isAuthorizedAdmin) {
                toast.error('You are not authorized to access this page', { autoClose: 1500 });
                navigate('/admin/login');
            }
        }
    }, [admin, allAdmins, currentPath, isLoading, navigate]);

    if (isLoading) {
        return <Loader size="large" fullScreen={true} />
    }

    // Determine which component to render based on route
    const getComponentToRender = () => {
        // Handle special detail routes
        if (currentPath.includes('/admin/order/')) {
            return <OrderDetails orderId={id} />;
        } 
        
        if (currentPath.includes('/admin/product/')) {
            return <ProductDetails productId={id} />;
        } 
        
        if (currentPath.includes('/admin/coupon/')) {
            return <CouponDetails couponId={id} />;
        }

        // Handle main admin routes
        switch (page) {
            case 'login': return <AdminLogin />;
            case 'signup': return <AdminSignup />;
            case 'orders': return <AdminOrders />;
            case 'products': return <AdminProducts />;
            case 'dashboard': return <AdminDashboard />;
            case 'coupons': return <AdminCoupons />;
            case 'admins': return <AllAdmins />;
            case 'logout':
                localStorage.removeItem('admin');
                setAdmin({});
                return <Navigate to="/admin/login" />;
            default:
                return <AdminDashboard />;
        }
    };

    // Check if we're on login/signup page
    const isAuthPage = page === 'login' || page === 'signup';
    const isProductRoute = currentPath.includes('/products') || currentPath.includes('/product/');
    const isCouponRoute = currentPath.includes('/coupons') || currentPath.includes('/coupon/');
    
    const componentToRender = getComponentToRender();

    if (isAuthPage) {
        return componentToRender;
    }

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <SideBar />
                {componentToRender}
            </div>
            
            {isProductRoute && (
                <React.Fragment>
                    <EditProductModal />
                    {deletingProduct && <FullPageLoader />}
                </React.Fragment>
            )}
            
            {isCouponRoute && <EditCouponModal />}
        </>
    );
};

const AdminPage = () => {
    return (
        <AdminProvider>
            <AdminPageContent />
        </AdminProvider>
    )
}

export default AdminPage
