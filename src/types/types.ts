export type SessionStatistic = {
  date: string;
  session: number;
  timeSec: number;
  comboMax: number;
  correct: number;
  wrong: number;
};

export type WordDataZus = {
  _id: string;
  listId: string;
  createDate: { utcMS: number; utcOffsetMS: number };
  word: string;
  translate: string;

  updateWord: string;
  updateKnow: string;
  updateTranslate: string;

  correct: number;
  wrong: number;

  know: boolean; // status for algthoritm
};

export type ListDataZus = {
  _id: string;
  createDate: { utcMS: number; utcOffsetMS: number };
  listName: string;
  order: number;
  wordCount: number;
  gameCount: number;
  sessionCount: number;
  words: WordDataZus[];
};

export type PosType = { x: number; y: number };
