import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../services/api';
import { FeedItem } from './FeedItem';
import { LoadingSpinner } from '../Common';

export const FeedList: React.FC = () => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getFeed({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">
          Failed to load feed. Please try again.
        </p>
      </div>
    );
  }

  const feedItems = data?.pages.flatMap((page) => page.data) || [];

  if (feedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No posts yet. Connect your accounts to see your feed!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedItems.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}

      <div ref={observerTarget} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>

      {!hasNextPage && feedItems.length > 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          You've reached the end
        </p>
      )}
    </div>
  );
};
