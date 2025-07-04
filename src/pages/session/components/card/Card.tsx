import React from 'react';
import { useUiState, zustandData } from '../../../../zustand';
import { useScreenSize } from './hooks/screenSize';
import DnD from '../../dnd/dnd';

import cssCard from './Card.module.css';

type Props = {
  //! надо задать точнее (may be...)
  ContainerSessionRef: HTMLDivElement;
  gameWords: any[];
  know: any;
  time: number;
  dontKnow: number;
  setKnow: React.Dispatch<React.SetStateAction<boolean>>;
  setDontKnow: React.Dispatch<React.SetStateAction<boolean>>;
  translate: boolean;
  setTranslate: React.Dispatch<React.SetStateAction<boolean>>;
  gameCount: number;
  hndlrKnow: (timeOut: number) => void;
  hndlrDontKnow: (timeOut: number) => void;
};

const Card = React.memo(
  ({
    ContainerSessionRef,
    gameWords,
    know,
    dontKnow,
    setKnow,
    setDontKnow,
    translate,
    setTranslate,
    gameCount,
    hndlrKnow,
    hndlrDontKnow,
  }: Props) => {
    const { page, setPage } = useUiState();

    const clickDate = React.useRef(new Date().getTime());

    const answer = (index: number): 'know' | 'dontKnow' | '' => {
      if (index !== gameWords.length - 1) return '';
      if (know) return 'know';
      if (dontKnow) return 'dontKnow';
      return '';
    };

    const screenSize = useScreenSize(ContainerSessionRef);

    return gameWords.map((card: object, index: number) => {
      const isTop = index === gameWords.length - 1;

      return (
        <DnD
          key={index}
          screenSize={screenSize}
          hndlrKnow={hndlrKnow}
          hndlrDontKnow={hndlrDontKnow}
          isTop={isTop}
        >
          <button
            onClick={() => {
              const now = new Date().getTime();
              if (now - clickDate.current < 230 && isTop) {
                setTranslate(!translate);
              }
              clickDate.current = now;
            }}
            className={`${cssCard.card} ${cssCard[answer(index)]} ${
              isTop && translate ? cssCard.transtale : cssCard.transtaleOff
            }`}
            style={{ '--rotateY': `${(Math.random() - 0.5) * 180}deg` }}
          >
            {translate && isTop ? card.translate : card.word}
          </button>
        </DnD>
      );
    });
  }
);

export default Card;
