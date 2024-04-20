import React from 'react';

import BtnArrow from '../btnArrow/BtnArrow.tsx';

import { data, ListsTS, ListTS } from '/public/temp/data.ts';
import btnArrowHndlr from './btnArrowHndlr.ts';

import cssList from './List.module.css';

type Props = {
  children?: React.ReactNode;
};

const lists: ListsTS = data.lists;

export default function List({ children }: Props) {
  return Object.entries(lists).map(([listName, listDetails]: [string, ListTS], index: number) => (
    <section key={index} className={cssList.container}>
      <h1 className={cssList.h1}>{listName}</h1>
      <h2 className={cssList.h2}>
        <div className={cssList.h2Text + ' color2'}>word count:</div>
        <div className={cssList.h3Value}>{Object.keys(listDetails.words).length}</div>
      </h2>
      <h3 className={cssList.h3}>
        <div className={cssList.h3Text + ' color2'}>game count:</div>
        <div className={cssList.h3Value}>{listDetails.gameCount}</div>
      </h3>
    </section>
  ));
}
