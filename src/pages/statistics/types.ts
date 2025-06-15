export type ClcData = {
  w: number;
  m: number;
  y: number;
  all: number;
};

export type DayStats = {
  date: string;
  wordAdd: number;
  session: number;
  timeSec: number;
  comboMax: number;
  correct: number;
  wrong: number;
  _id?: string;
};
