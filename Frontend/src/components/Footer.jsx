import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'; // Importing Facebook and WhatsApp icons
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-orange-500 text-white pt-10 pb-[1.5rem] px-4 md:px-10">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
                {/* Logo and Title */}
                <div className="flex flex-col items-center sm:items-start">
                    <img
                        src="/images/logo.jpg"
                        alt="Yummy Ready Food Logo"
                        className="w-16 h-16 mb-4 rounded"
                    />
                    <h3 className="text-2xl font-bold">Made Fresh Everyday</h3>
                </div>

                {/* Main Menu*/}
                <div className='flex flex-col items-center sm:items-start'>
                    <h4 className="text-lg font-semibold mb-4">MAIN MENU</h4>
                    <ul className="space-y-2 text-sm ">
                        <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
                        <li><NavLink to="/shop" className="hover:underline">Shop</NavLink></li>
                        <li><NavLink to="/aboutus" className="hover:underline">About Us</NavLink></li>
                    </ul>
                </div>

                {/* Contact Us Section */}
                <div className="flex flex-col items-center sm:items-start">
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <div className="space-y-2 text-sm">
                        <p className="flex items-center">
                            <span className="mr-2">🏠</span> Chittagong, Bangladesh
                        </p>
                        <p className="flex items-center">
                            <span className="mr-2">📞</span> 01835-384531
                        </p>
                        <p className="flex items-center">
                            <span className="mr-2">✉️</span>yreadyfood@gmail.com
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="flex mt-4 space-x-4">
                        <a href="https://www.facebook.com/yummyreadyfood/" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-white hover:text-gray-300" size={24} />
                        </a>
                        <a href="https://wa.me/8801835384531" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="text-white hover:text-gray-300" size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <p className="text-xs block text-center mt-8">© 2024 Yummy Ready Food Shop. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
