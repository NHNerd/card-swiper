import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState } from '../../../../zustand';

import cssForkLoL from './ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  // тут как раз я буду его кастомизировать

  const { page } = useUiState();

  const addHndlr = () => {
    console.log('LoL Add');
  };

  const searchHndlr = () => {
    console.log('LoL search');
  };

  // console.log(`lol: ${page == 'lol' ? true : false}`);

  return (
    <Fork
      isOn={page == 'lol' ? true : false}
      leftChild={<div className={cssForkLoL.search}> </div>}
      rightChild={<div className={cssForkLoL.add}>{/* <input className='test'></input> */}</div>}
      addHndlr={addHndlr}
      searchHndlr={searchHndlr}
      parrent={'lol'}
    ></Fork>
  );
}
