import React from 'react';

import BtnArrow from '../btnArrow/BtnArrow.tsx';

import { data, ListsTS, ListTS } from '/public/temp/data.ts';
import btnArrowHndlr from './btnArrowHndlr.ts';
import { useUiState } from '../../../../zustand.ts';
import Btn from '../../../../components/btn/Btn.tsx';

import cssList from '../../../../components/list/List.module.css';
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
      className={
        cssList.containerList +
        (parrent === 'menu' ? ' ' + cssList.menu : '') +
        ' ' +
        (page === 'lol' ? cssList.lolHeight : cssList.leHeight)
      }
    >
      <Btn parrent='le' />
      <div
        onClick={() => {
          console.log(word);
        }}
        className={page == 'le' ? 'flopOn' : 'flopOff'}
      >
        <h1 className={cssListLe.fontSize}>
          {word}
          {children}
        </h1>
      </div>
    </section>
  ));
}
