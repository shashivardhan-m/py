import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { apiClient } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode, toggleSidebar } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <FiMenu size={24} />
            </button>
            <Link to="/dashboard" className="ml-2 lg:ml-0">
              <h1 className="text-xl font-bold text-primary-600">SocialHub</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <Link
              to="/dashboard/notifications"
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <FiBell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiUser className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiSettings className="mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
