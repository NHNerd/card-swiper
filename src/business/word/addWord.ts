//TODO change order all lists
//TODO set correct value in client - change creating logic in server

export const addWord = (listId: any, word: string, translate: string) => {
  const allWords = JSON.parse(localStorage.getItem('Allwords'));
  const otherWords: any[] = [];
  const listWords: any[] = [];
  allWords.forEach((word: any) => {
    if (word.listId === listId) {
      listWords.push(word);
    } else {
      otherWords.push(word);
    }
  });

  if (listWords && listWords.some((item) => item.word === word)) {
    console.log('Word: "' + word + '" already exists!');
    return null;
  }

  //? ISO 8601 (0 UTC - Z)
  const newTime = new Date().toISOString();

  const newWord = {
    listId,
    word,
    updateWord: newTime,
    translate,
    updateTranslate: newTime,
    correct: 0,
    wrong: 0,
    know: false,
    updateKnow: newTime,
    notUpdated: true,
  };

  listWords.unshift(newWord);

  localStorage.setItem('Allwords', JSON.stringify([...listWords, ...otherWords]));

  return [newWord, listWords, otherWords];
};

export const wordRefreshLSAfterDB = (wordFresh: any, newListWords: any[], otherWords: any[]) => {
  newListWords[0] = wordFresh;
  localStorage.setItem('Allwords', JSON.stringify([...newListWords, ...otherWords]));
};

export const editWord = (word: string, oldWord: string, translate: string, newTime: any) => {
  const allWords = JSON.parse(localStorage.getItem('Allwords'));
  console.log(word);
  allWords.forEach((item: any) => {
    if (item.word === oldWord) {
      if (item.word !== word) {
        item.word = word;
        item.updateWord = newTime;
      } else if (item.translate !== translate) {
        item.translate = translate;
        item.updateTranslate = newTime;
      }
    }
  });
  localStorage.setItem('Allwords', JSON.stringify(allWords));

  return;
};
