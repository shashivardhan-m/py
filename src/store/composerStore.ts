import { create } from 'zustand';
import type { ComposerState, Platform } from '../types';

interface ComposerStoreState extends ComposerState {
  setContent: (content: string) => void;
  togglePlatform: (platform: Platform) => void;
  addMediaFile: (file: File) => void;
  removeMediaFile: (index: number) => void;
  addMediaUrl: (url: string) => void;
  removeMediaUrl: (index: number) => void;
  setScheduledFor: (date: Date | undefined) => void;
  reset: () => void;
}

const initialState: ComposerState = {
  content: '',
  selectedPlatforms: [],
  mediaFiles: [],
  mediaUrls: [],
  scheduledFor: undefined,
};

export const useComposerStore = create<ComposerStoreState>((set) => ({
  ...initialState,
  setContent: (content) => set({ content }),
  togglePlatform: (platform) =>
    set((state) => ({
      selectedPlatforms: state.selectedPlatforms.includes(platform)
        ? state.selectedPlatforms.filter((p) => p !== platform)
        : [...state.selectedPlatforms, platform],
    })),
  addMediaFile: (file) =>
    set((state) => ({
      mediaFiles: [...state.mediaFiles, file],
    })),
  removeMediaFile: (index) =>
    set((state) => ({
      mediaFiles: state.mediaFiles.filter((_, i) => i !== index),
    })),
  addMediaUrl: (url) =>
    set((state) => ({
      mediaUrls: [...state.mediaUrls, url],
    })),
  removeMediaUrl: (index) =>
    set((state) => ({
      mediaUrls: state.mediaUrls.filter((_, i) => i !== index),
    })),
  setScheduledFor: (date) => set({ scheduledFor: date }),
  reset: () => set(initialState),
}));
