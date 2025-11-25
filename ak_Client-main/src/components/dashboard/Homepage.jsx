// src/components/dashboard/Homepage.jsx
import React from 'react';

const Homepage = ({ stats, userData }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {userData?.name || 'Admin'}!</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Faculty</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalFaculty}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.upcomingEvents}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Tickets</h3>
          <p className="text-3xl font-bold text-red-600">{stats.pendingTickets}</p>
        </div>
      </div>

      {/* Campus Info */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Campus Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><strong className="text-gray-700">University:</strong> {userData?.university_name || 'N/A'}</p>
            <p><strong className="text-gray-700">Campus:</strong> {userData?.campus_name || 'N/A'}</p>
            <p><strong className="text-gray-700">Campus ID:</strong> {userData?.campus_id || 'N/A'}</p>
          </div>
          <div className="space-y-2">
            <p><strong className="text-gray-700">Email:</strong> {userData?.email || 'N/A'}</p>
            <p><strong className="text-gray-700">Mobile:</strong> {userData?.mobile || 'N/A'}</p>
            <p><strong className="text-gray-700">Role:</strong> {userData?.role || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            Manage Students
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            View Calendar
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            Faculty Management
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;