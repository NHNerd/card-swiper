import { create } from 'zustand';

const email = localStorage.getItem('card-swiper:email');
const userId = localStorage.getItem('card-swiper:userId');

export const useUiState = create((set) => ({
  page: email || userId ? 'menu' : 'auth',
  setPage: (value: string) => set((state) => ({ page: value })),
}));

export const zustandData = create((set) => ({
  dataZus: null,
  setDataZus: (value: any) => set((state) => ({ dataZus: value })),
}));

export const zustandOrderListEdit = create((set) => ({
  orderListEditZus: 0,
  setOrderListEditZus: (value: number) => set((state) => ({ orderListEditZus: value })),
}));

console.log('Z U S T A N D');
