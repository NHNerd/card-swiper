import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState } from '../../../../zustand';

import cssForkLe from './ForkLe.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  const { page } = useUiState();

  const addHndlr = () => {
    console.log('Le Add');
  };

  const searchHndlr = () => {
    console.log('Le search');
  };

  // console.log(`le: ${page == 'le' ? true : false}`);
  return (
    <Fork
      isOn={page == 'le' ? true : false}
      leftChild={<div className={cssForkLe.search}> </div>}
      rightChild={<div className={cssForkLe.add}></div>}
      addHndlr={addHndlr}
      searchHndlr={searchHndlr}
      parrent={'le'}
    ></Fork>
  );
}
