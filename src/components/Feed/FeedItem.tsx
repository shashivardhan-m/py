import React from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiExternalLink } from 'react-icons/fi';
import { Card } from '../Common';
import { formatRelativeTime, formatNumber, getPlatformColor } from '../../utils/helpers';
import type { FeedItem as FeedItemType } from '../../types';

interface FeedItemProps {
  item: FeedItemType;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        {item.authorAvatar && (
          <img
            src={item.authorAvatar}
            alt={item.authorName}
            className="h-10 w-10 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.authorName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{item.authorUsername}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 text-xs font-medium text-white rounded ${getPlatformColor(
                  item.platform
                )}`}
              >
                {item.platform}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiExternalLink size={16} />
              </a>
            </div>
          </div>

          <p className="mt-3 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {item.content}
          </p>

          {item.mediaUrls && item.mediaUrls.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {item.mediaUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="rounded-lg w-full h-48 object-cover"
                />
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center space-x-6 text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <FiHeart size={18} />
              <span className="text-sm">{formatNumber(item.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiMessageCircle size={18} />
              <span className="text-sm">{formatNumber(item.comments)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiShare2 size={18} />
              <span className="text-sm">{formatNumber(item.shares)}</span>
            </div>
            <span className="text-sm ml-auto">
              {formatRelativeTime(item.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
