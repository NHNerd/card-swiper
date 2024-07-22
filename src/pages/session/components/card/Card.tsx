import React from 'react';
import { useUiState, zustandData } from '../../../../zustand';
import { useScreenSize } from './hooks/screenSize';
import DnD from './hooks/dnd/dnd';

import cssCard from './Card.module.css';

type Props = {
  //! надо задать точнее (may be...)
  ContainerSessionRef: HTMLDivElement;
};

export default function Card({ ContainerSessionRef }: Props) {
  const { page, setPage } = useUiState();
  const { dataZus } = zustandData((state) => state); // Получаем состояние zustandData
  // const { dataZus } = zustandData();

  const cardRef0 = React.useRef<HTMLButtonElement>(null);
  const cardRef1 = React.useRef<HTMLButtonElement>(null);

  // const [gameWords, setGameWords] = React.useState(dataZus[0].words) || [];
  const [gameWords, setGameWords] = React.useState<any[]>([]); // Начальное значение пустой массив

  // refresh gameWords
  React.useEffect(() => {
    if (dataZus && dataZus.length > 0 && dataZus[0].words) {
      setGameWords(dataZus[0].words);
    }
  }, [dataZus]);

  // refresh screen size
  const screenSize = useScreenSize(ContainerSessionRef);

  return (
    <>
      {/* word2  */}
      <DnD ContainerSessionRef={ContainerSessionRef}>
        <button
          className={
            cssCard.card +
            ' ' +
            ' ' +
            cssCard.card2 +
            ' ' +
            (page === 'session' ? cssCard.on : cssCard.off)
          }
        >
          {'statistic statistic'}
        </button>
      </DnD>

      {/* word1 dnd */}
      <DnD ContainerSessionRef={ContainerSessionRef}>
        <button
          className={
            cssCard.card +
            ' ' +
            ' ' +
            cssCard.card1 +
            ' ' +
            (page === 'session' ? cssCard.on : cssCard.off)
          }
        >
          {gameWords[1] ? gameWords[1].word + ' | card1' : 'nothing | card1'}
        </button>
      </DnD>

      {/* word0 dnd */}
      <DnD ContainerSessionRef={ContainerSessionRef}>
        <button
          className={
            cssCard.card +
            ' ' +
            ' ' +
            cssCard.card0 +
            ' ' +
            (page === 'session' ? cssCard.on : cssCard.off)
          }
        >
          {gameWords[0] ? gameWords[0].word + ' | card0' : 'nothing | card0'}
        </button>
      </DnD>
    </>
  );
}
