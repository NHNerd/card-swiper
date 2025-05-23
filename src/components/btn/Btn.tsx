import React from 'react';

import './Btn.css';

type Props = {
  parrent: 'lol' | 'le' | 'session';
  type:
    | 'edit'
    | 'exit'
    | 'editListName'
    | 'tick'
    | 'editWord'
    | 'word'
    | 'translate'
    | 'exitSession'
    | 'tickSession';

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
  } else if (parrent == 'le' && type == 'editWord') {
    return (
      // le edit
      <button
        className={'edit' + ' btnLe'}
        onClick={() => {
          hndlr();
        }}
      ></button>
    );
  } else if (parrent == 'le' && type == 'exit') {
    return (
      //! lol edit
      <button
        className={type + ' btnLe'}
        onClick={() => {
          hndlr(listOrder);
        }}
      ></button>
    );
  } else if (parrent == 'le' && (type == 'word' || type == 'translate')) {
    return (
      // le edit swithch to word
      <button
        className={type == 'word' ? 'word' : 'translate'}
        onClick={() => {
          hndlr();
        }}
      >
        {type}
      </button>
    );
  } else if (parrent == 'session') {
    return (
      // session tick
      <>
        <button
          className={type}
          onClick={() => {
            hndlr();
          }}
        ></button>
      </>
    );
  }
};

export default Btn;
