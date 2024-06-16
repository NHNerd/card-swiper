import React from 'react';

import Btn from '../btn/Btn.tsx';

import { ListTS } from '../../../public/temp/data.ts';

import { useUiState } from '../../zustand.ts';

import cssList from '../list/List.module.css';
import cssListOfList from './ListOfList.module.css';

type Props = {
  children?: React.ReactNode;
  parrent: 'menu' | 'lol' | 'le';
};

// console.log(Object.entries(lists)[0]);

export default function ListOfList({ children, parrent }: Props) {
  //Zustand
  const { page, dataZus } = useUiState();
  const [dataFresh, setDataFresh] = React.useState(dataZus);
  // console.log(dataNew[0]);

  const selectList = (listName, listDetails) => {
    // console.log(listName);
    // console.log(listDetails.order);
    //TODO add changing for order
    //TODO refresh zustand, in the end
    const delited = dataFresh.splice(listDetails.order, 1);
    const dataNew = [...dataFresh];
    dataNew.unshift(...delited);

    setDataFresh(dataNew);
  };

  return dataFresh.map(([listName, listDetails]: [string, ListTS], index: number) => (
    <section
      key={index}
      className={
        cssList.containerList +
        ' ' +
        (page !== 'le' ? cssList.lolHeight + ' ' + cssList.lolMinHeight : cssList.leHeight + ' ')
      }
    >
      <Btn parrent='lol' type='exit' />
      <Btn parrent='lol' type='edit' />
      <div
        onClick={() => selectList(listName, listDetails)}
        className={cssListOfList.flopWrap + ' ' + (page !== 'le' ? 'flopOn' : 'flopOff')}
      >
        <h1 className={cssListOfList.h1}>
          {listName}
          {children}
        </h1>
        <h2 className={cssListOfList.h2}>
          <div className={cssListOfList.h2Text + ' color2'}>word count:</div>
          <div className={cssListOfList.h3Value}>{Object.keys(listDetails.words).length}</div>
        </h2>
        <h3 className={cssListOfList.h3}>
          <div className={cssListOfList.h3Text + ' color2'}>game count:</div>
          <div className={cssListOfList.h3Value}>{listDetails.gameCount}</div>
        </h3>
        {/* <div
          className={
            cssListOfList.line + ' bg-color3' + (parrent === 'menu' ? ' ' + cssList.lineMenu : '')
          }
        ></div> */}
      </div>
    </section>
  ));
}
