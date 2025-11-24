import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  School, 
  Shield,
  User,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function ModernLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: authLoading, isAuthenticated } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Cookie utilities
  const setCookie = (email, password) => {
    if (!email || !password) return;

    const cookieOptions = 'path=/; max-age=2592000'; // 30 days
    document.cookie = `myusername=${encodeURIComponent(email)}; ${cookieOptions}`;
    document.cookie = `mypassword=${encodeURIComponent(password)}; ${cookieOptions}`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';')[0]);
    return '';
  };

  const clearCookies = () => {
    document.cookie = 'myusername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'mypassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  // Load remembered email from cookies
  useEffect(() => {
    const rememberedEmail = getCookie('myusername');
    if (rememberedEmail) {
      setValue('email', rememberedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleLogin = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Handle remember me functionality
      if (rememberMe) {
        setCookie(data.email, data.password);
      } else {
        clearCookies();
      }

      // ✅ CodeIgniter expects form POST (not JSON) - Using URLSearchParams
      const params = new URLSearchParams();
      params.append("email", data.email);
      params.append("password", data.password);

      const apiUrl = 'https://api.unicircle.io/login';
      
      console.log('Making POST request to:', apiUrl);
      console.log('Params:', Object.fromEntries(params));

      const response = await axios.post(
        apiUrl,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log('API Response:', response.data);

      if (response.data.error_code === 200) {
        const userData = response.data.data[0];
        
        // Prepare user data for auth context (matching API response structure)
        const userDataForContext = {
          user_id: userData.user_id,
          id: userData.user_id, // Both for compatibility
          email: userData.email,
          name: userData.name,
          mobile: userData.mobile,
          role: 'admin', // Default role since API doesn't provide it
          university_name: userData.university_name || '',
          campus_name: userData.campus_name || '',
          campus_id: userData.campus_id || '',
          profile: userData.profile || '',
          jwt_token: userData.jwt_token
        };

        // Update auth context
        const loginResult = await login(true, userDataForContext, userData.jwt_token);
        
        if (loginResult.success) {
          // Show success message
          setSuccessMessage('Login successful! Redirecting...');

          // Navigate to dashboard after delay
          setTimeout(() => {
            // Use the return URL if available, otherwise go to dashboard
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
          }, 1500);
        } else {
          throw new Error(loginResult.error || 'Failed to update authentication context');
        }

      } else if (response.data.error_code === 404 || response.data.error_code === 406) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data?.error_code === 404 || error.response.data?.error_code === 406) {
          setErrorMessage('Invalid email or password. Please try again.');
        } else {
          setErrorMessage(error.response.data?.message || `Error: ${error.response.status}`);
        }
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        setErrorMessage('Network error. Please check your connection and try again.');
      } else if (error.code === 'ECONNABORTED') {
        setErrorMessage('Request timeout. Please try again.');
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const filledEmail = watch('email');
  const filledPassword = watch('password');

  // Show loading if auth context is still loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking authentication status...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section - Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-6">
              <School className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Learn SAP ABAP</h1>
            <p className="text-xl opacity-90 mb-8">Master SAP Development</p>
            
            <div className="w-64 h-48 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-8">
              <User className="w-16 h-16 text-white opacity-80" />
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-left w-full max-w-sm">
              <h3 className="font-semibold text-lg mb-3">Secure Authentication</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Enterprise-grade security
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypted communication
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Role-based access control
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/dist/img/uniLogo.png"
              alt="University Logo"
              className="w-32 h-auto mx-auto mb-4"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your SAP learning dashboard
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
                  disabled={isLoading}
                />
                <span className={`text-sm ${isLoading ? 'text-gray-400' : 'text-gray-700'}`}>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
                }`}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !filledEmail || !filledPassword}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading || !filledEmail || !filledPassword
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:from-blue-800 hover:to-blue-900 hover:shadow-xl active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Secure access to your learning management system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}