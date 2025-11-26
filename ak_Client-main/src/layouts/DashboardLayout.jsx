// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Icons - Using the same icons as before
const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const X = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const Home = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const Calendar = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const Users = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const Bell = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-3.81-2.68 6 6 0 00-1.9 5.22 2.5 2.5 0 01-2.35 2.68A2.5 2.5 0 014.5 16H8a3 3 0 006 0h4.5a2.5 2.5 0 00.33-4.98 2.5 2.5 0 01-2.35-2.68 6 6 0 00-1.9-5.22 5.97 5.97 0 01-3.81 2.68z" />
  </svg>
)

const Event = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const ChartBar = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const UsersGroup = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const Briefcase = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
  </svg>
)

const Help = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Flag = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
)

const ShoppingBag = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const AcademicCap = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
)

const Settings = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const User = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const LogOut = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

const ChevronDown = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Helper function for class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// Menu items structure matching your design exactly
const getNavigationGroups = () => [
  {
    title: 'Dashboard',
    items: [
      { name: 'Home', href: '/dashboard/homepage', icon: Home, index: 1, active: true },
      { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar, index: 2 },
      { name: 'Students', href: '/dashboard/student', icon: Users, index: 3 },
      { name: 'Faculty', href: '/dashboard/faculty', icon: Users, index: 4 },
    ]
  },
  {
    title: 'Engage',
    items: [
      { name: 'Campus News', href: '/dashboard/campusNews', icon: Bell, index: 5, badge: 2 },
      { name: 'Events', href: '/dashboard/event', icon: Event, index: 6 },
      { name: 'Polls', href: '/dashboard/polls', icon: ChartBar, index: 7 },
      { name: 'Campus Groups', href: '/dashboard/community', icon: UsersGroup, index: 8 },
      { name: 'Jobs', href: '/dashboard/jobDetails', icon: Briefcase, index: 9 }
    ]
  },
  {
    title: 'Service Desk',
    items: [
      { name: 'Tickets', href: '/dashboard/Tickets', icon: Flag, index: 10, badge: 1 },
      { name: 'FAQ\'S', href: '/dashboard/faq', icon: Help, index: 11 }
    ]
  },
  {
    title: 'Others',
    items: [
      
      { name: 'Class/Grand', href: '/dashboard/classGrand', icon: AcademicCap, index: 12 }
    ]
  },
]

// Error Boundary for Layout
class LayoutErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Layout Error:', error, errorInfo)
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Layout Error</h3>
            <p className="text-gray-600 mb-4">Something went wrong with the layout. Please try refreshing the page.</p>
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

// Notification Badge Component
const NotificationBadge = ({ count }) => (
  <div className="relative">
    <div className="w-4 h-4 bg-[#6948C5] rounded-full flex items-center justify-center">
      <span className="text-[9px] font-medium text-white leading-none">
        {count}
      </span>
    </div>
  </div>
)

