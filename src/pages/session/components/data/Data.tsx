import React from 'react';

import timer from './busines/timer.ts';
import { useUiState, zustandData } from '../../../../zustand.ts';

import cssData from './Data.module.css';

type Props = {
  gameWords: any;
  time: number;
  setTime: (time: number) => void;
  end: boolean;
  setEnd: (end: booleans) => void;
};

export default function DataSession({ gameWords, time, setTime, end, setEnd }: Props) {
  const { page, setPage } = useUiState();
  //   const [end, setEnd] = React.useState(false);
  //   const { dataZus } = zustandData();

  React.useEffect(() => {
    if (gameWords.length === 0 && page === 'session' && !end) {
      setEnd(true);
      console.log('Sessia is ended, now you see statistic');
    }
  }, [gameWords]);

  React.useEffect(() => {
    const timeStart = Date.now();

    if (page === 'session' && !end) {
      const intervalId = setInterval(() => {
        setTime(Math.round((Date.now() - timeStart) / 1000));
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (page === 'menu') {
      setTime(0);
    }
  }, [page, end]);

  return (
    <>
      <div className={cssData.dataContainer}>
        <div className={cssData.time}>time: {time}s</div>
      </div>
    </>
  );
}
