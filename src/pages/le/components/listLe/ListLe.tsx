import React from 'react';

import BtnArrow from '../btnArrow/BtnArrow.tsx';

import { data, ListsTS, ListTS } from '/public/temp/data.ts';
import btnArrowHndlr from './btnArrowHndlr.ts';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand.ts';
import Btn from '../../../../components/btn/Btn.tsx';
import PopInput from '../../../../components/popInput/PopInput.tsx';

import cssList from '../../../../components/list/List.module.css';
import cssListLe from './ListLe.module.css';

type Props = {
  children?: React.ReactNode;
  parrent;
  setCurrentWord;
  setCurrentTranslate;
  setIsOpen;
};

const lists: ListsTS = data.lists.list1.words;

export default function ListLe({
  children,
  parrent,
  setCurrentWord,
  setCurrentTranslate,
  setIsOpen,
}: Props) {
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const { orderListEditZus } = zustandOrderListEdit();

  const toEdit = (word: any) => {
    //pop up
    setIsOpen(true);

    setCurrentWord(word.word);
    setCurrentTranslate(word.translate);
  };

  if (
    !dataZus ||
    dataZus.length === 0 ||
    !dataZus[orderListEditZus] ||
    !dataZus[orderListEditZus].words
  ) {
    return null; // Можно вернуть заглушку или пустой контент в случае отсутствия данных
  }

  //TODO что это за залупа?
  if (dataZus[0]?.words[0]?.word === 'Empty word 0') {
    return <div className={cssListLe.empty}>Empty :(</div>;
  }

  return dataZus[orderListEditZus].words.map((word: any, index: number) => (
    <section
      key={index}
      className={
        cssList.containerList +
        (parrent === 'menu' ? ' ' + cssList.menu : '') +
        ' ' +
        (page === 'lol' ? cssList.lolHeight : cssList.leHeight)
      }
    >
      <div
        className={cssListLe.progressBar}
        // min: -100, max: 0
        style={
          {
            '--translateX': `${
              Number(word.correct) === 0
                ? -100
                : -100 + (word.correct / (word.correct + word.wrong)) * 100
            }%`,
          } as React.CSSProperties
        }
      />
      <Btn parrent='le' type='editWord' hndlr={() => toEdit(word)} />

      <div
        onClick={() => {
          console.log(word.word);
        }}
        className={page == 'le' ? 'flopOn' : 'flopOff'}
      >
        <h1 className={cssListLe.fontSize}>
          {word.word}
          {/* ?????  */}
          {children}
        </h1>
      </div>
    </section>
  ));
}
