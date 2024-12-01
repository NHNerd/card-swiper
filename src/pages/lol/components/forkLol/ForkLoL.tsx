import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { putNewList } from '../../../../axios/list';
import { addList, refreshLSAterDB } from '../../../../business/list/addList.ts';
import { useUiState, zustandData } from '../../../../zustand';

import cssForkLoL from './ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
  // тут как раз я буду его кастомизировать

  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();

  const [actionStatus, setActionStatus] = React.useState<{ l: boolean; r: boolean }>({
    l: false,
    r: false,
  });

  const addLogicList = (inputRightRef) => {
    // LS
    const addLs = addList(inputRightRef.value);

    if (!addLs) return;
    // DB
    putNewList(inputRightRef.value)
      .then((newListFromDB) => {
        // refresh LS
        refreshLSAterDB(newListFromDB, addLs);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    //DZ
    const updatedDataZus = dataZus.map((item) => ({
      ...item,
      order: item.order + 1,
    }));

    const newList = {
      listName: inputRightRef.value,
      order: 0,
      wordCount: 0,
      gameCount: 12,
      words: [],
    };

    // Создаем новый массив, добавляя элемент в начало
    const newDataZus = [newList, ...updatedDataZus];
    console.log(newDataZus);
    //! 11.25.2024 Сейчас устанавливается пердыдущее состояние из dataZus
    setDataZus(newDataZus); // Передаем новый массив
  };

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
      addLogic={addLogicList}
    ></Fork>
  );
}
