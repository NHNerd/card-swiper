import { WordDataZus } from '../../../types/types';

export const wordSortRightRatioDate = (words: WordDataZus[]): WordDataZus[] => {
  if (words.length <= 1) return words;

  const pivot = words[Math.floor(Math.random() * words.length)];
  const left = [];
  const right = [];
  const equal = [];

  const rightRatio = (c: number, w: number) => {
    if (w === 0 && c === 0) return -Infinity; // абсолютно неотвеченные — идут первыми
    else if (w === 0) return c; // без ошибок — сортируются по количеству правильных
    else if (c === 0) return -w; // только ошибки — чем больше ошибок, тем хуже
    return (c - w) / w; // основной коэффициент качества
  };

  for (let i = 0; i < words.length; i++) {
    const pivCW = rightRatio(pivot.correct, pivot.wrong);
    if (rightRatio(words[i].correct, words[i].wrong) < pivCW) left.push(words[i]);
    else if (rightRatio(words[i].correct, words[i].wrong) > pivCW) right.push(words[i]);
    else {
      //  few elements with equel Ratio will be sorted by createDate.utcMS (new - old)
      if (words[i]?.createDate?.utcMS > pivot?.createDate?.utcMS) left.push(words[i]);
      else if (words[i]?.createDate?.utcMS < pivot?.createDate?.utcMS) right.push(words[i]);
      else equal.push(words[i]); // Ratio equel && Date equel
    }
  }

  return [...wordSortRightRatioDate(left), ...equal, ...wordSortRightRatioDate(right)];
};
