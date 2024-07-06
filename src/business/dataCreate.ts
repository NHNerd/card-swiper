import { getUserId } from '../axios/user.ts';
import { getAllLists } from '../axios/list.ts';
import { getAllWords } from '../axios/words.ts';

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

// Write words and gameCount in lists
const Allwords = JSON.parse(localStorage.getItem('Allwords'));
Object.keys(Allwords).forEach((piece) => {
  const currentList = data.find((obj) => obj.listId === piece);

  currentList.wordCount = Object.keys(Allwords).length;
  currentList.words = Allwords[piece];
});

export default data;
