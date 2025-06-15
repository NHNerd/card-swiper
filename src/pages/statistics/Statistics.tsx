import React from 'react';

import Chart from './components/chart/Chart';
import BriefStatistic from './components/briefStatistic/BriefStatistic';
import FullStatistic from './components/fullStatistic/FullStatistic';
import BtnArrow from '../../components/btnArrow/BtnArrow';
import { useUiState } from '../../zustand';
import cssStatistics from './Statistics.module.css';

type Props = {
  statistic: any;
  wordAddedUpdated: Date;
};

export default function Statistics({ statistic, wordAddedUpdated }: Props) {
  const { page, setPage } = useUiState();

  const [chartWordsAddOn, setChartWordsAddOn] = React.useState<boolean>(false);
  const [chartWordsRepOn, setChartWordsRepOn] = React.useState<boolean>(true);
  const [chartSessionOn, setChartSessionOn] = React.useState<boolean>(false);
  const [chartTimeOn, setChartTimeOn] = React.useState<boolean>(false);

  const [wordAddClc, setWordAddClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });
  const [wordsRepClc, setWordsRepClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });
  const [sessionClc, setSessionClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });
  const [timeClc, setTimeClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });
  const [knowPrsntClc, setKnowPrsntClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });
  const [sessionAvgClc, setSessionAvgClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });
  const [comboAvgClc, setComboAvgClc] = React.useState<object>({ w: 0, m: 0, y: 0, all: 0 });

  const [daysOfActivity, setDaysOfActivity] = React.useState<number>(0);
  const [totalDaysFromStart, setTotalDaysFromStart] = React.useState<number>(0);

  const [timeRange, setTimeRange] = React.useState<'w' | 'm' | 'y' | 'all'>('w');

  const btnArrowHndlr = () => {
    console.log('btnArrowHndl');
    setPage('statistics');
  };

  React.useEffect(() => {
    if (page === 'menu') {
      setChartWordsAddOn(false);
      setChartWordsRepOn(true);
      setChartSessionOn(false);
      setChartTimeOn(false);

      setTimeRange('w');
    }
  }, [page]);

  return (
    <div className={`${cssStatistics.container} ${page === 'menu' ? cssStatistics.saturate : ''}`}>
      <Chart
        chartWordsRepOn={chartWordsRepOn}
        setChartWordsRepOn={setChartWordsRepOn}
        chartWordsAddOn={chartWordsAddOn}
        setChartWordsAddOn={setChartWordsAddOn}
        chartSessionOn={chartSessionOn}
        setChartSessionOn={setChartSessionOn}
        chartTimeOn={chartTimeOn}
        setChartTimeOn={setChartTimeOn}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        setWordAddClc={setWordAddClc}
        setWordsRepClc={setWordsRepClc}
        setSessionClc={setSessionClc}
        setTimeClc={setTimeClc}
        setKnowPrsntClc={setKnowPrsntClc}
        setSessionAvgClc={setSessionAvgClc}
        setComboAvgClc={setComboAvgClc}
        statistic={statistic}
        setDaysOfActivity={setDaysOfActivity}
        setTotalDaysFromStart={setTotalDaysFromStart}
        wordAddedUpdated={wordAddedUpdated}
      />

      <div className={`${cssStatistics.opacity} ${page === 'menu' ? '' : cssStatistics.opacityOff}`}>
        <BriefStatistic wordsRepClc={wordsRepClc} />
      </div>
      <div className={`${cssStatistics.opacity} ${page === 'statistics' ? '' : cssStatistics.opacityOff}`}>
        <FullStatistic
          page={page}
          timeRange={timeRange}
          wordAddClc={wordAddClc}
          wordsRepClc={wordsRepClc}
          sessionClc={sessionClc}
          timeClc={timeClc}
          knowPrsntClc={knowPrsntClc}
          sessionAvgClc={sessionAvgClc}
          comboAvgClc={comboAvgClc}
          daysOfActivity={daysOfActivity}
          totalDaysFromStart={totalDaysFromStart}
        />
      </div>
      <div
        className={`${cssStatistics.BtnArrowContainer} ${
          page === 'statistics' ? cssStatistics.BtnArrowContainerToStatistic : ''
        } ${page === 'menu' ? '' : cssStatistics.BtnArrowContainerOff}`}
      >
        <BtnArrow onClick={btnArrowHndlr} direct='bottom' />
      </div>
    </div>
  );
}
