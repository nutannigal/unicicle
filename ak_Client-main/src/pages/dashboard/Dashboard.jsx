// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

// Dashboard Pages Components - Using lazy loading with fallbacks
const Home = lazy(() => import('../../components/dashboard/Home'))
const Calendar = lazy(() => import('../../components/dashboard/Calender'))
const Students = lazy(() => import('../../components/dashboard/Students'))
const Faculty = lazy(() => import('../../components/dashboard/Faculty'))
const CampusNews = lazy(() => import('../../components/engage/CampusNews'))
const Events = lazy(() => import('../../components/engage/Events'))
const Polls = lazy(() => import('../../components/engage/Polls'))
const CampusGroups = lazy(() => import('../../components/engage/CampusGroups'))
const Jobs = lazy(() => import('../../components/engage/Jobs'))
const Tickets = lazy(() => import('../../components/servicedesk/Tickets'))
const FAQ = lazy(() => import('../../components/servicedesk/FAQS'))
const CampusShop = lazy(() => import('../../components/marketplace/CampusShop'))

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
  const { user, isLoading } = useAuth() // Add isLoading
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
        // Simulate API call delay
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
      navigate('homepage', { replace: true })
    }
  }, [location.pathname, navigate])

  const userData = useMemo(() => {
    if (!user) return null
    
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // This should not happen due to ProtectedRoute, but added for safety
  if (!user) {
    return null // ProtectedRoute will handle redirect
  }

  return (
    <DashboardLayout userData={userData}>
      <DashboardErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Dashboard Routes - Use relative paths without /dashboard prefix */}
            <Route path="homepage" element={<Home stats={stats} userData={userData} />} />
            <Route path="calender" element={<Calendar />} />
            <Route path="student" element={<Students />} />
            <Route path="facultity" element={<Faculty />} />
            
            {/* Engage Routes */}
            <Route path="campusNews" element={<CampusNews />} />
            <Route path="event" element={<Events />} />
            <Route path="polls" element={<Polls />} />
            <Route path="community" element={<CampusGroups />} />
            <Route path="jobDetails" element={<Jobs />} />
            
            {/* Service Desk Routes */}
            <Route path="Tickets" element={<Tickets />} />
            <Route path="faq" element={<FAQ />} />
            
            {/* Marketplace Routes */}
            <Route path="marketplaceDetails" element={<CampusShop />} />
            
            {/* Default redirect - empty path redirects to homepage */}
            <Route path="" element={<Home stats={stats} userData={userData} />} />
            <Route path="*" element={<Home stats={stats} userData={userData} />} />
          </Routes>
        </Suspense>
      </DashboardErrorBoundary>
    </DashboardLayout>
  )
}

export default Dashboard