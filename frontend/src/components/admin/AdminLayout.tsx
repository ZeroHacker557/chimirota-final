import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Clock, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  User,
  Menu,
  X,
  Fuel as Mosque,
  UserCog
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Boshqaruv paneli', path: '/admin/dashboard' },
    { icon: Clock, label: 'Namoz vaqtlari', path: '/admin/prayer-times' },
    { icon: Calendar, label: 'Tadbirlar', path: '/admin/events' },
    { icon: Settings, label: 'Sozlamalar', path: '/admin/settings' },
    { icon: UserCog, label: 'Profil sozlamalari', path: '/admin/profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActivePath = (path: string) => location.pathname === path;

  // Responsive helpers: keep sidebar and content behavior consistent across breakpoints
  const sidebarBase = 'fixed inset-y-0 left-0 z-50 bg-emerald-900 text-white transition-all duration-300 flex flex-col lg:static lg:translate-x-0';
  const sidebarState = isSidebarOpen
    ? 'w-64 translate-x-0'
    : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0';
  const sidebarClassName = `${sidebarBase} ${sidebarState} overflow-y-auto`;

  // Shift main content on large screens depending on sidebar state and allow vertical scrolling
  const contentClassName = `flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} min-h-screen`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClassName}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-emerald-800">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
              {/* Detailed mosque SVG icon - same as navbar */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="white" aria-hidden>
                {/* Main dome */}
                <path d="M12 3c-2.5 0-4.5 1.5-4.5 3.5v1h9v-1C16.5 4.5 14.5 3 12 3z" />
                {/* Crescent moon on top */}
                <path d="M11.5 1.5c0 0.8 0.4 1.5 1 1.5s1-0.7 1-1.5S12.8 0.5 12 0.5 11.5 0.7 11.5 1.5z" />
                <circle cx="12.5" cy="1.5" r="0.3" fill="none" stroke="white" strokeWidth="0.5" />
                {/* Main building */}
                <rect x="8" y="7.5" width="8" height="8" rx="0.5" />
                {/* Entrance arch */}
                <path d="M10.5 15.5v-3c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5v3" fill="#047857" />
                {/* Left minaret */}
                <rect x="5" y="5" width="1.5" height="10.5" rx="0.2" />
                <circle cx="5.75" cy="4.5" r="0.8" />
                <path d="M5.4 3.8c0 0.4 0.2 0.7 0.35 0.7s0.35-0.3 0.35-0.7" fill="none" stroke="white" strokeWidth="0.3" />
                {/* Right minaret */}
                <rect x="17.5" y="5" width="1.5" height="10.5" rx="0.2" />
                <circle cx="18.25" cy="4.5" r="0.8" />
                <path d="M17.9 3.8c0 0.4 0.2 0.7 0.35 0.7s0.35-0.3 0.35-0.7" fill="none" stroke="white" strokeWidth="0.3" />
                {/* Windows */}
                <circle cx="10" cy="10" r="0.5" fill="#047857" />
                <circle cx="14" cy="10" r="0.5" fill="#047857" />
                {/* Base */}
                <rect x="7" y="15.5" width="10" height="1" rx="0.2" />
              </svg>
            </div>
            {isSidebarOpen && (
              <div>
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <p className="text-emerald-200 text-sm">Masjid boshqaruvi</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  title={item.label}
                  aria-label={item.label}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-emerald-700 text-white shadow-lg'
                      : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-emerald-800">
          <button
            onClick={handleLogout}
            title="Chiqish"
            aria-label="Chiqish"
            className="w-full flex items-center space-x-3 px-4 py-3 text-emerald-100 hover:bg-emerald-800 hover:text-white rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Chiqish</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={contentClassName}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Search Bar - Hidden on mobile */}
              <div className="relative hidden md:block">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 w-64 lg:w-80"
                />
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 lg:space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      navigate('/admin/profile');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Profil sozlamalari
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;