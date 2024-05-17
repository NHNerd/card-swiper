import React from 'react';

import BtnArrow from '../btnArrow/BtnArrow.tsx';
import Btn from '../btn/Btn.tsx';

import { data, ListsTS, ListTS } from '/public/temp/data.ts';
import btnArrowHndlr from './btnArrowHndlr.ts';
import { useUiState } from '../../zustand.ts';

import cssListLoL from './ListLoL.module.css';

type Props = {
  children?: React.ReactNode;
  parrent: 'menu' | 'lol' | 'le';
};

const lists: ListsTS = data.lists;

export default function List({ children, parrent }: Props) {
  //Zustand
  const { page } = useUiState();

  return Object.entries(lists).map(([listName, listDetails]: [string, ListTS], index: number) => (
    <section
      key={index}
      className={cssListLoL.containerList + (parrent === 'menu' ? ' ' + cssListLoL.menu : '')}
    >
      <Btn parrent='lol' />
      <div className={cssListLoL.flopWrap + ' ' + (page == 'lol' ? 'flopOn' : 'flopOff')}>
        <h1 className={cssListLoL.h1}>
          {listName}
          {children}
        </h1>
        <h2 className={cssListLoL.h2}>
          <div className={cssListLoL.h2Text + ' color2'}>word count:</div>
          <div className={cssListLoL.h3Value}>{Object.keys(listDetails.words).length}</div>
        </h2>
        <h3 className={cssListLoL.h3}>
          <div className={cssListLoL.h3Text + ' color2'}>game count:</div>
          <div className={cssListLoL.h3Value}>{listDetails.gameCount}</div>
        </h3>
        <div
          className={
            cssListLoL.line + ' bg-color3' + (parrent === 'menu' ? ' ' + cssListLoL.lineMenu : '')
          }
        ></div>
      </div>
    </section>
  ));
}
