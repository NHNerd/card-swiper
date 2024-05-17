import React from 'react';

import BtnArrow from '../btnArrow/BtnArrow.tsx';

import { data, ListsTS, ListTS } from '/public/temp/data.ts';
import btnArrowHndlr from './btnArrowHndlr.ts';
import { useUiState } from '../../zustand.ts';
import Btn from '../btn/Btn.tsx';

import cssListLe from './ListLe.module.css';

type Props = {
  children?: React.ReactNode;
};

const lists: ListsTS = data.lists.list1.words;

export default function ListLe({ children, parrent }: Props) {
  const { page } = useUiState();

  return Object.entries(lists).map(([word, listDetails]: [string, ListTS], index: number) => (
    <section
      key={index}
      className={cssListLe.containerList + (parrent === 'menu' ? ' ' + cssListLe.menu : '')}
    >
      <Btn parrent='le' />
      <div className={cssListLe.flopWrap + ' ' + (page == 'le' ? 'flopOn' : 'flopOff')}>
        {' '}
        <h1 className={cssListLe.h1}>
          {word}
          {children}
        </h1>
      </div>
    </section>
  ));
}
