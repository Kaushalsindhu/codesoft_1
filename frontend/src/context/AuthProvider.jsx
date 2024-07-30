import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext.js';
import axios from 'axios';
import { useFlashMessage } from './FlashMessageContext.js';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { showFlashMessage } = useFlashMessage();

  useEffect(() => {
    const currUser = localStorage.getItem('currUser');
    if (currUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(currUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('currUser', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData)
  }; 

  const logout = async () => {
      localStorage.removeItem('currUser');
      setIsAuthenticated(false);
      setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 