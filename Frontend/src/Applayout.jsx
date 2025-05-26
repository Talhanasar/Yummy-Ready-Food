import { Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { useCart } from "./contexts/CartContext";
import { useProducts } from "./contexts/ProductContext";
import Loader from "./components/Loader";

const Applayout = () => {
    const currentPath = useLocation().pathname;
    const { isCartOpen } = useCart();
    const { loading } = useProducts();
    const lenis = useLenis(); // Retrieve the lenis instance
    const checkOutPage = currentPath === '/checkout' || currentPath === '/order-confirmation';
    const isAdminPage = currentPath.includes('/admin');

    useEffect(() => {
        // Check if lenis is defined before calling start or stop
        if (lenis) {
            if (isCartOpen) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }
    }, [isCartOpen, lenis]); // Include lenis in the dependency array

    if (loading) {
        return <Loader fullScreen={true} size="large" />;
    }

    return (
        <>
            <ScrollToTop />
            {!checkOutPage && !isAdminPage && <Header />}
            <Outlet />
            {!checkOutPage && !isAdminPage && <Footer />}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
                className="toast-message"
            />
        </>
    );
};

export default Applayout;