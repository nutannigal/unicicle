// CampusNews.jsx
// React + Tailwind CSS component for the "Campus News" admin list view.
// Standalone version without sidebar - fully responsive

import React, { useState } from 'react';

// Badge component to show category names like 'Announcement', 'Circular', 'Notice'
function Badge({ children, color = 'blue' }) {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100',
    green: 'text-green-600 bg-green-100',
  };
  return (
    <span className={`px-2 py-1 text-xs rounded ${colorMap[color] || colorMap.blue}`}>
      {children}
    </span>
  );
}

// Row component: represents one news item row in the table
function NewsRow({ item }) {
  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="px-4 py-4 align-top">
        <div className="font-medium text-gray-800">{item.title}</div>
        {/* If there are attachments, show small chips */}
        {item.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.attachments.map((a, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded border text-gray-600">
                {a}
              </span>
            ))}
          </div>
        )}
      </td>

      <td className="px-4 py-4 align-top">
        <Badge color={item.categoryColor}>{item.category}</Badge>
      </td>

      <td className="px-4 py-4 text-gray-600 align-top hidden md:table-cell">
        {item.recipients}
      </td>

      <td className="px-4 py-4 text-gray-600 align-top hidden lg:table-cell">
        {item.publishDate}
      </td>

      <td className="px-4 py-4 text-right align-top">
        <div className="flex justify-end space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

// Mobile News Card for responsive design
function MobileNewsCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="font-medium text-gray-800 flex-1">{item.title}</div>
        <Badge color={item.categoryColor}>{item.category}</Badge>
      </div>
      
      {item.attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {item.attachments.map((a, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded border text-gray-600">
              {a}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          <div className="mb-1">To: {item.recipients}</div>
          <div>Published: {item.publishDate}</div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function CampusNews() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for the list. In real app, fetch this from server (API).
  const newsList = [
    {
      id: 1,
      title: 'Campus Canteen Update',
      attachments: ['image.png', 'image.png', 'image.png'],
      category: 'Announcement',
      categoryColor: 'blue',
      recipients: 'All Students',
      publishDate: '11 April 2024',
    },
    {
      id: 2,
      title: 'Post-Facto Approval',
      attachments: ['Post-facto.pdf'],
      category: 'Circular',
      categoryColor: 'yellow',
      recipients: 'All Students',
      publishDate: '26 March 2024',
    },
    {
      id: 3,
      title: 'Minimum Attendance',
      attachments: [],
      category: 'Notice',
      categoryColor: 'red',
      recipients: 'Persona',
      publishDate: '25 March 2024',
    },
    {
      id: 4,
      title: 'Library Timings Extended',
      attachments: ['schedule.pdf'],
      category: 'Announcement',
      categoryColor: 'blue',
      recipients: 'All Students & Faculty',
      publishDate: '20 March 2024',
    },
    {
      id: 5,
      title: 'Semester Results Declaration',
      attachments: ['result_guidelines.pdf', 'faq.docx'],
      category: 'Circular',
      categoryColor: 'yellow',
      recipients: 'All Students',
      publishDate: '15 March 2024',
    },
  ];

  const filteredNews = newsList.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
              <p className="text-gray-600 mt-2">Manage and publish campus announcements, circulars, and notices</p>
            </div>
            <div className="mt-4 lg:mt-0 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">{newsList.length}</div>
                <div className="text-xs text-gray-600">Total News</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {newsList.filter(item => item.category === 'Circular').length}
                </div>
                <div className="text-xs text-gray-600">Circulars</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-red-600">
                  {newsList.filter(item => item.category === 'Notice').length}
                </div>
                <div className="text-xs text-gray-600">Notices</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-xs text-gray-600">Read Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls row: search + Create News button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create News
            </button>
          </div>
        </div>

        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Recipients</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Publish Date</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map(item => (
                  <NewsRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards (shown on mobile) */}
        <div className="md:hidden space-y-4">
          {filteredNews.map(item => (
            <MobileNewsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No news found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredNews.length}</span> of{' '}
            <span className="font-medium">{filteredNews.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}