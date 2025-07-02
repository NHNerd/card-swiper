import React from 'react';
import { useUiState, zustandData } from '../../../../zustand';
import { useScreenSize } from './hooks/screenSize';
import DnD from '../../dnd/dnd';

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
//
const Card = React.memo(({ ContainerSessionRef, gameWords, know, dontKnow, translate, gameCount }: Props) => {
  const { page, setPage } = useUiState();

  const answer = (index: number): 'know' | 'dontKnow' | '' => {
    if (index !== gameWords.length - 1) return '';
    if (know) return 'know';
    if (dontKnow) return 'dontKnow';
    return '';
  };

  // refresh screen size
  const screenSize = useScreenSize(ContainerSessionRef);
  return gameWords.map((card: object, index: number) => (
    <DnD key={index} screenSize={screenSize}>
      <button className={`${cssCard.card} ${cssCard[answer(index)]}`}>{card.word}</button>
    </DnD>
  ));
});

export default Card;
