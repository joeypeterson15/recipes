import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import Home from "./components/Home";
import { useAuth, AuthProvider } from "./AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
    
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
   
export default AppRouter;