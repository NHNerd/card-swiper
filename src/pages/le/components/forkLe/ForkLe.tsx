import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState } from '../../../../zustand';

import cssForkLe from './ForkLe.module.css';
//TODO find property place for css for 2 pages
import cssForkLoL from '../../../lol/components/forkLol/ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  const { page } = useUiState();
  const [actionStatus, setActionStatus] = React.useState<{ l: boolean; r: boolean }>({
    l: false,
    r: false,
  });

  return (
    <Fork
      isOn={page == 'le' ? true : false}
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
