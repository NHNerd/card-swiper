import { create } from 'zustand';
import dataCrate from './business/dataCreate.ts';

export const useUiState = create((set) => ({
  // page: 'lol',
  page: 'menu',
  setPage: (value: string) => set((state) => ({ page: value })),
}));

const noData = [
  {
    listId: 0,
    listName: 'Empty :(',
    order: 0,
    wordCount: 0,
    gameCount: 0,
    words: [
      {
        _id: '668054375c25ed492d736ff1',
        listId: '668053cf5c25ed492d736fee',
        word: 'Empty word 0',
        translate: 'пустое слово 0',
        createdDate: '2024-06-29T18:36:39.278Z',
        correct: 0,
        wrong: 0,
        status: 0,
        __v: 0,
      },
      {
        _id: '6681a0a9ac0e7df8d0815c68',
        listId: '668053cf5c25ed492d736fee',
        word: 'Empty word 1',
        translate: 'пустое слово 1',
        createdDate: '2024-06-30T18:15:05.537Z',
        correct: 0,
        wrong: 0,
        status: 0,
        __v: 0,
      },
    ],
  },
];

// export const zustandData = create((set) => ({
//   dataZus: noData,
//   setDataZus: (value) => set((state) => ({ dataZus: value })),
//   fetchDataZus: async () => {
//     const data = await dataCrate();
//     set({ dataZus: data });
//   },
// }));

export const zustandData = create((set) => ({
  dataZus: noData, // Изначально данные отсутствуют
  setDataZus: (value) => set({ dataZus: value }), // Функция для установки данных
  fetchDataZus: async () => {
    const data = await dataCrate('froger');
    set({ dataZus: data });
  },
}));

export const zustandOrderListEdit = create((set) => ({
  orderListEditZus: 0,
  setOrderListEditZus: (value: number) => set((state) => ({ orderListEditZus: value })),
}));

console.log('Z U S T A N D');
