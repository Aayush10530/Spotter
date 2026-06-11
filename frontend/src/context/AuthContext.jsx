import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchProfile(token);
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchProfile = async (accessToken) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/profile/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access);
                setToken(data.access);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
