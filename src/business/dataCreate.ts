import { getUserId } from '../axios/user.ts';
import { getAllLists } from '../axios/list.ts';
import { getAllWords } from '../axios/words.ts';

// structured data is collected here Every time the page is reloaded
// data is taken from localstorage if localstorage  exists otherwise from mongodb

const data: [] = [];
async function dataCrate(email: string) {
  // get user Id by email
  const userId = localStorage.getItem('userId') || (await getUserId(email));
  // get all lists Id by user Id
  const allLists = JSON.parse(localStorage.getItem('allLists')) || (await getAllLists(userId));

  // Creating structured data
  const allListsId: [] = [];
  allLists.map((list) => {
    const listId = list._id;
    const listName = list.listName;
    const order = list.order;
    const wordCount = 0;
    const gameCount = list.gameCount;
    const words: [] = [];

    data.push({ listId, listName, order, wordCount, gameCount, words });

    //collect all lists id for get all users words
    allListsId.push(listId);
  });

  // Write words and gameCount in lists
  const Allwords = JSON.parse(localStorage.getItem('Allwords')) || (await getAllWords(allListsId));
  Object.keys(Allwords).forEach((piece) => {
    const currentList = data.find((obj) => obj.listId === piece);

    currentList.wordCount = Object.keys(Allwords).length;
    currentList.words = Allwords[piece];
  });

  console.log('B U S I N E S S');
  return data;
}

export default dataCrate;
