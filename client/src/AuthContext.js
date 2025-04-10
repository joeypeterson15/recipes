import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
  };

// Authentication provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({'username': false, 'token' : false});
  
    // Login function
    const login = (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };
  
    // Logout function
    const logout = () => {
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };