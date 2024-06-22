import { create } from 'zustand';
import { data, ListsTS, ListTS } from '../public/temp/data.ts';

const dataFromBack = Object.entries(data.lists);
const dataZus: any = [];
console.log('Z U S T A N D');
//sort
for (let i = 0; i < dataFromBack.length; i++) {
  dataZus.push(dataFromBack[i]);
}

// console.log(dataNew);
export const useUiState = create((set) => ({
  // page: 'lol',
  page: 'menu',
  setPage: (value) => set((state) => ({ page: value })),
}));

export const zustandData = create((set) => ({
  dataZus: dataZus,
  setDataZus: (value) => set((state) => ({ dataZus: value })),
}));
