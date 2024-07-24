import React from 'react';
import { useUiState, zustandData } from '../../zustand.ts';
import Card from './components/card/Card.tsx';
import Bar from './components/bar/Bar.tsx';
import DataSession from './components/data/Data.tsx';

import cssSession from './Session.module.css';

type Props = {};

let flagExite = false;
export default function Session({}: Props) {
  const { dataZus } = zustandData((state) => state); // Получаем состояние zustandData

  const { page, setPage } = useUiState();
  const [time, setTime] = React.useState<number>(0);
  const [end, setEnd] = React.useState(false);

  const ContainerSessionRef = React.useRef<HTMLDivElement>(null);

  // const [gameWords, setGameWords] = React.useState(dataZus[0].words) || [];
  const [gameWords, setGameWords] = React.useState<any[]>([]); // Начальное значение пустой массив

  React.useEffect(() => {
    if (page === 'menu') {
      setGameWords(dataZus[0].words);
    }
  }, [page]);
  React.useEffect(() => {
    if (dataZus && dataZus.length > 0 && dataZus[0].words) {
      setGameWords(dataZus[0].words);
    }
  }, [dataZus]);

  React.useEffect(() => {
    if (gameWords.length === 0 && page == 'session') {
      if (flagExite) {
        flagExite = false;
        setEnd(false);
        setPage('menu');
      } else {
        flagExite = true;
      }
    }
  }, [gameWords]);

  return (
    <>
      <div
        ref={ContainerSessionRef}
        id={cssSession.session}
        className={page === 'session' ? cssSession.on : cssSession.off}
      >
        <Bar gameWords={gameWords} />
        <DataSession gameWords={gameWords} time={time} setTime={setTime} end={end} setEnd={setEnd} />
        <Card
          ContainerSessionRef={ContainerSessionRef}
          gameWords={gameWords}
          setGameWords={setGameWords}
          time={time}
        />
      </div>
    </>
  );
}
