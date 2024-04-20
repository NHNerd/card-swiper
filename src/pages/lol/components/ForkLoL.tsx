import React from 'react';

import Fork from '../../../components/fork/Fork';

import cssForkLoL from './ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  // тут как раз я буду его кастомизировать
  return (
    <Fork
      leftChild={<div className={cssForkLoL.search}> </div>}
      rightChild={<div className={cssForkLoL.add}></div>}
    ></Fork>
  );
}
