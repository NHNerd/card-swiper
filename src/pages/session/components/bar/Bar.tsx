import React from 'react';

import { useUiState, zustandData } from '../../../../zustand';

import cssBar from './Bar.module.css';

type Props = {};

export default function Bar({}: Props) {
  const { page, setPage } = useUiState();
  const { dataZus } = zustandData();
  // console.log(dataZus[0].words.length);

  return (
    <>
      <div className={cssBar.bar + ' ' + (page === 'session' ? cssBar.on : cssBar.off)}>
        <div className={cssBar.fill}>
          <div className={cssBar.point}></div>
        </div>
      </div>
    </>
  );
}
