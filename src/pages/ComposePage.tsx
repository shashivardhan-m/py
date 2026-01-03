import React from 'react';
import { PostComposer } from '../components/Composer/PostComposer';

export const ComposePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Compose and share to multiple platforms at once
        </p>
      </div>

      <PostComposer />
    </div>
  );
};
