import React from 'react';

import './Btn.css';

type Props = {
  parrent: 'lol' | 'le';
  type: 'edit' | 'exit' | 'editListName' | 'tick';
  hndlr: any;
  listOrder: number;
  setorderListEdit: any;
};

const Btn = ({ parrent, type, hndlr, listOrder }: Props) => {
  if (parrent == 'lol') {
    return (
      // lol edit
      <button
        className={type}
        onClick={() => {
          hndlr(listOrder);
        }}
      ></button>
    );
  } else if (parrent == 'le' && type == 'editListName') {
    return (
      // le editListName
      <>
        <button
          className='editListName'
          onClick={() => {
            hndlr();
          }}
        ></button>
      </>
    );
  } else if (parrent == 'le' && type == 'tick') {
    return (
      // le editListName
      <>
        <button
          className='tick'
          onClick={() => {
            hndlr();
          }}
        ></button>
      </>
    );
  } else
    return (
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
