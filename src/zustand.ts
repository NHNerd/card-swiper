import { create } from 'zustand';
import { data, ListsTS, ListTS } from '../public/temp/data.ts';

const dataFromBack = Object.entries(data.lists);
const dataZus: any = [];
// console.log(dataNew.length);
//sort
for (let i = 0; i < dataFromBack.length; i++) {
  // console.log(dataFromBack[i][1].order);

  // dataZus.push(dataFromBack[dataFromBack.length - 1 - i]);
  dataZus.push(dataFromBack[i]);
}

// console.log(dataNew);
export const useUiState = create((set) => ({
  // page: 'lol',
  page: 'lol',
  setPage: (value) => set((state) => ({ page: value })),
  dataZus: dataZus,
  // rootContainer: 0,
  // setRootContainerge: (value) => set((state) => ({ rootContainer: value })),
}));
