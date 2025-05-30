import React, { useEffect } from 'react';
import ChartBtn from './pieces/chartBtn/ChartBtn';

import Statistic from '../../../menu/components/statistic/Statistic';
import Session from '../../../session/Session';

import { timeRangeSwitch } from './hndlrs/timeRangeSwitch';
import { y2Calc } from './hndlrs/math';
import { dotDay } from './pieces/dotDay';
import { processingDate, daysForEach } from './business/business';
import wmyFirstLastISO from './hndlrs/wmyFirstLastISO';
import monthDayLetters from './hndlrs/monthDayLetters';
import { useUiState } from '../../../../zustand';
import { ClcData } from '../../types';

import cssChart from './Chart.module.css';
import cssStatistics from '../../Statistics.module.css';

let isSttstcCalc = false;

const wordsAdd: number[] = [];
const wordsRep: number[] = [];
const session: number[] = [];
const time: number[] = [];

const forConsole = (i, userDaysI, dateStep, daysInput) => {
  const days = dateStep.toISOString().split('T')[0];
  const userDays = daysInput[userDaysI]?.date;
  let emoji = '❌';
  if (days === userDays) {
    emoji = '✅';
  }
  console.log(emoji, 'days: ', days, ' | ', 'userDays: ', userDays, '   (', i, ')');
};

type Props = {
  chartWordsRepOn: boolean;
  setChartWordsRepOn: React.Dispatch<React.SetStateAction<boolean>>;
  chartWordsAddOn: boolean;
  setChartWordsAddOn: React.Dispatch<React.SetStateAction<boolean>>;
  chartSessionOn: boolean;
  setChartSessionOn: React.Dispatch<React.SetStateAction<boolean>>;
  chartTimeOn: boolean;
  setChartTimeOn: React.Dispatch<React.SetStateAction<boolean>>;
  timeRange: 'w' | 'm' | 'y' | 'all';
  setTimeRange: React.Dispatch<React.SetStateAction<'w' | 'm' | 'y' | 'all'>>;
  setWordAddClc: React.Dispatch<React.SetStateAction<object>>;
  setWordsRepClc: React.Dispatch<React.SetStateAction<object>>;
  setSessionClc: React.Dispatch<React.SetStateAction<object>>;
  setTimeClc: React.Dispatch<React.SetStateAction<object>>;
  setKnowPrsntClc: React.Dispatch<React.SetStateAction<object>>;
  setSessionAvgClc: React.Dispatch<React.SetStateAction<object>>;
  setComboAvgClc: React.Dispatch<React.SetStateAction<object>>;
};

const statisticTotal = {
  wordAdd: 'агригированные данные, обновляются после каждой сессии',
  wordRep: 'агригированные данные, обновляются после каждой сессии',
  session: 'агригированные данные, обновляются после каждой сессии',
  timeSec: 'агригированные данные, обновляются после каждой сессии',
  comboMax: 'агригированные данные, обновляются после каждой сессии (if(new > current))',
  comboAvg: 'агригированные данные, обновляются после каждой сессии',
  timeAvg: 'агригированные данные, обновляются после каждой сессии',
};

