import React from 'react';
import ChartBtn from './pieces/chartBtn/ChartBtn';

import { timeRangeSwitch } from './hndlrs/timeRangeSwitch';
import { y2Calc } from './hndlrs/math';
import { dotDay } from './pieces/dotDay';
import { processingDate, daysForEach } from './business/business';
import wmyFirstLastISO from './hndlrs/wmyFirstLastISO';
import monthDayLetters from './hndlrs/monthDayLetters';
import { useUiState } from '../../../../zustand';
import { ClcData } from '../../types';
import { getStatistic } from '../../../../axios/statistic';
import { DayStats } from '../../types';
import dateToLocalUtcOffset from '../../../../handlers/dateToLocalUtcOffset.ts';
import BtnArrow from '../../../../components/btnArrow/BtnArrow.tsx';

import cssChart from './Chart.module.css';
import cssStatistics from '../../Statistics.module.css';

const headerRangeHndlr = (first: string | null, last: string | null) => {
  if (!first || !last) return null;
  return first.replace(/-/g, '.') + ' - ' + last.replace(/-/g, '.');
};

const difDays = (start: string | null, end: string | null) => {
  if (!start || !end) return 0;

  const difSec = new Date(end).getTime() - new Date(start).getTime();
  return Math.round(difSec / (1000 * 60 * 60 * 24));
};

const weekScroller = (date, offsetWeeks) => {
  const inputDate = new Date(date);

  // День недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
  const day = inputDate.getDay();

  // Смещаем на понедельник (если неделя начинается с понедельника)
  const diffToMonday = day === 0 ? -6 : 1 - day;

  // Смещаем к началу нужной недели
  inputDate.setDate(inputDate.getDate() + diffToMonday + offsetWeeks * 7);

  inputDate.setHours(0, 0, 0, 0);

  const startWeekScroll = dateToLocalUtcOffset(inputDate);

  const endWeekScroll = new Date(startWeekScroll);
  endWeekScroll.setDate(new Date(startWeekScroll).getDate() + 6);
  endWeekScroll.setHours(0, 0, 0, 0);

  return { startWeekScroll: startWeekScroll, endWeekScroll: dateToLocalUtcOffset(endWeekScroll) };
};

const monthScroller = (date, offsetMonths) => {
  const inputDate = new Date(date);

  // Смещаем месяц
  inputDate.setMonth(inputDate.getMonth() + offsetMonths);

  // Устанавливаем на первое число месяца
  inputDate.setDate(1);
  inputDate.setHours(0, 0, 0, 0);

  const startMonthScroll = dateToLocalUtcOffset(inputDate);

  // Получаем конец месяца
  const endMonthScroll = new Date(startMonthScroll);
  endMonthScroll.setMonth(endMonthScroll.getMonth() + 1);
  endMonthScroll.setDate(0); // 0-й день следующего месяца = последний день текущего
  endMonthScroll.setHours(0, 0, 0, 0);

  return { startMonthScroll, endMonthScroll: dateToLocalUtcOffset(endMonthScroll) };
};

