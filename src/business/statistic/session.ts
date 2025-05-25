import { SessionStatistic } from '../../types/types';

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
    sessionAddStatistic = [{ date: new Date(), session: 1, timeSec, comboMax, correct, wrong }];

    //? sessionAddStatistic array EXIST && last obj.date in array == toDay =>
    //? session result plus existe fields
  } else if (
    new Date(sessionAddStatistic[sessionAddStatistic.length - 1].date).toISOString().split('T')[0] ===
    new Date().toISOString().split('T')[0]
  ) {
    const today = sessionAddStatistic[sessionAddStatistic.length - 1];
    // Refresh today Date for new sec, for to compare last update on server side
    today.date = new Date();
    today.session += 1;
    today.timeSec += timeSec;
    today.comboMax = Math.max(today.comboMax, comboMax);
    today.correct += correct;
    today.wrong += wrong;

    //? sessionAddStatistic array EXIST, but last day != today =>
    //? push new day
  } else {
    const today: SessionStatistic = {
      date: new Date(),
      session: 1,
      timeSec: timeSec,
      comboMax: comboMax,
      correct: correct,
      wrong: wrong,
    };

    sessionAddStatistic.push(today);
  }

  localStorage.setItem('card-swiper:sessionAddStatistic', JSON.stringify(sessionAddStatistic));

  return sessionAddStatistic;
};
