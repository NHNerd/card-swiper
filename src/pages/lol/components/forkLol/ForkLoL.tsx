import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState } from '../../../../zustand';

import cssForkLoL from './ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  // тут как раз я буду его кастомизировать

  const { page } = useUiState();

  return (
    <Fork
      isOn={page !== 'le' ? true : false}
      leftChild={<div className={cssForkLoL.search}> </div>}
      rightChild={<div className={cssForkLoL.add}></div>}
    ></Fork>
  );
}
