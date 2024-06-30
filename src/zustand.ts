import { create } from 'zustand';
import { getUserId } from './axios/user.ts';
import { getAllLists } from './axios/list.ts';
import { getAllWords } from './axios/words.ts';

const email = 'froger';
getUserId(email);
getAllLists(localStorage.getItem('userId'));
const allLists = JSON.parse(localStorage.getItem('allLists'));

const data: [] = [];
const allListsId: [] = [];
allLists.map((list) => {
  const listId = list._id;
  const listName = list.listName;
  const order = list.order;
  const wordCount = 0;
  const gameCount = list.gameCount;
  const words: [] = [];

  // const order = list.order;
  data.push({ listId, listName, order, wordCount, gameCount, words });
  allListsId.push(listId);
});

getAllWords(allListsId);

// Write words in lists
const Allwords = JSON.parse(localStorage.getItem('Allwords'));
Object.keys(Allwords).forEach((piece) => {
  let currentList = data.find((obj) => obj.listId === piece);
  currentList.words = Allwords[piece];
});

const noData = [{ _id: 0, userId: 1, listName: 'noData', createdDate: 'xxxx.xx.xx', order: 99 }];

// SORT
const dataSort: any = [];
for (let i = 0; i < data.length; i++) {
  dataSort.push(data[i]);
}

// console.log(dataNew);
export const useUiState = create((set) => ({
  // page: 'lol',
  page: 'menu',
  setPage: (value) => set((state) => ({ page: value })),
}));

export const zustandData = create((set) => ({
  dataZus: dataSort || noData,
  setDataZus: (value) => set((state) => ({ dataZus: value })),
}));

export const zustandOrderListEdit = create((set) => ({
  orderListEditZus: 0,
  setOrderListEditZus: (value) => set((state) => ({ orderListEditZus: value })),
}));
