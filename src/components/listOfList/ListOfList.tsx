import React from 'react';

import Btn from '../btn/Btn.tsx';

import { data, ListsTS, ListTS } from '../../../public/temp/data.ts';

import { useUiState } from '../../zustand.ts';

import cssList from '../list/List.module.css';
import cssListOfList from './ListOfList.module.css';

type Props = {
  children?: React.ReactNode;
  parrent: 'menu' | 'lol' | 'le';
};

const lists: ListsTS = data.lists;

export default function ListOfList({ children, parrent }: Props) {
  //Zustand
  const { page } = useUiState();

  return Object.entries(lists).map(([listName, listDetails]: [string, ListTS], index: number) => (
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
      <div className={cssListOfList.flopWrap + ' ' + (page !== 'le' ? 'flopOn' : 'flopOff')}>
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
