import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './Login';
import { useAuth, AuthProvider } from './AuthContext'

// Protected route component
const ProtectedRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the child routes
  return <Outlet />;
};

// App component that requires authentication
const App = () => {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome to the App, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Router setup
const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes
          <Route path="/login" element={<Login />} />
           */}
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<App />} />
            <Route path="/dashboard" element={<App />} />
            {/* Add more protected routes as needed */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
