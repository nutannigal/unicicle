// src/AppRoutes.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import Dashboard from '../pages/dashboard/Dashboard'

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
        <Route 
          path="/student/dashboard/*" 
          element={<Navigate to="/dashboard/homepage" replace />} 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard/homepage" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes