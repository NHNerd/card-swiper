import React, { useEffect } from 'react';
import { useUiState, zustandData } from '../../../../zustand';

import cssLastCard from './LastCard.module.css';

type Props = {
  wordStatus: object[];
  statusEnd;
  maxCombo: number;
  end: boolean;
  //! надо задать точнее (may be...)
};

export default function LastCard({ wordStatus, statusEnd, maxCombo, end }: Props) {
  const { page, setPage } = useUiState();

  return (
    <button
      className={`${cssLastCard.card} ${page === 'session' ? cssLastCard.on : cssLastCard.off}  ${
        end ? cssLastCard.sessionEnd : ''
      }  `}
    >
      <div className={cssLastCard.fasterContainer}>
        know:
        <div className={cssLastCard.green}>{statusEnd.know}</div>/
        <div className={cssLastCard.red}>{statusEnd.dontKnow}</div>
      </div>
      <div className={cssLastCard.fasterContainer}>
        faster: <div className={`${cssLastCard.green}`}>X</div> s
      </div>
      <div>combo max: {maxCombo}</div>
    </button>
  );
}
