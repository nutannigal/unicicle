// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_BASE_URL = "https://api.unicircle.io/";

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage('error', "Please enter email and password");
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);

      const response = await axios.post(
        `${API_BASE_URL}login`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
console.log(response);

      if (response.data.error_code === 200) {
        const userData = response.data.data[0];
        
        // Use AuthContext login instead of direct localStorage
        const loginResult = await login(true, userData, userData.jwt_token);
        
        if (loginResult.success) {
          showMessage('success', "Login successful! Redirecting...");
          setTimeout(() => {
            navigate("/dashboard/homepage");
          }, 1000);
        } else {
          showMessage('error', loginResult.error || "Login failed");
        }
      } else if (response.data.error_code === 404 || response.data.error_code === 406) {
        showMessage('error', "Invalid email or password");
      } else {
        showMessage('error', response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      showMessage('error', "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="w-full h-screen bg-white flex">
      {/* Message Display */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg ${
          message.type === 'error' 
            ? 'bg-red-50 border border-red-200 text-red-800' 
            : 'bg-green-50 border border-green-200 text-green-800'
        }`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {message.type === 'error' ? (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
            <button
              onClick={() => setMessage({ type: '', text: '' })}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Single Container with 40% Login and 60% Image */}
      <div className="flex w-full h-full">
        
        {/* Left Section - Login Form (40%) */}
        <div className="w-[40%] h-full bg-[#F9F9F9] flex items-center justify-center">
          <div className="w-full max-w-[400px] px-8">
            {/* Logo */}
            <div className="mb-12">
              <img
                src="/src/assets/img/uniLogo.png"
                alt="UniCircle Logo"
                className="h-[38px]"
              />
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[20px] font-semibold text-black font-inter mb-1">
                Sign in
              </h1>
              <p className="text-[15px] font-medium text-[#262D33] font-inter leading-[18px]">
                We make it easy for you to stay connected with students anytime & anywhere.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
              <div className="w-full h-[5px] bg-[#BEF5C3] rounded-[10px]">
                <div className="w-[29px] h-[5px] bg-[#00BA13] rounded-[10px] ml-auto"></div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="admin email/phone number"
                  className="w-full h-[50px] bg-[#F9F9F9] border border-[#4779F0] rounded-[5px] pl-10 pr-4 text-[14px] font-medium text-[#6E7781] font-inter focus:outline-none focus:ring-1 focus:ring-[#4779F0]"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="password"
                  className="w-full h-[50px] bg-[#F9F9F9] border border-[#4779F0] rounded-[5px] pl-10 pr-12 text-[14px] font-medium text-[#6E7781] font-inter focus:outline-none focus:ring-1 focus:ring-[#4779F0]"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-[25px] h-[25px] bg-[#F9F9F9] border-[1.5px] border-[#4779F0] rounded-[3px] focus:ring-0 focus:ring-offset-0"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-[12px] font-medium text-black font-inter leading-[15px]"
                  >
                    remember me
                  </label>
                </div>
                <a
                  href="/forgotpassword"
                  className="text-[12px] font-medium text-black font-inter leading-[15px] hover:text-blue-600 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full h-[50px] bg-[#1F3977] border-2 border-[#1F3977] rounded-[5px] text-white text-[14px] font-semibold font-inter leading-[17px] hover:bg-[#152a5f] focus:outline-none focus:ring-2 focus:ring-[#1F3977] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Background Image (60%) */}
        <div className="w-[60%] h-full bg-[#F9F9F9] flex items-center justify-center p-8">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/src/assets/img/admin_login_img.png"
              alt="University Campus"
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}