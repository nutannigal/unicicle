// src/AppRoutes.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected dashboard routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard/homepage" replace />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard/homepage" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes