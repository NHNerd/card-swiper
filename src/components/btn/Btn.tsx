import React from 'react';

import './Btn.css';

import { useUiState } from '../../zustand';

type Props = {
  parrent: 'lol' | 'le';
  type: 'edit' | 'exit';
};

const Btn = ({ parrent, type }: Props) => {
  const { page, setPage } = useUiState();

  return parrent == 'lol' ? (
    // lol edit
    <button
      className={type}
      onClick={() => {
        setPage('le');
      }}
    ></button>
  ) : (
    // le edit
    <button
      className={'edit' + ' btnLe'}
      onClick={() => {
        'ce';
      }}
    ></button>
  );
};

export default Btn;
