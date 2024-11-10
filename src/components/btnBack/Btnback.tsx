import React from 'react';

import sccBtnback from './Btnback.module.css';

import { useUiState } from '../../zustand';

type Props = {};

const Btnback = (props: Props) => {
  const { page, setPage } = useUiState();

  return (
    <button
      className={`${sccBtnback.back} ${page === 'le' || page === 'edit' ? '' : sccBtnback.off}`}
      onClick={() => {
        setPage('lol');
      }}
    >
      <div className={sccBtnback.image}></div>
    </button>
  );
};

export default Btnback;
