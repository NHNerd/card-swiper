import { putNewList } from '../axios/list.ts';
import { putNewBulkWord } from '../axios/words.ts';
import nowDateUTCandOffset from '../handlers/nowDateUTCandOffset.ts';
import {
  fruits_vegetables,
  phrasalVerbs_words,
  idioms_words,
  test,
  NewWordType,
} from '../hardcode/startListsWords.ts';
import { ListDataZus } from '../types/types.ts';

async function buildClientDateFirstTime(data: ListDataZus[]): Promise<ListDataZus[]> {
  const date = nowDateUTCandOffset();
  // Words don't have order field like List, sort by correctRatio && Date
  const addDate = (
    words: NewWordType[],
    dateIndex: number,
    date: { utcMS: number; utcOffsetMS: number }
  ): number => {
    for (const word of words) {
      word.createDate = {
        utcMS: date.utcMS + dateIndex,
        utcOffsetMS: date.utcOffsetMS,
      };
      dateIndex += 1;
    }
    return dateIndex;
  };

  const lists: [string, NewWordType[]][] = [
    ['Fruits🍏 & Vegetables🍆', fruits_vegetables],
    ['Phrasal verbs', phrasalVerbs_words],
    ['Idioms', idioms_words],
    ['test', test],
  ];

  // For set ofset +1 for ALL words ( it's need for order in list of all words )
  let dateIndex: number = 0;
  let i: number = 0;
  const responseListsArr = [];
  const responseWordsArr = [];
  for (const [listName, words] of lists) {
    dateIndex = addDate(words, dateIndex, date);

    // Add list
    date.utcMS += i;
    const responseList = await putNewList(listName, date);
    responseList.order = lists.length - i;
    responseList.wordCount = words.length;
    responseListsArr.push(responseList);

    // Add word bulk
    const responseWord = await putNewBulkWord(responseList._id, words);
    responseList.words = responseWord;
    responseWordsArr.push(responseWord);

    data.push(responseList);

    // Clean
    localStorage.removeItem('card-swiper:registration');

    i++;
  }

  localStorage.setItem('card-swiper:allLists', JSON.stringify(responseListsArr));
  localStorage.setItem('card-swiper:allWords', JSON.stringify(responseWordsArr));
  console.log('🍆🍆🍆', data);
  console.log('bild client registration date 100%: _id, list, word :)');
  return data;
}

export default buildClientDateFirstTime;
