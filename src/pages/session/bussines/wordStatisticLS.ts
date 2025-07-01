export const wordStatisticLS = (wordStatus) => {
  const allWords = JSON.parse(localStorage.getItem('card-swiper:allWords'));
  const otherWords: any[] = [];
  const listWords: any[] = [];
  const listWordsDTO: any[] = [];
  //? ISO 8601 (0 UTC - Z)
  const newTime = new Date().toISOString();
  let i = 0;

  allWords.sort((a, b) => ('' + a._id).localeCompare(b._id));
  // wordStatus - already sorted

  allWords.forEach((word: any) => {
    if (word._id === wordStatus[i]?.word_id) {
      word.updateWord = newTime;
      word.updateTranslate = newTime;
      word.updateKnow = newTime;

      wordStatus[i].know ? (word.correct += 1) : (word.wrong += 1);

      listWords.push(word);

      // DTO for DB
      delete word.createDate;
      delete word.know;
      delete word.translate;
      delete word.updateKnow;
      delete word.updateTranslate;
      delete word.updateWord;
      delete word.word;

      listWordsDTO.push(word);

      i += 1;
    } else {
      otherWords.push(word);
    }
  });

  localStorage.setItem('card-swiper:allWords', JSON.stringify([...listWords, ...otherWords]));

  return [listWordsDTO, otherWords];
};
