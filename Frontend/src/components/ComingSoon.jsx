import React from 'react';
import { FaFacebook, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col justify-center items-center h-screen bg-orange-500 text-white px-4">
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-4 left-4 text-white hover:text-gray-300"
                aria-label="Go back"
            >
                <FaArrowLeft size={24} />
            </button>
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Coming Soon</h1>
                <p className="text-lg block">
                    Our website is under construction. we are adding new features to buy food items through our website.
                </p>
                <p className="text-lg mb-8">
                    Stay tuned for something amazing!
                </p>
                <div className="animate-bounce">
                    <img
                        src="/images/logo.jpg"
                        alt="Yummy Ready Food Logo"
                        className="w-32 h-32 mx-auto"
                    />
                </div>
            </div>
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Launching Soon...</h2>
                <p>Follow us on social media for updates:</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a
                        href="https://www.facebook.com/yummyreadyfood/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <FaFacebook size={24} />
                    </a>
                    <a
                        href="https://wa.me/8801835384531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300"
                    >
                        <FaWhatsapp size={24} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
