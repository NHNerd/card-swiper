import React from 'react';

import timer from './busines/timer.ts';
import { useUiState } from '../../../../zustand.ts';

import cssData from './Data.module.css';

type Props = {
  gameWords: any;
  time: number;
  setTime: (time: number) => void;
  end: boolean;
  combo: number;
};

export default function DataSession({ gameWords, time, setTime, end, combo }: Props) {
  const { page, setPage } = useUiState();
  const [comboAnime, setComboAnime] = React.useState<string>('comboAnimeOff');
  const [timeAnime, setTimeAnime] = React.useState<string>('timeAnimeOff');

  React.useEffect(() => {
    if (end) return;

    const timeStart = Date.now();

    if (page === 'session' && !end) {
      const intervalId = setInterval(() => {
        setTime(Math.round((Date.now() - timeStart) / 1000));

        setTimeAnime('timeAnime');
        setTimeout(() => {
          setTimeAnime('timeAnimeOff');
        }, 250);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (page === 'menu') {
      setTime(0);
    }
  }, [page, end]);

  React.useEffect(() => {
    if (combo !== 0) {
      setComboAnime('comboAnime');
      setTimeout(() => {
        setComboAnime('comboAnimeClear');
      }, 250);
    } else {
      setComboAnime('comboAnimeOff');
    }
  }, [combo]);

  return (
    <>
      <div className={cssData.dataContainer}>
        <div className={cssData.comboWrap}>
          time:
          <div className={cssData.time + ' ' + cssData[timeAnime]}>{time}</div>s
        </div>

        <div className={cssData.comboWrap}>
          combo:
          <div className={cssData[comboAnime]} data-text={combo}>
            {combo}
          </div>
        </div>
      </div>
    </>
  );
}
