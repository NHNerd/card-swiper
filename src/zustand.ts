import { create } from 'zustand';
import { noData, phrasalVerbs, phrasalVerbsWords } from '../src/hardCodeDateObj/hardCodeDateObj.js';

const email = localStorage.getItem('email');
const userId = localStorage.getItem('userId');

export const useUiState = create((set) => ({
  page: email || userId ? 'menu' : 'auth',
  setPage: (value: string) => set((state) => ({ page: value })),
}));

export const zustandData = create((set) => ({
  dataZus: noData, // Изначально данные отсутствуют
  setDataZus: (value: any) => set({ dataZus: value }), // Функция для установки данных
}));

export const zustandOrderListEdit = create((set) => ({
  orderListEditZus: 0,
  setOrderListEditZus: (value: number) => set((state) => ({ orderListEditZus: value })),
}));

console.log('Z U S T A N D');
