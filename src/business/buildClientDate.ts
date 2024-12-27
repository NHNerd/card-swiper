import { getUserId, emailById } from '../axios/user.ts';
import { getAllLists } from '../axios/list.ts';
import { getAllWords } from '../axios/words.ts';
import sotByRatio from './word/sotByRatio.ts';

import buildClientDateFirstTime from './buildClientDateFirstTime.ts';

// structured data is collected here Every time the page is reloaded
// data is taken from localstorage if localstorage  exists otherwise from mongodb

type ListData = {
  listId: string;
  listName: string;
  order: number;
  wordCount: number;
  gameCount: number;
  sessionCount: number;
  words: any[];
};

async function buildClientDate(email: string): Promise<ListData[]> {
  const data: ListData[] = [];
  const dateStart = Date.now();

  //email is delited
  // or in time sign-in email = null
  if (!email) {
    //email && userId is delited
    const userId = localStorage.getItem('card-swiper:userId');
    email = localStorage.getItem('card-swiper:email') || (await emailById(userId));
  }

  // get user Id by email
  const userId = localStorage.getItem('card-swiper:userId') || (await getUserId(email));

  // FIRST time scenario
  const isFirstTime = JSON.parse(localStorage.getItem('card-swiper:registration')) || false;
  if (isFirstTime) return await buildClientDateFirstTime(data);

  // get all lists Id by user Id
  const allLists =
    JSON.parse(localStorage.getItem('card-swiper:allLists')) || (await getAllLists(userId, true));
  if (!allLists) {
    const dateEnd = Date.now();
    console.log(
      'bild client date 33%: _id :(',
      '|',
      'Building time:',
      (dateEnd - dateStart) / 1000,
      's.'
    );
    return data;
  }

  // Creating structured data
  const allListsId: [] = [];
  allLists.map((list) => {
    const listId = list._id;
    const listName: '' = list.listName;
    const order: number = list.order;
    const wordCount: number = 0;
    const gameCount: number = list.gameCount;
    const sessionCount: number = list?.sessionCount ? list.sessionCount : 0;
    const words: [] = [];

    data.push({ listId, listName, order, wordCount, gameCount, sessionCount, words });

    //collect all lists id for get all users words
    allListsId.push(listId);
  });

  // Write words and gameCount in lists
  const Allwords =
    JSON.parse(localStorage.getItem('card-swiper:allWords')) || (await getAllWords(userId));
  if (!Allwords) {
    const dateEnd = Date.now();
    console.log(
      'B U S I N E S S: data created: _id, list :|',
      '|',
      'Building time:',
      (dateEnd - dateStart) / 1000,
      's.'
    );
    return data;
  }

  // craate map
  const words = {};
  // only one iteration for all words
  Allwords.forEach((word) => {
    // Если массив для данного listId уже существует, добавляем в него слово
    if (words[word.listId]) words[word.listId].push(word);
    // Если массива для данного listId еще нет, создаем его и добавляем слово
    else words[word.listId] = [word];
  });

  // only one iteration for all list - create fild wordCount
  data.forEach((list) => {
    const listWord = words[list.listId];

    if (!listWord || listWord?.length === 0) {
      list.words = [];
      list.wordCount = 0;
    } else {
      sotByRatio(listWord);
      list.words = listWord;
      list.wordCount = listWord?.length;
    }
  });
  //? O = "order of growth" (Big-O Notation)
  //? n = Allwords
  //? m = AllLists
  //? O(n+m) - liner

  const dateEnd = Date.now();
  console.log(
    'bild client date 100%: _id, list, words :)',
    '|',
    'Building time:',
    (dateEnd - dateStart) / 1000,
    's.'
  );
  return data;
}

export default buildClientDate;
