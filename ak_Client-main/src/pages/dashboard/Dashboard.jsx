// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

// Import components directly
import Homepage from '../../components/dashboard/Homepage'
import Calendar from '../../components/dashboard/Calender'
import Students from '../../components/dashboard/Students'
import Faculty from '../../components/dashboard/Faculty'

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Error Boundary for Dashboard
class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Error</h3>
            <p className="text-gray-600 mb-4">Something went wrong loading this page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main Dashboard Component
const Dashboard = () => {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    upcomingEvents: 0,
    pendingTickets: 0
  })

  // Mock data for dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockStats = {
          totalStudents: 1247,
          totalFaculty: 84,
          upcomingEvents: 12,
          pendingTickets: 23
        }
        setStats(mockStats)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  // Redirect to homepage if root dashboard path
  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/homepage', { replace: true })
    }
  }, [location.pathname, navigate])

  const userData = useMemo(() => {
    if (!user) return null
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      university_name: user.university_name,
      campus_name: user.campus_name,
      mobile: user.mobile,
      campus_id: user.campus_id,
      profile: user.profile
    }
  }, [user])

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingSpinner />
  }

  // If no user, return loading (ProtectedRoute should handle redirect)
  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <DashboardLayout userData={userData}>
      <DashboardErrorBoundary>
        <Routes>
          {/* Dashboard Routes */}
          <Route path="homepage" element={<Homepage stats={stats} userData={userData} />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="students" element={<Students />} />
          <Route path="faculty" element={<Faculty />} />
          
          {/* Default redirect */}
          <Route path="" element={<Homepage stats={stats} userData={userData} />} />
          <Route path="*" element={<Homepage stats={stats} userData={userData} />} />
        </Routes>
      </DashboardErrorBoundary>
    </DashboardLayout>
  )
}

export default Dashboard