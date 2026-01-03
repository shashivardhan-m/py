import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiEdit,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiX,
} from 'react-icons/fi';
import { useUIStore } from '../../store/uiStore';
import clsx from 'clsx';

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Dashboard', end: true },
  { to: '/dashboard/compose', icon: FiEdit, label: 'Compose' },
  { to: '/dashboard/accounts', icon: FiUsers, label: 'Accounts' },
  { to: '/dashboard/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/dashboard/settings', icon: FiSettings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Menu
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200',
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
