import React from 'react';

import timer from './busines/timer.ts';
import { useUiState } from '../../../../zustand.ts';

import cssData from './Data.module.css';

type Props = {
  gameWords: any;
  timeRef: React.MutableRefObject<number>;
  end: boolean;
  combo: number;
};

export default function DataSession({ gameWords, timeRef, end, combo }: Props) {
  const { page } = useUiState();
  const [comboAnime, setComboAnime] = React.useState<string>('comboAnimeOff');
  const timeAnime = React.useRef<string>('timeAnimeOff');
  const [time, setTime] = React.useState<number>(0);

  React.useEffect(() => {
    if (end) return;

    const timeStart = Date.now();

    if (page === 'session' && !end) {
      const intervalId = setInterval(() => {
        timeRef.current = Math.round((Date.now() - timeStart) / 1000);
        timeAnime.current = 'timeAnime';
        setTime(timeRef.current);
        setTimeout(() => {
          timeAnime.current = 'timeAnimeOff';
        }, 250);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (page === 'menu') {
      timeRef.current = 0;
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
          <div className={cssData.time + ' ' + cssData[timeAnime.current]}>{timeRef.current}</div>s
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
