import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(() => {
        const storedAdmin = localStorage.getItem('admin');
        
        // Check if storedAdmin is a valid JSON string
        if (storedAdmin) {
            try {
                return JSON.parse(storedAdmin);
            } catch (error) {
                console.error('Failed to parse admin from localStorage:', error);
                // If parsing fails, return an empty object or handle it as needed
                return {};
            }
        }
        return {}; // Return an empty object if no admin is found
    });

    return (
        <AuthContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
