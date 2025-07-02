import React from 'react';
import { useUiState, zustandData } from '../../../../zustand';
import { useScreenSize } from './hooks/screenSize';
import DnD from './hooks/dnd/dnd';

import cssCard from './Card.module.css';

type Props = {
  //! надо задать точнее (may be...)
  ContainerSessionRef: HTMLDivElement;
  gameWords: [];
  know: any;
  time: number;
  dontKnow: number;
  translate: string;
  gameCount: number;
};

export default function Card({ ContainerSessionRef, gameWords, know, dontKnow, translate, gameCount }: Props) {
  const { page, setPage } = useUiState();
  console.log(gameCount);
  // refresh screen size
  const screenSize = useScreenSize(ContainerSessionRef);
  return gameWords.map((item: object, index: number) => (
    <button
      key={index}
      className={`${cssCard.card} ${page === 'session' ? cssCard.on : cssCard.off} ${
        know && gameWords.length - 1 === index ? cssCard.know : ''
      } ${dontKnow && gameWords.length - 1 === index ? cssCard.dontKnow : ''}
      ${translate ? cssCard.translate : cssCard.translateOff}`}
      style={{ rotate: '30px' }}
    >
      {/* //TODO нужно либо сортировать для игры в другом порядке, либо менять логику удаления карт */}
      {translate ? gameWords[index].translate : gameWords[index].word} , {index} - {gameCount} =
      {gameCount - index - 1}
    </button>
  ));
}
