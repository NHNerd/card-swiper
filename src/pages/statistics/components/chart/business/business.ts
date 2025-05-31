import { ClcData } from '../../../types.ts';
import dateToLocalUtcOffset from '../../../../../handlers/dateToLocalUtcOffset.ts';
import calcYearRange12Month from '../hndlrs/calcYearRange12Month.ts';

const difDaysHndlr = (firstDate: string, lastDate: string): number => {
  const diffInMilliseconds = new Date(lastDate) - new Date(firstDate);
  const daysCount = Math.max(Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1, 0);
  return daysCount;
};

export const processingDate = (statisticFromDB: any[]) => {
  if (!statisticFromDB)
    return { days: null, firstDate: null, lastDate: dateToLocalUtcOffset(new Date()), daysCount: 0 };

  const days: any[] = [];
  for (let i = statisticFromDB.length - 1; i >= 0; i--) {
    days.push(...statisticFromDB[i].days);
  }

  const firstDate: string = days[0].date;

  const lastDate: string = days[days.length - 1].date;

  const daysCount = difDaysHndlr(firstDate, lastDate);

  return { days, firstDate, lastDate, daysCount };
};

//For debug
const forConsole = (i: number, userDaysI, dateStep, daysInput) => {
  const days = dateStep;
  const userDays = daysInput[userDaysI]?.date;
  let emoji = '❌';
  if (days === userDays) emoji = '✅';

  console.log(emoji, 'days: ', days, ' | ', 'userDays: ', userDays, '   (', i, ')');
};

export const daysForEach = (
  wordsAdd: number[],
  wordsRep: number[],
  sessionInput: number[],
  time: number[],
  wordsAdd12month: Record<string, number[]>,
  wordsRep12month: Record<string, number[]>,
  sessionInput12month: Record<string, number[]>,
  time12month: Record<string, number[]>,
  days: object[],
  firstDate: string,
  daysCount: number,
  weekStart: string,
  monthStart: string,
  yearStart: string,
  lastdate: string
) => {
  type RangeKey = keyof ClcData;

  const createClcData = (): ClcData => ({ w: 0, m: 0, y: 0, all: 0 });
  const wordAddClc: ClcData = createClcData();
  const wordsRepClc: ClcData = createClcData();
  const sessionClc: ClcData = createClcData();
  const timeClc: ClcData = createClcData();
  const correctClc: ClcData = createClcData();
  const wrongClc: ClcData = createClcData();
  const comboClc: ClcData = createClcData();

  const knowPrsntClc: ClcData = createClcData();
  const sessionAvgClc: ClcData = createClcData();
  const comboAvgClc: ClcData = createClcData();

  const dateStep = new Date(firstDate);

  let userDaysI = 0;
  const daysActiveCount = { w: 0, m: 0, y: 0 };

  for (let i = 0; daysCount - 1 >= i; i++) {
    //For debug
    // forConsole(i, userDaysI, dateToLocalUtcOffset(dateStep), days);

    if (days[userDaysI]?.date === dateToLocalUtcOffset(dateStep)) {
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

      //all
      toCalcData('all');
      //week
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
  calcAvgData('all', Array.isArray(days) ? days.length : 0);

  calcYearRange12Month(
    wordsAdd,
    wordsRep,
    sessionInput,
    time,
    wordsAdd12month,
    wordsRep12month,
    sessionInput12month,
    time12month,
    firstDate,
    lastdate,
    difDaysHndlr
  );

  return { wordAddClc, wordsRepClc, sessionClc, timeClc, knowPrsntClc, sessionAvgClc, comboAvgClc };
};
