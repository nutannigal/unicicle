// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('Token');
        const storedUser = {
          id: localStorage.getItem('User_id') || localStorage.getItem('user_id'),
          email: localStorage.getItem('User_email') || localStorage.getItem('email'),
          name: localStorage.getItem('User_name') || localStorage.getItem('name'),
          mobile: localStorage.getItem('User_mobile') || localStorage.getItem('mobile'),
          role: localStorage.getItem('User_role') || 'admin',
          university_name: localStorage.getItem('Uni_name') || localStorage.getItem('university_name'),
          campus_name: localStorage.getItem('Camp_name') || localStorage.getItem('campus_name'),
          campus_id: localStorage.getItem('Campus_id') || localStorage.getItem('campus_id'),
          profile: localStorage.getItem('User_profile') || localStorage.getItem('profile'),
        };

        if (storedToken && (storedUser.id || storedUser.email)) {
          setToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Clear all auth data
  const clearAuthData = () => {
    // Clear localStorage
    localStorage.removeItem('Token');
    localStorage.removeItem('User_id');
    localStorage.removeItem('User_email');
    localStorage.removeItem('User_name');
    localStorage.removeItem('User_mobile');
    localStorage.removeItem('User_role');
    localStorage.removeItem('Uni_name');
    localStorage.removeItem('Camp_name');
    localStorage.removeItem('Campus_id');
    localStorage.removeItem('User_profile');
    
    // Clear state
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Login function - updated to match your API response
  const login = async (isAuthenticated, userData, authToken) => {
    try {
      setError(null);

      if (!isAuthenticated || !userData || !authToken) {
        throw new Error('Invalid login data');
      }

      // Store in localStorage (matching your login component)
      localStorage.setItem('Token', authToken);
      localStorage.setItem('User_id', userData.user_id || userData.id || '');
      localStorage.setItem('User_email', userData.email || '');
      localStorage.setItem('User_name', userData.name || '');
      localStorage.setItem('User_mobile', userData.mobile || '');
      localStorage.setItem('User_role', 'admin');
      localStorage.setItem('Uni_name', userData.university_name || '');
      localStorage.setItem('Camp_name', userData.campus_name || '');
      localStorage.setItem('Campus_id', userData.campus_id || '');
      localStorage.setItem('User_profile', userData.profile || '');

      // Create user object for context state
      const contextUser = {
        id: userData.user_id || userData.id,
        email: userData.email,
        name: userData.name,
        mobile: userData.mobile,
        role: 'admin',
        university_name: userData.university_name,
        campus_name: userData.campus_name,
        campus_id: userData.campus_id,
        profile: userData.profile,
        jwt_token: authToken
      };

      // Update state
      setUser(contextUser);
      setToken(authToken);
      setIsAuthenticated(true);

      return { success: true, user: contextUser };
    } catch (error) {
      console.error('Login error in context:', error);
      setError(error.message);
      clearAuthData();
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API if available
      if (token) {
        await axios.post('https://api.unicircle.io/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).catch(error => {
          console.warn('Logout API call failed, continuing with local logout:', error);
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
      window.location.href = '/login';
    }
  };

  // Update user profile
  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));

    // Update localStorage as well
    Object.keys(updatedUserData).forEach(key => {
      const value = updatedUserData[key];
      if (value !== undefined && value !== null) {
        const storageKey = getStorageKey(key);
        localStorage.setItem(storageKey, value.toString());
      }
    });
  };

  // Helper function to map context keys to localStorage keys
  const getStorageKey = (key) => {
    const keyMap = {
      'id': 'User_id',
      'email': 'User_email',
      'name': 'User_name',
      'mobile': 'User_mobile',
      'role': 'User_role',
      'university_name': 'Uni_name',
      'campus_name': 'Camp_name',
      'campus_id': 'Campus_id',
      'profile': 'User_profile'
    };
    
    return keyMap[key] || `User_${key}`;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Get user permissions based on role
  const getPermissions = () => {
    const role = user?.role;
    
    const permissions = {
      admin: ['read', 'write', 'delete', 'manage_users', 'manage_content', 'dashboard_access'],
      student: ['read', 'enroll', 'course_access'],
      instructor: ['read', 'write', 'manage_courses', 'student_management'],
      guest: ['read']
    };

    return permissions[role] || permissions.guest;
  };

  // Refresh token (if needed)
  const refreshToken = async () => {
    try {
      const response = await axios.post('https://api.unicircle.io/refresh-token', {
        token: token
      });
      
      if (response.data.error_code === 200) {
        const newToken = response.data.data[0].jwt_token;
        localStorage.setItem('Token', newToken);
        setToken(newToken);
        return newToken;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  };

  // Check if token is about to expire
  const isTokenExpiringSoon = () => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      const bufferTime = 5 * 60 * 1000;
      
      return (exp - now) < bufferTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };

  // Value to be provided by context
  const value = {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Actions
    login,
    logout,
    updateUser,
    refreshToken,
    
    // Utilities
    hasRole,
    hasAnyRole,
    getPermissions,
    isTokenExpiringSoon,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;