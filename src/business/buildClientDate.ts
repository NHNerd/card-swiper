import { getUserId, emailById } from '../axios/user.ts';
import { getAllLists } from '../axios/list.ts';
import { getAllWords } from '../axios/words.ts';
import sotByRatio from './word/sotByRatio.ts';
import { wordSortRightRatioDate } from '../pages/session/hndlrs/algorithm.ts';
import { ListDataZus, WordDataZus } from '../types/types.ts';

import buildClientDateFirstTime from './buildClientDateFirstTime.ts';

// structured data is collected here Every time the page is reloaded
// data is taken from localstorage if localstorage  exists otherwise from mongodb

async function buildClientDate(email: string): Promise<ListDataZus[]> {
  const data: ListDataZus[] = [];
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
  const allLists = JSON.parse(localStorage.getItem('card-swiper:allLists')) || (await getAllLists(userId, true));
  if (!allLists) {
    const dateEnd = Date.now();
    console.log('bild client date 33%: _id :(', '|', 'Building time:', (dateEnd - dateStart) / 1000, 's.');
    return data;
  }

  // Creating structured data
  const allListsId: string[] = [];
  allLists.map((list: ListDataZus) => {
    const _id: string = list._id;
    const createDate: { utcMS: number; utcOffsetMS: number } = list.createDate;
    const listName: string = list.listName;
    const order: number = list.order;
    const wordCount: number = 0;
    const gameCount: number = list.gameCount;
    const sessionCount: number = list?.sessionCount ? list.sessionCount : 0;
    const words: [] = [];

    data.push({ _id, createDate, listName, order, wordCount, gameCount, sessionCount, words });

    //collect all lists id for get all users words
    allListsId.push(_id);
  });

  // Write words and gameCount in lists
  const Allwords = JSON.parse(localStorage.getItem('card-swiper:allWords')) || (await getAllWords(userId));
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
  const words: Record<string, WordDataZus[]> = {};
  // only one iteration for all words
  Allwords.forEach((word: WordDataZus) => {
    // Если массив для данного listId уже существует, добавляем в него слово
    if (words[word.listId]) words[word.listId].push(word);
    // Если массива для данного listId еще нет, создаем его и добавляем слово
    else words[word.listId] = [word];
  });

  // only one iteration for all list - create fild wordCount
  data.forEach((list) => {
    const listWord = words[list._id];

    if (!listWord || listWord?.length === 0) {
      list.words = [];
      listWord;
      list.wordCount = 0;
    } else {
      const listWordSorted = wordSortRightRatioDate(listWord);

      list.words = listWordSorted;
      list.wordCount = listWordSorted?.length;
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
  // console.log(data[0]);
  // console.log(data[0].words[0]);
  return data;
}

export default buildClientDate;
