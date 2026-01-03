import React from 'react';
import { Card, Input, Button } from '../components/Common';
import { useAuthStore } from '../store/authStore';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Profile Information
        </h2>
        <div className="space-y-4">
          <Input
            label="Full Name"
            defaultValue={user?.fullName}
            placeholder="Your full name"
          />
          <Input
            label="Username"
            defaultValue={user?.username}
            placeholder="Your username"
          />
          <Input
            label="Email"
            type="email"
            defaultValue={user?.email}
            placeholder="Your email"
          />
          <Button>Save Changes</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Change Password
        </h2>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
          <Button>Update Password</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Notification Preferences
        </h2>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              defaultChecked
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Email notifications for new posts
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              defaultChecked
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Email notifications for engagement
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Weekly analytics summary
            </span>
          </label>
        </div>
      </Card>
    </div>
  );
};
