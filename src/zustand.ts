import { create } from 'zustand';
import data from './business/dataCreate.ts';

console.log('Z U S T A N D');

export const useUiState = create((set) => ({
  // page: 'lol',
  page: 'menu',
  setPage: (value) => set((state) => ({ page: value })),
}));

const noData = [{ listId: 0, listName: 'noData', order: 0, wordCount: 0, gameCount: 0, words: [] }];
export const zustandData = create((set) => ({
  dataZus: data || noData,
  setDataZus: (value) => set((state) => ({ dataZus: value })),
}));

export const zustandOrderListEdit = create((set) => ({
  orderListEditZus: 0,
  setOrderListEditZus: (value) => set((state) => ({ orderListEditZus: value })),
}));
