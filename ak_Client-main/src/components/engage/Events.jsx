import React from 'react';

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-gray-800">{value}</div>
    {subtitle && <div className="mt-1 text-xs text-gray-500">{subtitle}</div>}
  </div>
);

const CalendarCard = () => {
  const days = Array.from({ length: 35 }).map((_, i) => i + 1);
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <div className="bg-indigo-100 px-3 py-2 rounded text-sm font-semibold mb-4">Event Calendar</div>
      <div className="text-xs text-gray-500 mb-3">You have 04 Events in February</div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500">
        {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
          <div key={d} className="font-semibold py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-3 text-sm text-gray-700">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={`h-8 flex items-center justify-center rounded ${
              d === 7 ? 'bg-indigo-50 font-semibold' : ''
            } ${d > 28 ? 'text-gray-300' : ''}`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const HolidaysCard = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="text-sm text-gray-500">Holidays in February 2022</div>
    <div className="mt-3 text-sm text-gray-700 space-y-3">
      <div className="flex justify-between border-b pb-2">
        <div>10/02/2022</div>
        <div className="text-gray-500">Holi</div>
      </div>
      <div className="flex justify-between border-b pb-2">
        <div>16/02/2022</div>
        <div className="text-gray-500">Chhatrapati Shivaji Maharaj Jayanti</div>
      </div>
    </div>
  </div>
);

const EventsList = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="bg-indigo-600 text-white text-sm px-3 py-2 rounded mb-4">
      Campus Events in February 2022
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {title: 'Alumni Meet & Greet', date: '10 Feb 2022', place: 'Johnson Hall'},
        {title: 'NUC Cricket Playoffs', date: '20 Feb 2022', place: 'Campus Grounds'},
        {title: 'NUC Holi Party', date: '18 Feb 2022', place: 'Campus Grounds'},
      ].map((e,i) => (
        <div key={i} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="w-20 h-16 bg-indigo-100 rounded flex-shrink-0 flex items-center justify-center">
            <span className="text-indigo-600 text-xs font-semibold">Event</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{e.title}</div>
            <div className="text-xs text-gray-500 truncate">{e.date} • {e.place}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="text-sm text-gray-500 mb-3">Quick Actions</div>
    <div className="space-y-2">
      <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-200">
        Create Event
      </button>
      <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-200">
        Manage Calendar
      </button>
      <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-200">
        View All Events
      </button>
    </div>
  </div>
);

const NotificationsCard = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="text-sm text-gray-500">Notifications</div>
    <div className="mt-2 text-sm text-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span>You have 04 upcoming events in February</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span>2 new event registrations</span>
      </div>
    </div>
  </div>
);

export default function EventsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 mr-3"></div>
              <h1 className="text-xl font-semibold text-gray-900">Unicircle Events</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700 hidden sm:block">Kesar Shrivastav</div>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Event Management Dashboard</h2>
          <p className="text-gray-600 mt-2">Manage and track all campus events in one place</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Events" value="67" subtitle="All time events" />
          <StatCard title="Events This Month" value="04" subtitle="February 2022" />
          <StatCard title="Upcoming Events" value="12" subtitle="Next 30 days" />
          <StatCard title="Event Participants" value="1.2K" subtitle="Total registrations" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Calendar & Events */}
          <div className="lg:col-span-2 space-y-6">
            <CalendarCard />
            <EventsList />
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-6">
            <NotificationsCard />
            <QuickActions />
            <HolidaysCard />
            
            {/* Event Illustration */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 mb-3">Event Statistics</div>
              <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-indigo-600 font-semibold">Event Analytics</div>
                  <div className="text-xs text-gray-500 mt-1">Charts and insights</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">84%</div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Satisfaction Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <div className="text-sm text-gray-600">Registration Growth</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            Unicircle Events Dashboard v0.23 • © 2022 Unicircle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}