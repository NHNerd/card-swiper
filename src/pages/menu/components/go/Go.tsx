import React from 'react';

import { useUiState } from '../../../../zustand';

import cssGo from './Go.module.css';

type Props = {};

export default function Go({}: Props) {
  const { page, setPage } = useUiState();

  return (
    <div className={cssGo.wrap + ' ' + (page === 'menu' ? cssGo.on : cssGo.off)}>
      <button id={cssGo.container} onClick={() => setPage('session')}>
        go
      </button>
    </div>
  );
}
