import React from 'react';

import sccBtnback from './Btnback.module.css';

import { useUiState } from '../../zustand';

type Props = {};

const Btnback = (props: Props) => {
  const { page, setPage } = useUiState();

  return (
    <button
      className={sccBtnback.back}
      onClick={() => {
        setPage('lol');
      }}
    ></button>
  );
};

export default Btnback;
