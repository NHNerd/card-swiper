import { SessionStatistic } from '../../types/types';
import dateToLocalUtcOffset from '../../handlers/dateToLocalUtcOffset';

export const sessionAddStatistic = (
  timeSec: number,
  comboMax: number,
  correct: number,
  wrong: number
) => {
  let sessionAddStatistic: SessionStatistic[] | null = JSON.parse(
    localStorage.getItem('card-swiper:sessionAddStatistic')
  );

  //? sessionAddStatistic array don't exist => create obj with session results
  if (!sessionAddStatistic) {
    sessionAddStatistic = [
      { date: dateToLocalUtcOffset(new Date()), session: 1, timeSec, comboMax, correct, wrong },
    ];

    //? sessionAddStatistic array EXIST && last obj.date in array == toDay =>
    //? session result plus existe fields
  } else if (
    sessionAddStatistic[sessionAddStatistic.length - 1].date === dateToLocalUtcOffset(new Date())
  ) {
    const today = sessionAddStatistic[sessionAddStatistic.length - 1];
    today.session += 1;
    today.timeSec += timeSec;
    today.comboMax = Math.max(today.comboMax, comboMax);
    today.correct += correct;
    today.wrong += wrong;

    //? sessionAddStatistic array EXIST, but last day != today =>
    //? push new day
  } else {
    const today: SessionStatistic = {
      date: dateToLocalUtcOffset(new Date()),
      session: 1,
      timeSec,
      comboMax,
      correct,
      wrong,
    };

    sessionAddStatistic.push(today);
  }

  localStorage.setItem('card-swiper:sessionAddStatistic', JSON.stringify(sessionAddStatistic));

  return sessionAddStatistic;
};