export default function Chart({
  chartWordsRepOn,
  setChartWordsRepOn,
  chartWordsAddOn,
  setChartWordsAddOn,
  chartSessionOn,
  setChartSessionOn,
  chartTimeOn,
  setChartTimeOn,
  timeRange,
  setTimeRange,
  setWordAddClc,
  setWordsRepClc,
  setSessionClc,
  setTimeClc,
  setKnowPrsntClc,
  setSessionAvgClc,
  setComboAvgClc,
}: Props) {
  const { page, setPage } = useUiState();

  //TODO now recalculate  begins after click on the line chart buttons
  //TODO recalculate must be only in time canching values of the: days, firstDate, daysCount
  //? useMemo - applay only first render, next applay after trigger запвисимостей

  const { days, firstDate, lastDate, daysCount } = React.useMemo(() => {
    return processingDate();
  }, []);

  const { weekStart, weekEnd, monthStart, monthEnd, yearStart, yearEnd } = React.useMemo(() => {
    return wmyFirstLastISO(lastDate);
  }, [lastDate]);

  // const [wordsAdd, setWordsAdd] = React.useState<number[]>([]);
  // const [wordsRep, setWordsRep] = React.useState<number[]>([]);
  // const [session, setSession] = React.useState<number[]>([]);
  // const [time, setTime] = React.useState<number[]>([]);

  //? filling empty days

  const createClcData = (): ClcData => ({ w: 0, m: 0, y: 0, all: 0 });
  let wordAddClcData: ClcData = createClcData();
  let wordsRepClcData: ClcData = createClcData();
  let sessionClcData: ClcData = createClcData();
  let timeClcData: ClcData = createClcData();
  let knowPrsntClcData: ClcData = createClcData();
  let sessionAvgClcData: ClcData = createClcData();
  let comboAvgClcData: ClcData = createClcData();

  if (isSttstcCalc === false) {
    const culcStatistic = daysForEach(
      wordsAdd,
      wordsRep,
      session,
      time,
      days,
      firstDate,
      daysCount,
      weekStart,
      monthStart,
      yearStart
    );
    wordAddClcData = culcStatistic.wordAddClc;
    wordsRepClcData = culcStatistic.wordsRepClc;
    sessionClcData = culcStatistic.sessionClc;
    timeClcData = culcStatistic.timeClc;
    knowPrsntClcData = culcStatistic.knowPrsntClc;
    sessionAvgClcData = culcStatistic.sessionAvgClc;
    comboAvgClcData = culcStatistic.comboAvgClc;

    isSttstcCalc = true;
  }

  React.useEffect(() => {
    if (isSttstcCalc === true) {
      console.log('📜 Calc Statistic(in render time, and the session end)');

      const setData = (setData: any, data: ClcData) =>
        setData({ w: data.w, m: data.m, y: data.y, all: data.all });

      setData(setWordAddClc, wordAddClcData);
      setData(setWordsRepClc, wordsRepClcData);
      setData(setSessionClc, sessionClcData);
      setData(setTimeClc, timeClcData);
      setData(setKnowPrsntClc, knowPrsntClcData);
      setData(setSessionAvgClc, sessionAvgClcData);
      setData(setComboAvgClc, comboAvgClcData);
    }
  }, []);

  const newDate = new Date();

  const monthDaysChartCurrent = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();

  const headerRangeHndlr = (first, last) => first.replace(/-/g, '.') + ' - ' + last.replace(/-/g, '.');

  const difDays = (start) => {
    const difSec = lastDate.getTime() - new Date(start).getTime();
    return Math.round(difSec / (1000 * 60 * 60 * 24));
  };

  // w | m | y | all
  let headerRange = headerRangeHndlr(weekStart, weekEnd);
  let chartRange = 7;
  let rangeOffset = chartRange - 1 - difDays(weekStart);

  let dayLetters: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  if (timeRange === 'w') {
    chartRange = 7;
    rangeOffset = chartRange - 1 - difDays(weekStart);
    dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    headerRange = headerRangeHndlr(weekStart, weekEnd);
  } else if (timeRange === 'm') {
    chartRange = Number(monthEnd.slice(8));
    rangeOffset = chartRange - 1 - difDays(monthStart);
    //? I can show через 1 или 2 like: 1, 3, 5 || 1, 4, 7, 10
    dayLetters = monthDayLetters(new Date(monthDaysChartCurrent));
    headerRange = headerRangeHndlr(monthStart, monthEnd);
  } else if (timeRange === 'y') {
    chartRange = 12;
    rangeOffset = chartRange - 2 - (Number(lastDate.getMonth()) - Number(yearStart.slice(5, 7)));
    dayLetters = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    headerRange = headerRangeHndlr(yearStart, yearEnd);
  } else if (timeRange === 'all') {
    chartRange = daysCount;
    rangeOffset = 0;
    //? I can shwo a few🤔🤔🤔
    dayLetters = [''];
    headerRange = headerRangeHndlr(
      firstDate.toISOString().split('T')[0],
      lastDate.toISOString().split('T')[0]
    );
  }

  const wordsAddSlice = wordsAdd.slice(-chartRange + rangeOffset);
  const wordsRepWeekS = wordsRep.slice(-chartRange + rangeOffset);
  const sessionWeekS = session.slice(-chartRange + rangeOffset);
  const timeSlice = time.slice(-chartRange + rangeOffset);

  const step: number = 100 / (chartRange - 1);
  const lineWidth: number = 2;

  const linesTSX: any[] = [];
  const circlesTSX: any[] = [];

  const dayLettersTSX = [];

  const linesAndCircles = (array: number[], color: string, i: number, key: string) => {
    if (array.length > i) {
      const dotMonth = timeRange === 'm' ? (i % 3 === 0 ? 1.4 : 0) : 1;
      circlesTSX.push(
        <circle
          key={`${key}${i}`}
          cx={`${i * step}%`}
          cy={`${y2Calc(array, i, lineWidth)}%`}
          r={(lineWidth / 2) * dotMonth}
          fill='#d9d9d9'
          stroke={color}
        />
      );
      if (array.length - 1 > i) {
        linesTSX.push(
          <line
            key={`line-${key}${i}`}
            x1={`${i * step}%`}
            y1={`${y2Calc(array, i, lineWidth)}%`}
            x2={`${(i + 1) * step}%`}
            y2={`${y2Calc(array, i + 1, lineWidth)}%`}
            stroke={color}
            opacity={0.7}
          />
        );
      }
    }
  };

  for (let i = 0; i < chartRange; i++) {
    if (chartWordsAddOn) linesAndCircles(wordsAddSlice, 'var(--wordsAdded-btnSttstc-color)', i, 'add-');
    if (chartWordsRepOn) linesAndCircles(wordsRepWeekS, 'var(--session-btnSttstc-color)', i, 'rep-');
    if (chartSessionOn) linesAndCircles(sessionWeekS, 'var(--wordsRep-btnSttstc-color)', i, 'session-');
    if (chartTimeOn) linesAndCircles(timeSlice, 'var(--time-btnSttstc-color)', i, 'time-');

    dayLettersTSX.push(
      <div
        key={`dayLetter-${i}`}
        className={`${cssChart.dayLetter}`}
        style={{
          left: `${i * step}%`,
          color: `${i === wordsAdd.length - 1 ? '#d9d9d9' : '#d9d9d983'}`,
          textShadow: `${i === wordsAdd.length - 1 ? 'rgb(255, 255, 255) 0px 0 1px' : ''}`,
        }}
      >
        {dayLetters[i]}
      </div>
    );
  }

  const maxIndexFunc = (array: number[]) => {
    return array.reduce((maxIdx, current, idx, arr) => {
      return current > arr[maxIdx] ? idx : maxIdx;
    }, 0);
  };

  const MaxValArray = [
    maxIndexFunc(wordsAddSlice),
    maxIndexFunc(wordsRepWeekS),
    maxIndexFunc(sessionWeekS),
    maxIndexFunc(timeSlice),
  ];

  const arrayMargin = [0, 0, 0, 0];
  const MaxValArraySet = new Set(MaxValArray);
  const MaxValArraySetIndex = Array.from(MaxValArraySet);

  MaxValArray.map((item, i) => {
    if (item !== MaxValArraySetIndex[i])
      arrayMargin[i] = (arrayMargin[1] ? 1 : 0) + (arrayMargin[2] ? 1 : 0) + 1;
  });

  const maxVal = (
    array: number[],
    color: string,
    isOn: boolean,
    description: string,
    MaxValArrayIndex: number
  ) => {
    return (
      <div
        className={cssChart.maxVal}
        style={{
          left: `${
            MaxValArray[MaxValArrayIndex] * step +
            8 * arrayMargin[MaxValArrayIndex] -
            (MaxValArray.length - MaxValArraySetIndex.length) * 4
          }%`,
          top: `${y2Calc(array, MaxValArray[MaxValArrayIndex], lineWidth)}%`,
          color: color,
          display: isOn ? 'block' : 'none',
        }}
      >
        {array[MaxValArray[MaxValArrayIndex]] + (description || '')}
      </div>
    );
  };

  return (
    <div className={`${cssChart.container}`}>
      <header className={`${cssChart.timeRange} ${page !== 'statistics' ? cssChart.timeRangeOff : ''}`}>
        {headerRange}
        <button
          onClick={() => timeRangeSwitch(timeRange, setTimeRange)}
          className={`${cssChart.timeSwitch} `}
        >
          {timeRange}.
        </button>
      </header>
      <section
        className={`${cssChart.miniChart} ${
          page === 'menu' || page === 'statistics' || page === 'settings' ? '' : cssChart.miniChartOff
        }`}
      >
        <svg width='100%' height='100%' strokeWidth={lineWidth} strokeLinecap='round'>
          {linesTSX}
          {circlesTSX}
        </svg>

        {dotDay(wordsAddSlice, 'var(--wordsAdded-btnSttstc-color)', chartWordsAddOn, step, lineWidth)}
        {dotDay(wordsRepWeekS, 'var(--session-btnSttstc-color)', chartWordsRepOn, step, lineWidth)}
        {dotDay(sessionWeekS, 'var(--wordsRep-btnSttstc-color)', chartSessionOn, step, lineWidth)}
        {dotDay(timeSlice, 'var(--time-btnSttstc-color)', chartTimeOn, step, lineWidth)}

        {maxVal(wordsAddSlice, 'var(--wordsAdded-btnSttstc-color)', chartWordsAddOn, '', 0)}
        {maxVal(wordsRepWeekS, 'var(--session-btnSttstc-color)', chartWordsRepOn, '', 1)}
        {maxVal(sessionWeekS, 'var(--wordsRep-btnSttstc-color)', chartSessionOn, '', 2)}
        {maxVal(timeSlice, 'var(--time-btnSttstc-color)', chartTimeOn, 'm.', 3)}

        {dayLettersTSX}
      </section>
      <div
        className={`${cssChart.btnWrap} ${cssStatistics.opacity} ${
          page === 'statistics' ? '' : cssStatistics.opacityOff
        }`}
      >
        <ChartBtn
          chartWordsRepOn={chartWordsRepOn}
          setChartWordsRepOn={setChartWordsRepOn}
          chartWordsAddOn={chartWordsAddOn}
          setChartWordsAddOn={setChartWordsAddOn}
          chartSessionOn={chartSessionOn}
          setChartSessionOn={setChartSessionOn}
          chartTimeOn={chartTimeOn}
          setChartTimeOn={setChartTimeOn}
        />
      </div>
    </div>
  );
}
