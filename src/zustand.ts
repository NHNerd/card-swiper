import { create } from 'zustand';

export const useUiState = create((set) => ({
  page: 'lol',
  setPage: (value) => set((state) => ({ page: value })),
}));
