import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { putNewList } from '../../../../axios/list';
import { addList, refreshLSAterDB } from '../../../../business/list/addList.ts';
import { useUiState, zustandData } from '../../../../zustand';
import nowDateUTCandOffset from '../../../../handlers/nowDateUTCandOffset.ts';

import cssForkLoL from './ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();

  const [actionStatus, setActionStatus] = React.useState<{ l: boolean; r: boolean }>({
    l: false,
    r: false,
  });

  const addLogicList = (inputRightRef: string, setInputValueR?: React.Dispatch<React.SetStateAction<string>>) => {
    // LS
    const addLs = addList(inputRightRef);
    if (!addLs) return;
    //DZ
    const updatedDataZus = dataZus.map((item: any) => ({
      ...item,
      order: item.order + 1,
    }));

    const createDate = nowDateUTCandOffset();
    const newList = {
      listId: null,
      createDate: createDate,
      listName: inputRightRef,
      order: 0,
      wordCount: 0,
      gameCount: 12,
      sessionCount: 0,
      words: [],
    };
    const newDataZus = [newList, ...updatedDataZus];
    setDataZus(newDataZus);

    // DB
    putNewList(inputRightRef, createDate)
      .then((newListFromDB) => {
        // refresh LS
        refreshLSAterDB(newListFromDB, addLs);
        // refresh DZ (add id)
        newList.listId = newListFromDB._id;
        const newDataZus = [newList, ...updatedDataZus];
        setDataZus(newDataZus);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Clear input
    setInputValueR('');
  };

  return (
    <Fork
      isOn={page == 'lol' ? true : false}
      leftChild={<div className={cssForkLoL.search + (actionStatus.l ? ' ' + cssForkLoL.imgOff : '')}> </div>}
      rightChild={<div className={cssForkLoL.add + (actionStatus.r ? ' ' + cssForkLoL.imgOff : '')}></div>}
      actionStatus={actionStatus}
      setActionStatus={setActionStatus}
      addLogic={addLogicList}
    ></Fork>
  );
}
