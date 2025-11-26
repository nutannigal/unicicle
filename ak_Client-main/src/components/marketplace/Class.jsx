import React, { useState } from 'react';

// Row component for a single class/grade in the table
function ClassRow({ cls, onAction }) {
  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="px-6 py-4 text-sm text-gray-800">{cls.academicYear}</td>
      <td className="px-6 py-4 text-sm text-blue-600 font-medium">{cls.classId}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{cls.campus}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{cls.noOfStudents}</td>
      <td className="px-6 py-4 text-right">
        <button 
          onClick={() => onAction(cls.id)} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Actions
        </button>
      </td>
    </tr>
  );
}

// Mobile Class Card for responsive design
function MobileClassCard({ cls, onAction }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-800 text-sm">{cls.academicYear}</div>
          <div className="text-blue-600 font-medium text-sm mt-1">{cls.classId}</div>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {cls.noOfStudents} students
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <div>{cls.campus}</div>
      </div>
      
      <button 
        onClick={() => onAction(cls.id)} 
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
      >
        Manage Class
      </button>
    </div>
  );
}

// Create Class Form Component
function CreateClassForm({ onCancel, onCreateClass }) {
  const [formData, setFormData] = useState({
    academicYear: '',
    classId: '',
    university: 'Harmony University',
    campusName: 'Harmony Institute of Commerce'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.academicYear && formData.classId) {
      onCreateClass(formData);
      setFormData({
        ...formData,
        academicYear: '',
        classId: ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      academicYear: '',
      classId: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Class/Grade</h1>
        <p className="text-gray-600 mt-2">Add a new academic class to the system</p>
      </div>

      {/* University / Campus info card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="text-sm text-gray-700">
          <strong>University:</strong> <span className="font-medium">{formData.university}</span>
        </div>
        <div className="text-sm text-gray-700 mt-1">
          <strong>Campus Name:</strong> <span className="font-medium">{formData.campusName}</span>
        </div>
      </div>

      {/* Note box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Note</h3>
            <div className="text-sm text-blue-700 mt-1">
              We have provided IDs from FYJC (1th Grade) to SYM (Second Year Masters). To add more classes/grades,
              please provide the academic year and an appropriate class ID. This ensures consistency and clarity in our classification system.
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Year *
            </label>
            <input
              type="text"
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              placeholder="Enter academic year (e.g., First Year Bachelors)"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class ID *
            </label>
            <input
              type="text"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              placeholder="Enter class ID (e.g., FYB)"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Create Class
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Main combined component
export default function ClassGradeManagement() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState([
    { id: 1, academicYear: 'First year junior college', classId: 'FYJC', campus: 'Institute of Commerce', noOfStudents: 0 },
    { id: 2, academicYear: 'Second year junior college', classId: 'SYJC', campus: 'Institute of Commerce', noOfStudents: 0 },
    { id: 3, academicYear: 'First Year Bachelors', classId: 'FYB', campus: 'Institute of Commerce', noOfStudents: 208 },
    { id: 4, academicYear: 'Second Year Bachelors', classId: 'SYB', campus: 'Institute of Commerce', noOfStudents: 208 },
    { id: 5, academicYear: 'Third Year Bachelors', classId: 'TYB', campus: 'Institute of Commerce', noOfStudents: 0 },
    { id: 6, academicYear: 'First Year Masters', classId: 'FYM', campus: 'Institute of Commerce', noOfStudents: 0 },
    { id: 7, academicYear: 'Second Year Masters', classId: 'SYM', campus: 'Institute of Commerce', noOfStudents: 0 },
  ]);

  const filteredClasses = classes.filter(cls =>
    cls.academicYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.classId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.campus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClass = (formData) => {
    const newClass = {
      id: classes.length + 1,
      academicYear: formData.academicYear,
      classId: formData.classId,
      campus: formData.campusName,
      noOfStudents: 0
    };
    
    setClasses([...classes, newClass]);
    setCurrentView('list');
    alert(`Class "${formData.classId}" created successfully!`);
  };

  const handleRowAction = (id) => {
    const cls = classes.find(c => c.id === id);
    alert(`Actions for: ${cls.classId}\n\nAvailable actions:\n• Edit Class\n• Manage Students\n• View Details\n• Delete Class`);
  };

  const totalStudents = classes.reduce((sum, cls) => sum + cls.noOfStudents, 0);
  const activeClasses = classes.filter(cls => cls.noOfStudents > 0).length;

  // Render Create Class View
  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <CreateClassForm 
          onCancel={() => setCurrentView('list')}
          onCreateClass={handleCreateClass}
        />
      </div>
    );
  }

  // Render Class List View
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class / Grade Management</h1>
              <p className="text-gray-600 mt-2">Manage academic classes, student enrollment, and class information</p>
            </div>
            <div className="mt-4 lg:mt-0 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">{classes.length}</div>
                <div className="text-xs text-gray-600">Total Classes</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">{activeClasses}</div>
                <div className="text-xs text-gray-600">Active Classes</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">{totalStudents}</div>
                <div className="text-xs text-gray-600">Total Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls: search and Create Class button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                placeholder="Search by class name, ID, or campus..." 
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
            <button 
              onClick={() => setCurrentView('create')}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Class
            </button>
          </div>
        </div>

        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Academic Year</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Class/Grade</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Campus</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">No of Students</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(cls => (
                  <ClassRow key={cls.id} cls={cls} onAction={handleRowAction} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards (shown on mobile) */}
        <div className="md:hidden space-y-4">
          {filteredClasses.map(cls => (
            <MobileClassCard key={cls.id} cls={cls} onAction={handleRowAction} />
          ))}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or create a new class</p>
            <button 
              onClick={() => setCurrentView('create')}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create New Class
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClasses.length}</span> of{' '}
            <span className="font-medium">{filteredClasses.length}</span> results
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
      </div>
    </div>
  );
}