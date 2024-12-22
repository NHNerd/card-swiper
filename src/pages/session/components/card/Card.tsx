import React from 'react';
import { useUiState, zustandData } from '../../../../zustand';
import { useScreenSize } from './hooks/screenSize';
import DnD from './hooks/dnd/dnd';

import cssCard from './Card.module.css';

type Props = {
  //! надо задать точнее (may be...)
  ContainerSessionRef: HTMLDivElement;
  gameWords: [];
  setGameWords: any;
  time: number;
};

export default function Card({
  ContainerSessionRef,
  gameWords,
  setGameWords,
  time,
  know,
  dontKnow,
  translate,
}: Props) {
  const { page, setPage } = useUiState();

  // refresh screen size
  const screenSize = useScreenSize(ContainerSessionRef);
  return gameWords.map((item: object, index: number) => (
    <button
      key={index}
      className={`${cssCard.card} ${page === 'session' ? cssCard.on : cssCard.off} ${
        know && gameWords.length - 1 === index ? cssCard.know : ''
      } ${dontKnow && gameWords.length - 1 === index ? cssCard.dontKnow : ''}
      ${translate ? cssCard.translate : cssCard.translateOff}`}
    >
      {translate ? gameWords[index].translate : gameWords[index].word}
    </button>
  ));
}
