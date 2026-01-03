import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiImage, FiCalendar, FiSend, FiX } from 'react-icons/fi';
import { apiClient } from '../../services/api';
import { useComposerStore } from '../../store/composerStore';
import { Button, Card } from '../Common';
import { Platform } from '../../types';
import { getPlatformColor } from '../../utils/helpers';

export const PostComposer: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    content,
    selectedPlatforms,
    mediaUrls,
    scheduledFor,
    setContent,
    togglePlatform,
    addMediaFile,
    addMediaUrl,
    removeMediaUrl,
    setScheduledFor,
    reset,
  } = useComposerStore();

  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => apiClient.getConnectedAccounts(),
  });

  const uploadMediaMutation = useMutation({
    mutationFn: (file: File) => apiClient.uploadMedia(file),
    onSuccess: (data) => {
      addMediaUrl(data.url);
    },
  });

  const createPostMutation = useMutation({
    mutationFn: () =>
      apiClient.createPost({
        content,
        selectedPlatforms,
        mediaUrls,
        scheduledFor: scheduledFor?.toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      reset();
      setScheduleDate('');
      setScheduleTime('');
    },
  });

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      addMediaFile(file);
      uploadMediaMutation.mutate(file);
    }
  };

  const handleSchedule = () => {
    if (scheduleDate && scheduleTime) {
      const datetime = new Date(`${scheduleDate}T${scheduleTime}`);
      setScheduledFor(datetime);
      setShowScheduler(false);
    }
  };

  const handlePost = () => {
    if (content.trim() && selectedPlatforms.length > 0) {
      createPostMutation.mutate();
    }
  };

  const connectedPlatforms = accounts?.filter((acc) => acc.isActive) || [];
  const availablePlatforms = Object.values(Platform).filter((platform) =>
    connectedPlatforms.some((acc) => acc.platform === platform)
  );

  return (
    <Card>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full min-h-[120px] p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-gray-900 dark:text-gray-100"
      />

      {(mediaUrls.length > 0 || uploadMediaMutation.isPending) && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {mediaUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeMediaUrl(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
          {uploadMediaMutation.isPending && (
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary-600 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
      )}

      {scheduledFor && (
        <div className="mt-3 flex items-center justify-between bg-primary-50 dark:bg-primary-900 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-primary-600" />
            <span className="text-sm text-primary-600 dark:text-primary-400">
              Scheduled for {scheduledFor.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => setScheduledFor(undefined)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      {showScheduler && (
        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Schedule Post
          </h4>
          <div className="flex space-x-2">
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="input-field flex-1"
            />
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="input-field flex-1"
            />
            <Button onClick={handleSchedule} size="sm">
              Set
            </Button>
            <Button
              onClick={() => setShowScheduler(false)}
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Post to:
        </h4>
        {availablePlatforms.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No accounts connected. Please connect your social media accounts first.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availablePlatforms.map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPlatforms.includes(platform)
                    ? `${getPlatformColor(platform)} text-white`
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <label className="cursor-pointer p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiImage size={20} />
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowScheduler(!showScheduler)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiCalendar size={20} />
          </button>
        </div>

        <Button
          onClick={handlePost}
          disabled={
            !content.trim() ||
            selectedPlatforms.length === 0 ||
            createPostMutation.isPending
          }
          loading={createPostMutation.isPending}
        >
          <FiSend className="mr-2" size={18} />
          {scheduledFor ? 'Schedule Post' : 'Post Now'}
        </Button>
      </div>
    </Card>
  );
};