type RefsType = {
  data: any;
  days: DayStats[] | null;
  firstDate: string | null;
  lastDate: string;
  daysCount: number;
  weekStart: string;
  weekEnd: string;
  monthStart: string;
  monthEnd: string;
  yearStart: string;
  yearEnd: string;
  chartRange: number;
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
  statistic: any;
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
  statistic,
}: Props) {
  const { page, setPage } = useUiState();

  const [statisticFromDB, setStatisticFromDB] = React.useState(null);
  const [dayLettersTSX, setDayLettersTSX] = React.useState<any[]>([]);
  const [linesTSX, setLinesTSX] = React.useState<any[]>([]);
  const [circlesTSX, setCirclesTSX] = React.useState<any[]>([]);
  const [headerRange, setHeaderRange] = React.useState<string | null>('2000-01-01');
  const [step, setStep] = React.useState<number>(18);
  const [year, setYear] = React.useState<string>('2025');
  const [scrollRangeOffset, setScrollRangeOffset] = React.useState<number>(0);

  const ChartDataRef = React.useRef<{
    wordsAdd: number[];
    wordsRep: number[];
    session: number[];
    time: number[];
    wordsAdd12month: Record<string, number[]>;
    wordsRep12month: Record<string, number[]>;
    session12month: Record<string, number[]>;
    time12month: Record<string, number[]>;
  }>({
    wordsAdd: [],
    wordsRep: [],
    session: [],
    time: [],
    wordsAdd12month: {},
    wordsRep12month: {},
    session12month: {},
    time12month: {},
  });

  const Refs = React.useRef<RefsType>({
    data: [],
    days: [],
    firstDate: '',
    lastDate: dateToLocalUtcOffset(new Date()),
    daysCount: 0,
    weekStart: '',
    weekEnd: '',
    monthStart: '',
    monthEnd: '',
    yearStart: '',
    yearEnd: '',
    chartRange: 7,
  });

  const sliceSumIsNotNUllRef = React.useRef<{
    add: boolean;
    rep: boolean;
    session: boolean;
    time: boolean;
  }>({ add: false, rep: false, session: false, time: false });

  const wordsAddSliceRef = React.useRef<number[]>([]);
  const wordsRepSliceRef = React.useRef<number[]>([]);
  const sessionSliceRef = React.useRef<number[]>([]);
  const timeSliceRef = React.useRef<number[]>([]);

  const dayLettersRef = React.useRef<string[]>(['M', 'T', 'W', 'T', 'F', 'S', 'S']);

  //TODO it's must return () => return <div...
  const maxValRef = React.useRef<any>(() => <div>0</div>);

  const lineWidth: number = 2;

  // Get DB, then calc
  React.useEffect(() => {
    const fetchData = async () => {
      if (statistic.length === 0) Refs.current.data = await getStatistic();
      else {
        Refs.current.data[0] = statistic;
      }

      const result = processingDate(Refs.current.data);
      const range = wmyFirstLastISO(result.lastDate);

      Refs.current = {
        data: Refs.current.data,
        ...result,
        ...range,
        chartRange: 7,
      };

      const { days, firstDate, daysCount, weekStart, monthStart, yearStart } = Refs.current;

      //? filling empty days
      const culcStatistic = daysForEach(
        ChartDataRef.current.wordsAdd,
        ChartDataRef.current.wordsRep,
        ChartDataRef.current.session,
        ChartDataRef.current.time,
        ChartDataRef.current.wordsAdd12month,
        ChartDataRef.current.wordsRep12month,
        ChartDataRef.current.session12month,
        ChartDataRef.current.time12month,
        days,
        firstDate,
        daysCount,
        weekStart,
        monthStart,
        yearStart,
        result.lastDate
      );

      const setData = (setData: any, data: ClcData) =>
        setData({ w: data.w, m: data.m, y: data.y, all: data.all });

      setData(setWordAddClc, culcStatistic.wordAddClc);
      setData(setWordsRepClc, culcStatistic.wordsRepClc);
      setData(setSessionClc, culcStatistic.sessionClc);
      setData(setTimeClc, culcStatistic.timeClc);
      setData(setKnowPrsntClc, culcStatistic.knowPrsntClc);
      setData(setSessionAvgClc, culcStatistic.sessionAvgClc);
      setData(setComboAvgClc, culcStatistic.comboAvgClc);

      setStatisticFromDB(Refs.current.data);
    };

    fetchData();
  }, [statistic]);

  React.useEffect(() => {
    if (!statisticFromDB) return;

    const { firstDate, lastDate, daysCount, weekStart, weekEnd, monthStart, monthEnd, yearStart, yearEnd } =
      Refs.current;

    let rangeOffset = Refs.current.chartRange - 1 - difDays(weekStart, lastDate);

    // w | m | y | all
    if (timeRange === 'w') {
      Refs.current.chartRange = 7;
      rangeOffset = Refs.current.chartRange - 1 - difDays(weekStart, lastDate);
      dayLettersRef.current = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const { startWeekScroll, endWeekScroll } = weekScroller(weekStart, -scrollRangeOffset / 7);
      setHeaderRange(headerRangeHndlr(startWeekScroll, endWeekScroll));
    } else if (timeRange === 'm') {
      Refs.current.chartRange = Number(monthEnd.slice(8));
      rangeOffset = Refs.current.chartRange - 1 - difDays(monthStart, lastDate);
      //? I can show через 1 или 2 like: 1, 3, 5 || 1, 4, 7, 10
      dayLettersRef.current = monthDayLetters(lastDate);
      setHeaderRange(headerRangeHndlr(monthStart, monthEnd));
    } else if (timeRange === 'y') {
      Refs.current.chartRange = 12;
      //! For year need uniq array with 12 culc mounth
      rangeOffset =
        Refs.current.chartRange - 2 - (Number(new Date(lastDate).getMonth()) - Number(yearStart.slice(5, 7)));
      dayLettersRef.current = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
      setHeaderRange(headerRangeHndlr(yearStart, yearEnd));
    } else if (timeRange === 'all') {
      Refs.current.chartRange = daysCount;
      rangeOffset = 0;
      //? I can shwo a few🤔🤔🤔
      dayLettersRef.current = [''];
      setHeaderRange(headerRangeHndlr(firstDate, lastDate));
    }

    const stepConst = 100 / (Refs.current.chartRange - 1);
    setStep(stepConst);

    // console.log(
    //   ChartDataRef.current.wordsRep.slice(
    //     ChartDataRef.current.wordsRep.length - Refs.current.chartRange + rangeOffset - scrollRangeOffset,
    //     ChartDataRef.current.wordsRep.length - (scrollRangeOffset - rangeOffset)
    //   )
    // );
    const sliceHndlr = (words: number[]) =>
      words.slice(
        ChartDataRef.current.wordsRep.length - Refs.current.chartRange + rangeOffset - scrollRangeOffset,
        ChartDataRef.current.wordsRep.length - (scrollRangeOffset - rangeOffset)
      );

    wordsAddSliceRef.current = sliceHndlr(ChartDataRef.current.wordsAdd);
    wordsRepSliceRef.current = sliceHndlr(ChartDataRef.current.wordsRep);
    sessionSliceRef.current = sliceHndlr(ChartDataRef.current.session);
    timeSliceRef.current = sliceHndlr(ChartDataRef.current.time);

    const isSliceSumNotNull = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0) !== 0;
    sliceSumIsNotNUllRef.current = {
      add: isSliceSumNotNull(wordsAddSliceRef.current),
      rep: isSliceSumNotNull(wordsRepSliceRef.current),
      session: isSliceSumNotNull(sessionSliceRef.current),
      time: isSliceSumNotNull(timeSliceRef.current),
    };

    const maxIndexFunc = (array: number[]) => {
      return array.reduce((maxIdx, current, idx, arr) => {
        return current > arr[maxIdx] ? idx : maxIdx;
      }, 0);
    };
    const MaxValArray = [
      maxIndexFunc(wordsAddSliceRef.current),
      maxIndexFunc(wordsRepSliceRef.current),
      maxIndexFunc(sessionSliceRef.current),
      maxIndexFunc(timeSliceRef.current),
    ];

    const arrayMargin = [0, 0, 0, 0];
    const MaxValArraySet = new Set(MaxValArray);
    const MaxValArraySetIndex = Array.from(MaxValArraySet);

    MaxValArray.map((item, i) => {
      if (item !== MaxValArraySetIndex[i])
        arrayMargin[i] = (arrayMargin[1] ? 1 : 0) + (arrayMargin[2] ? 1 : 0) + 1;
    });

    maxValRef.current = (
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

    // console.log(wordsRepSliceRef.current);

    // First Time Render - statisticFromDB
    // Change chart range Re:Render - timeRange
    // End of session Re:Render - statistic
  }, [statisticFromDB, timeRange, statistic, scrollRangeOffset]);

  //Update svg when user choise chart  on/off
  React.useEffect(() => {
    // Arr clear
    const linesTSXConst: JSX.Element[] = [];
    const circlesTSXConst: JSX.Element[] = [];
    const dayLettersTSXConst: JSX.Element[] = [];

    const stepConst = 100 / (Refs.current.chartRange - 1);

    const linesAndCircles = (array: number[], color: string, i: number, key: string) => {
      if (array.length > i) {
        const dotMonth = timeRange === 'm' ? (i % 3 === 0 ? 1.5 : 0) : 1;
        circlesTSXConst.push(
          <circle
            key={`${key}${i}`}
            cx={`${i * stepConst}%`}
            cy={`${y2Calc(array, i, lineWidth)}%`}
            r={(lineWidth / 2) * dotMonth}
            fill='#d9d9d9'
            stroke={color}
          />
        );

        if (array.length - 1 > i) {
          linesTSXConst.push(
            <line
              key={`line-${key}${i}`}
              x1={`${i * stepConst}%`}
              y1={`${y2Calc(array, i, lineWidth)}%`}
              x2={`${(i + 1) * stepConst}%`}
              y2={`${y2Calc(array, i + 1, lineWidth)}%`}
              stroke={color}
              opacity={0.7}
            />
          );
        }
      }
    };

    let chartSliceAdd = wordsAddSliceRef.current;
    let chartSliceRep = wordsRepSliceRef.current;
    let chartSliceSession = sessionSliceRef.current;
    let chartSliceRepTime = timeSliceRef.current;
    if (timeRange === 'y') {
      chartSliceAdd = ChartDataRef.current.wordsAdd12month[year];
      chartSliceRep = ChartDataRef.current.wordsRep12month[year];
      chartSliceSession = ChartDataRef.current.session12month[year];
      chartSliceRepTime = ChartDataRef.current.time12month[year];
    } else {
      chartSliceAdd = wordsAddSliceRef.current;
      chartSliceRep = wordsRepSliceRef.current;
      chartSliceSession = sessionSliceRef.current;
      chartSliceRepTime = timeSliceRef.current;
    }

    for (let i = 0; i < Refs.current.chartRange; i++) {
      if (sliceSumIsNotNUllRef.current.add && chartWordsAddOn)
        linesAndCircles(chartSliceAdd, 'var(--wordsAdded-btnSttstc-color)', i, 'add-');
      if (sliceSumIsNotNUllRef.current.rep && chartWordsRepOn)
        linesAndCircles(chartSliceRep, 'var(--session-btnSttstc-color)', i, 'rep-');
      if (sliceSumIsNotNUllRef.current.session && chartSessionOn)
        linesAndCircles(chartSliceSession, 'var(--wordsRep-btnSttstc-color)', i, 'session-');
      if (sliceSumIsNotNUllRef.current.time && chartTimeOn)
        linesAndCircles(chartSliceRepTime, 'var(--time-btnSttstc-color)', i, 'time-');

      dayLettersTSXConst.push(
        <div
          key={`dayLetter-${i}`}
          className={`${cssChart.dayLetter}`}
          style={{
            left: `${i * stepConst}%`,
            color: `${i === chartSliceAdd.length - 1 ? '#d9d9d9' : '#d9d9d983'}`,
            textShadow: `${i === chartSliceAdd.length - 1 ? 'rgb(255, 255, 255) 0px 0 1px' : ''}`,
          }}
        >
          {dayLettersRef.current[i]}
        </div>
      );
    }

    setDayLettersTSX(dayLettersTSXConst);
    setLinesTSX(linesTSXConst);
    setCirclesTSX(circlesTSXConst);
  }, [
    statisticFromDB,
    statistic,
    timeRange,
    year,
    scrollRangeOffset,
    chartWordsAddOn,
    chartWordsRepOn,
    chartSessionOn,
    chartTimeOn,
  ]);

  const sceletonOrChart = () => {
    if (statisticFromDB) {
      return (
        <>
          <svg width='100%' height='100%' strokeWidth={lineWidth} strokeLinecap='round'>
            {...linesTSX}
            {...circlesTSX}
          </svg>

          {dotDay(
            wordsAddSliceRef.current,
            'var(--wordsAdded-btnSttstc-color)',
            chartWordsAddOn,
            step,
            lineWidth
          )}
          {dotDay(wordsRepSliceRef.current, 'var(--session-btnSttstc-color)', chartWordsRepOn, step, lineWidth)}
          {dotDay(sessionSliceRef.current, 'var(--wordsRep-btnSttstc-color)', chartSessionOn, step, lineWidth)}
          {dotDay(timeSliceRef.current, 'var(--time-btnSttstc-color)', chartTimeOn, step, lineWidth)}

          {maxValRef.current(
            wordsAddSliceRef.current,
            'var(--wordsAdded-btnSttstc-color)',
            chartWordsAddOn,
            '',
            0
          )}
          {maxValRef.current(wordsRepSliceRef.current, 'var(--session-btnSttstc-color)', chartWordsRepOn, '', 1)}
          {maxValRef.current(sessionSliceRef.current, 'var(--wordsRep-btnSttstc-color)', chartSessionOn, '', 2)}
          {/* //TODO use FullSatatistic func sec => dd:hh:mm:ss */}
          {maxValRef.current(timeSliceRef.current, 'var(--time-btnSttstc-color)', chartTimeOn, 's.', 3)}
        </>
      );
    } else {
      return (
        <div className={cssChart.skeleton}>
          loading
          <div className={cssChart.skeletonDot1}>.</div>
          <div className={cssChart.skeletonDot2}>.</div>
          <div className={cssChart.skeletonDot3}>.</div>
        </div>
      );
    }
  };

  const chartBtnsHndlr = (dirrection: string) => {
    if (timeRange === 'y') {
      let yearFresh: string;
      if (dirrection === 'left') {
        console.log('left y');

        yearFresh = String(Number(year) - 1);
        if (Number(Refs.current.firstDate?.slice(0, 4)) > Number(yearFresh))
          yearFresh = Refs.current.lastDate?.slice(0, 4) || '0';

        setYear(yearFresh);
      } else {
        console.log('right y');
        yearFresh = String(Number(year) + 1);
        if (Number(Refs.current.lastDate?.slice(0, 4)) < Number(yearFresh))
          yearFresh = Refs.current.firstDate?.slice(0, 4) || '0';

        setYear(yearFresh);
      }

      setHeaderRange(`${yearFresh}.01.01 - ${yearFresh}.12.31`);
    } else if (timeRange === 'w') {
      if (dirrection === 'left') {
        //! нет ограничителя в скроле назад
        setScrollRangeOffset((prev) => prev + 7);
        console.log('left w');
      } else {
        setScrollRangeOffset((prev) => Math.max(prev - 7, 0));
        console.log('right w');
      }
    } else if (timeRange === 'm') {
      //TODO
    }
  };

  return (
    <div className={`${cssChart.container}`}>
      <header className={`${cssChart.timeRange} ${page !== 'statistics' ? cssChart.timeRangeOff : ''}`}>
        {headerRange}
        <button onClick={() => timeRangeSwitch(timeRange, setTimeRange)} className={`${cssChart.timeSwitch} `}>
          {timeRange}.
        </button>
      </header>

      <div className={timeRange === 'all' || page !== 'statistics' ? cssChart.btnArrowOff : ''}>
        <BtnArrow onClick={() => chartBtnsHndlr('left')} direct='left' />
      </div>

      <section
        className={`${cssChart.miniChart} ${
          page === 'menu' || page === 'statistics' || page === 'settings' ? '' : cssChart.miniChartOff
        }`}
      >
        {sceletonOrChart()}

        {...dayLettersTSX}
      </section>

      <div className={timeRange === 'all' || page !== 'statistics' ? cssChart.btnArrowOff : ''}>
        <BtnArrow onClick={() => chartBtnsHndlr('right')} direct='right' />
      </div>

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
          sliceSumIsNotNUllRef={sliceSumIsNotNUllRef}
        />
      </div>
    </div>
  );
}
