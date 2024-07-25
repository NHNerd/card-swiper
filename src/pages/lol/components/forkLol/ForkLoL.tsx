import React, { useEffect } from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState } from '../../../../zustand';

import cssForkLoL from './ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  // тут как раз я буду его кастомизировать

  const { page } = useUiState();
  const [actionStatus, setActionStatus] = React.useState<{ l: boolean; r: boolean }>({
    l: false,
    r: false,
  });

  return (
    <Fork
      isOn={page == 'lol' ? true : false}
      leftChild={
        <div className={cssForkLoL.search + (actionStatus.l ? ' ' + cssForkLoL.imgOff : '')}> </div>
      }
      rightChild={
        <div className={cssForkLoL.add + (actionStatus.r ? ' ' + cssForkLoL.imgOff : '')}></div>
      }
      actionStatus={actionStatus}
      setActionStatus={setActionStatus}
    ></Fork>
  );
}
