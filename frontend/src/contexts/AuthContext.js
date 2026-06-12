import React, { createContext, useState, useEffect } from 'react';
import * as api from '../api/tripApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username, password) => {
    const data = await api.login(username, password);
    localStorage.setItem('token', data.access);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.access);
    setUser(data.user);
    return data.user;
  };

  const register = async (username, email, password) => {
    const data = await api.register(username, email, password);
    localStorage.setItem('token', data.access);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.access);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
