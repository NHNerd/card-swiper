import { statisticDays2024, statisticDays2025 } from '../tempData';
import { ClcData } from '../../../types.ts';

// Дата в ISO-формате:

//* I have array of all user years

export const processingDate = () => {
  const years: any[] = [];
  years.push(statisticDays2024);
  years.push(statisticDays2025);

  const days: any[] = [...years[0].days, ...years[years.length - 1].days];

  const firstDate: Date = new Date(days[0].date);

  const lastDate: Date = new Date(days[days.length - 1].date);

  // Diffirence в миллисекундах
  const diffInMilliseconds = lastDate - firstDate;
  const daysCount = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return { days, firstDate, lastDate, daysCount };
};

//For debug
const forConsole = (i, userDaysI, dateStep, daysInput) => {
  const days = dateStep.toISOString().split('T')[0];
  const userDays = daysInput[userDaysI]?.date;
  let emoji = '❌';
  if (days === userDays) {
    emoji = '✅';
  }
  console.log(emoji, 'days: ', days, ' | ', 'userDays: ', userDays, '   (', i, ')');
};

const createClcData = (): ClcData => ({ w: 0, m: 0, y: 0, all: 0 });
const wordAddClc: ClcData = createClcData();
const wordsRepClc: ClcData = createClcData();
const sessionClc: ClcData = createClcData();
const timeClc: ClcData = createClcData();
const correctClc: ClcData = createClcData();
const wrongClc: ClcData = createClcData();
const knowPrsntClc: ClcData = createClcData();
const sessionAvgClc: ClcData = createClcData();
const comboClc: ClcData = createClcData();
const comboAvgClc: ClcData = createClcData();

//TODO Add in this ForEach calc logic

export const daysForEach = (
  wordsAdd,
  wordsRep,
  sessionInput,
  time,
  days,
  firstDate,
  daysCount,
  weekStart,
  monthStart,
  yearStart
) => {
  type RangeKey = keyof ClcData;

  const dateStep = new Date(firstDate);
  let userDaysI = 0;
  const daysActiveCount = { w: 0, m: 0, y: 0 };

  for (let i = 0; daysCount >= i; i++) {
    //For debug
    // forConsole(i, userDaysI, dateStep, days);

    if (days[userDaysI]?.date === dateStep.toISOString().split('T')[0]) {
      const { wordAdd, correct, wrong, session, timeSec, comboMax } = days[userDaysI];

      wordsAdd[i] = wordAdd;
      wordsRep[i] = correct + wrong;
      sessionInput[i] = session;
      time[i] = timeSec;

      //Calc Statistic📜
      const toCalcData = (range: RangeKey) => {
        wordAddClc[range] += wordAdd;
        wordsRepClc[range] += correct + wrong;
        sessionClc[range] += session;
        timeClc[range] += timeSec;
        correctClc[range] += correct;
        wrongClc[range] += wrong;
        comboClc[range] += comboMax;
      };

      //All
      toCalcData('all');

      const crrntDayForComparison = new Date(days[userDaysI].date).getTime();

      if (new Date(weekStart).getTime() <= crrntDayForComparison) {
        toCalcData('w');
        daysActiveCount.w++;
      }

      //month
      if (new Date(monthStart).getTime() <= crrntDayForComparison) {
        toCalcData('m');
        daysActiveCount.m++;
      }

      //year
      if (new Date(yearStart).getTime() <= crrntDayForComparison) {
        toCalcData('y');
        daysActiveCount.y++;
      }

      userDaysI++;
    } else {
      wordsAdd[i] = 0;
      wordsRep[i] = 0;
      sessionInput[i] = 0;
      time[i] = 0;
    }

    // increement day + 1
    dateStep.setDate(dateStep.getDate() + 1);
  }

  const calcAvgData = (range: RangeKey, daysCount: number) => {
    knowPrsntClc[range] = Math.round((100 / (correctClc[range] + wrongClc[range])) * correctClc[range]);
    sessionAvgClc[range] = Math.round(timeClc[range] / daysCount);
    comboAvgClc[range] = Math.round(comboClc[range] / daysCount);
  };

  calcAvgData('w', daysActiveCount.w);
  calcAvgData('m', daysActiveCount.m);
  calcAvgData('y', daysActiveCount.y);
  calcAvgData('all', days.length);

  return { wordAddClc, wordsRepClc, sessionClc, timeClc, knowPrsntClc, sessionAvgClc, comboAvgClc };
};
