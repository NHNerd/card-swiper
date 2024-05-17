import React from 'react';

import cssBtn from './Btn.module.css';

import { useUiState } from '../../zustand';

type Props = {
  parrent: 'lol' | 'le';
};

const Btn = ({ parrent }: Props) => {
  const { page, setPage } = useUiState();

  return parrent == 'lol' ? (
    // lol edit
    <button
      className={cssBtn.edit}
      onClick={() => {
        setPage('le');
      }}
    ></button>
  ) : (
    // le edit
    <button
      className={cssBtn.edit + ' ' + cssBtn.le}
      onClick={() => {
        'ce';
      }}
    ></button>
  );
};

export default Btn;
