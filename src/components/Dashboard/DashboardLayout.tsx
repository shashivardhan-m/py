import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Navigation/Header';
import { Sidebar } from '../Navigation/Sidebar';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
