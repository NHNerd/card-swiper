import { putNewList } from '../axios/list.ts';
import { putNewBulkWord } from '../axios/words.ts';

//TODO Надо тут номально сделать без хардкода лютого
async function buildClientDateFirstTime(data: []) {
  const phrasalVerbs_words = [
    { word: 'break into', translate: 'врываться' },
    { word: 'break out', translate: 'сбежать' },
    { word: 'bring down', translate: 'расстроить' },
  ];
  const idioms_words = [
    { word: 'A piece of cake', translate: 'Проще простого' },
    { word: 'Rain or shine', translate: 'Что бы не произошло' },
  ];

  // Add list

  const phrasalVerbs = await putNewList('phrasalVerbs');
  phrasalVerbs.order = 1;
  phrasalVerbs.wordCount = phrasalVerbs_words.length;

  // Add list 2
  const idioms = await putNewList('idioms');
  idioms.wordCount = idioms.length;

  data.push(idioms);
  data.push(phrasalVerbs);
  console.log(data);
  //TODO order change work only aftere delete LS and refresh
  //TODO I gues it's backand problem
  localStorage.setItem('card-swiper:allLists', JSON.stringify([idioms, phrasalVerbs]));

  // Add word
  const newBulkWord1 = await putNewBulkWord(phrasalVerbs._id, phrasalVerbs_words);
  data[1].words = newBulkWord1;
  localStorage.setItem('card-swiper:allWords', JSON.stringify(newBulkWord1));
  console.log(data);

  // Add word 2
  const newBulkWord2 = await putNewBulkWord(idioms._id, idioms_words);
  data[0].words = newBulkWord2;
  localStorage.setItem('card-swiper:allWords', JSON.stringify(newBulkWord2));
  console.log(data);
  // Clean
  localStorage.removeItem('card-swiper:registration');
  console.log('bild client registration date 100%: _id, list, word :)');
  return data;
}

export default buildClientDateFirstTime;