// Checkbox Icon for Menu Items
const CheckboxIcon = ({ isActive }) => (
  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
    isActive 
      ? 'bg-[#4AA081] border-[#4AA081]' 
      : 'border-[rgba(110,119,129,0.4)] bg-transparent'
  }`}>
    {isActive && (
      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )}
  </div>
)

// Mobile sidebar component
const MobileSidebar = React.memo(({ 
  isOpen, 
  onClose, 
  userData, 
  currentPath, 
  onLogout,
  onItemClick 
}) => {
  const navigationGroups = getNavigationGroups()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#293043] shadow-xl transform transition ease-in-out duration-300 translate-x-0">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          {/* Navigation */}
          <nav className="px-8 space-y-6 mt-8">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <div className="text-[11px] font-medium text-[rgba(255,255,255,0.9)] uppercase tracking-wider mb-4 font-['Poppins']">
                  {group.title}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = currentPath === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => {
                            onItemClick(item.index)
                            onClose()
                          }}
                          className={classNames(
                            'group flex items-center px-3 py-2 text-sm rounded-[2px] transition-all duration-200 border border-[rgba(110,119,129,0.4)]',
                            isActive
                              ? 'bg-[#4AA081] text-white'
                              : 'bg-[rgba(31,57,119,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(31,57,119,0.1)]'
                          )}
                          style={{ fontFamily: 'Inter' }}
                        >
                          <CheckboxIcon isActive={isActive} />
                          <span className="ml-3 text-[12px] font-medium flex-1">
                            {item.name}
                          </span>
                          {item.badge && <NotificationBadge count={item.badge} />}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Version and Footer */}
        <div className="flex-shrink-0 border-t border-white border-opacity-20 mx-8 py-6">
          <div className="text-[10px] text-[rgba(255,255,255,0.6)] font-['Inter']">
            Unicircle April 23 Version.
          </div>
        </div>
      </div>
    </div>
  )
})

MobileSidebar.displayName = 'MobileSidebar'

// Desktop sidebar component
const DesktopSidebar = React.memo(({ 
  userData, 
  currentPath, 
  onLogout,
  onItemClick 
}) => {
  const navigationGroups = getNavigationGroups()

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-80 bg-[#293043] h-full">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Logo Area - Removed as per design */}
          
          {/* Navigation */}
          <nav className="px-8 py-8 space-y-8">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <div className="text-[11px] font-medium text-[rgba(255,255,255,0.9)] uppercase tracking-wider mb-4 font-['Poppins']">
                  {group.title}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = currentPath === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => onItemClick(item.index)}
                          className={classNames(
                            'group flex items-center px-3 py-2 rounded-[2px] transition-all duration-200 border border-[rgba(110,119,129,0.4)]',
                            isActive
                              ? 'bg-[#4AA081] text-white shadow-lg'
                              : 'bg-[rgba(31,57,119,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(31,57,119,0.1)] hover:text-[rgba(255,255,255,0.8)]'
                          )}
                          style={{ fontFamily: 'Inter' }}
                        >
                          <CheckboxIcon isActive={isActive} />
                          <span className="ml-3 text-[12px] font-medium flex-1">
                            {item.name}
                          </span>
                          {item.badge && <NotificationBadge count={item.badge} />}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Version and Footer */}
        <div className="flex-shrink-0 border-t border-white border-opacity-20 mx-8 py-6">
          <div className="text-[10px] text-[rgba(255,255,255,0.6)] font-['Inter']">
            Unicircle April 23 Version.
          </div>
        </div>
      </div>
    </div>
  )
})

DesktopSidebar.displayName = 'DesktopSidebar'

// Header component with notifications
const Header = React.memo(({ onMenuClick, userData, onLogout }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: 'New event invitation',
      message: 'You have been invited to Alumni Meet & Greet',
      time: '5 min ago',
      unread: true,
      type: 'event'
    },
    {
      id: 2,
      title: 'Campus News Update',
      message: 'New campus circular has been published',
      time: '1 hour ago',
      unread: true,
      type: 'news'
    },
    {
      id: 3,
      title: 'Poll Results',
      message: 'The campus facility poll results are out',
      time: '2 hours ago',
      unread: false,
      type: 'poll'
    },
    {
      id: 4,
      title: 'Class Schedule Change',
      message: 'Your CS-101 class has been rescheduled to 2 PM',
      time: '3 hours ago',
      unread: false,
      type: 'schedule'
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false)
      }
      if (showNotifications && !event.target.closest('.notifications-container')) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserDropdown, showNotifications])

  const handleMarkAllAsRead = () => {
    // In a real app, you would update the notifications state or make an API call
    setShowNotifications(false)
  }

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none shadow-sm">
      {/* Mobile menu button */}
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Campus Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative notifications-container">
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-scale-in">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-2 ${
                            notification.unread 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-transparent'
                          }`}
                          onClick={() => {
                            setShowNotifications(false)
                            // Handle notification click - navigate to relevant page
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                              notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No notifications</p>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative user-dropdown-container">
            <button
              className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 hover:bg-gray-100 transition-colors"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              aria-expanded={showUserDropdown}
              aria-haspopup="true"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userData?.full_name?.charAt(0) || userData?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="font-medium text-gray-900 text-sm">
                    {userData?.full_name || userData?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{userData?.role || 'User'}</p>
                </div>
              </div>
              <ChevronDown className={classNames(
                "w-4 h-4 text-gray-400 transition-transform",
                showUserDropdown ? "rotate-180" : ""
              )} />
            </button>

            {/* Dropdown menu */}
            {showUserDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-scale-in">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userData?.full_name || userData?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                  </div>
                  
                  <Link
                    to="/dashboard/homepage"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserDropdown(false)}
                    role="menuitem"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Your Profile
                  </Link>
                  
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserDropdown(false)}
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  
                  <div className="border-t border-gray-100"></div>
                  
                  <button
                    onClick={() => {
                      setShowUserDropdown(false)
                      onLogout()
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

Header.displayName = 'Header'

// Helper function to get user data
const getUserData = (authUser) => {
  if (!authUser) return null
  
  return {
    id: authUser.id,
    email: authUser.email,
    full_name: authUser.name || authUser.full_name,
    role: authUser.role,
    university_name: authUser.university_name,
    campus_name: authUser.campus_name,
    mobile: authUser.mobile,
    campus_id: authUser.campus_id,
    profile: authUser.profile
  }
}

// Main DashboardLayout component
const DashboardLayout = ({ children, userRole: propUserRole, userData: propUserData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout, user: authUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const userData = useMemo(() => {
    return propUserData || getUserData(authUser)
  }, [propUserData, authUser])

  const userRole = useMemo(() => {
    return propUserRole || userData?.role || 'student'
  }, [propUserRole, userData])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      navigate('/login', { 
        replace: true,
        state: { 
          message: 'You have been successfully logged out.',
          timestamp: Date.now()
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
      navigate('/login', { replace: true })
    }
  }, [logout, navigate])

  const handleItemClick = useCallback((index) => {
    localStorage.setItem('active_index', JSON.stringify(index))
  }, [])

  return (
    <LayoutErrorBoundary>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        {/* Mobile sidebar */}
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userData={userData}
          currentPath={location.pathname}
          onLogout={handleLogout}
          onItemClick={handleItemClick}
        />

        {/* Desktop sidebar */}
        <DesktopSidebar
          userData={userData}
          currentPath={location.pathname}
          onLogout={handleLogout}
          onItemClick={handleItemClick}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            userData={userData}
            onLogout={handleLogout}
          />

          {/* Main content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50" id="main-content">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                <div className="text-sm text-gray-600">
                  © {new Date().getFullYear()} Campus Portal. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Close sidebar when clicking outside (mobile) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </LayoutErrorBoundary>
  )
}

export default React.memo(DashboardLayout)