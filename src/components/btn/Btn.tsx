import React from 'react';

import './Btn.css';

type Props = {
  parrent: 'lol' | 'le';
  type: 'edit' | 'exit';
  hndlr: any;
  listOrder: any;
  setorderListEdit: any;
};

const Btn = ({ parrent, type, hndlr }: Props) => {
  return parrent == 'lol' ? (
    // lol edit
    <button
      className={type}
      onClick={() => {
        hndlr();
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
