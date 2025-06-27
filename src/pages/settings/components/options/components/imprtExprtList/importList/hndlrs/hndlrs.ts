export const splitFilename = (filename: string) => {
  const parts: string[] = filename.split('.');
  if (parts.length === 1) return { name: filename, ext: '' };
  return {
    fileNameOnly: parts.slice(0, -1).join('.'),
    fileExt: parts.at(-1),
  };
};

export const txtValidation = (constent: string, wordsErrLocal: string) => {
  let warningStatus = '';
  let wordErrCounter = 0;
  const unicWords = new Set();

  const words = constent
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line, index) => {
      if (!line) return false; // убираем пустые строки
      if (!line.includes(':')) {
        wordsErrLocal += `${index}. ${line}\n`;
        wordErrCounter += 1;
        return false;
      }
      return true;
    })
    .map((line) => {
      const [word, ...rest] = line.split(':');
      return {
        word: word.trim().replace(/\s+/g, ' '),
        translate: rest.join(':').trim().replace(/\s+/g, ' '), // На случай, если ":" в переводе
      };
    })
    .filter((obj) => {
      if (unicWords.has(obj.word)) return false;
      unicWords.add(obj.word);
      return true;
    }); // Unic only

  return { unicWords, wordsErrLocal, wordErrCounter };
};
