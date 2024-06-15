import { create } from 'zustand';

export const useUiState = create((set) => ({
  // page: 'lol',
  page: 'session',
  setPage: (value) => set((state) => ({ page: value })),
  // rootContainer: 0,
  // setRootContainerge: (value) => set((state) => ({ rootContainer: value })),
}));
