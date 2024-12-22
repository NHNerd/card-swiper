import React from 'react';

import Btn from '../../../../components/btn/Btn';
import { useUiState } from '../../../../zustand.ts';

import cssFooter from './Footer.module.css';

export default function Footer({
  gameWords,
  setGameWords,
  know,
  setKnow,
  dontKnow,
  setDontKnow,
  translate,
  setTranslate,
  gameWordsPrev,
  setGameWordsPrev,
  wordStatus,
  setWordStatus,
  combo,
  setCombo,
  maxCombo,
  setMaxCombo,
  end,
  setEnd,
}) {
  const { page, setPage } = useUiState();

  const hndlrWordStatus = (status) => {
    setWordStatus((prev) => {
      // Проверяем, есть ли уже объект с таким word_id в массиве
      const isWordExists = prev.some((item) => item.word_id === gameWords[gameWords.length - 1]._id);
      if (isWordExists) return prev;

      const current = [...prev, { word_id: gameWords[gameWords.length - 1]._id, know: status }];
      return current;
    });
  };

  const hndlrDontKnow = () => {
    if (know || dontKnow || end) return;
    console.log(`don't know`);
    hndlrWordStatus(false);
    setCombo(0);

    setDontKnow(true);
    setTimeout(() => {
      const gameWordsNew = [...gameWords];
      const old = gameWordsNew.splice(gameWordsNew.length - 1, 1);
      setGameWordsPrev((prev) => [...prev, ...old]);
      setGameWords(gameWordsNew);

      setDontKnow(false);
      setTranslate(false);
    }, 300);
  };

  const hndlrKnow = () => {
    if (know || dontKnow || end) return;
    console.log('know');
    hndlrWordStatus(true);
    setCombo((prev) => {
      if (prev + 1 > maxCombo) setMaxCombo(prev + 1);
      return prev + 1;
    });

    setKnow(true);
    setTimeout(() => {
      const gameWordsNew = [...gameWords];
      const old = gameWordsNew.splice(gameWordsNew.length - 1, 1);
      setGameWordsPrev((prev) => [...prev, ...old]);
      setGameWords(gameWordsNew);

      setKnow(false);
      setTranslate(false);
    }, 300);
  };

  const hndlrPrevious = () => {
    if (know || dontKnow || end) return;
    console.log('Previous');
    setCombo(0);

    const lastPrev = gameWordsPrev.slice(-1);
    const OtherPrev = gameWordsPrev.slice(0, gameWordsPrev.length - 1);

    //TODO need check if (prev word === lastPrev word) return
    setGameWords((prev) => [...prev, ...lastPrev]);
    setGameWordsPrev(OtherPrev);

    setTranslate(false);
  };
  const hndlrTranslate = () => {
    if (end) return;
    console.log('Translate ');
    setTranslate(!translate);
    setCombo(0);
  };

  const hndlrExit = () => {
    if (know || dontKnow || !end) return;
    console.log('exit from session');

    //*  Clear
    setEnd(false);
    setKnow(false);
    setDontKnow(false);
    setTranslate(false);
    setWordStatus([]);
    setCombo(0);
    setMaxCombo(0);
    setGameWordsPrev([]);

    setPage('menu');
  };

  return (
    <section className={cssFooter.footer}>
      <div className={cssFooter.wrapBtn}>
        <div className={`${cssFooter.swipeBtn} ${end ? cssFooter.swipeBtnOff : ''}`}>
          <Btn parrent='session' type='exitSession' hndlr={hndlrDontKnow} />
          <Btn parrent='session' type='tickSession' hndlr={hndlrKnow} />
        </div>

        <button
          className={`${cssFooter.previous} ${end ? cssFooter.bottomBtnOff : ''}`}
          onClick={hndlrPrevious}
        />
        <button
          className={`${cssFooter.translate} ${end ? cssFooter.bottomBtnOff : ''}`}
          onClick={hndlrTranslate}
        >
          translate
        </button>
        <button className={`${cssFooter.exit}  ${end ? '' : cssFooter.exitOff}`} onClick={hndlrExit}>
          E X I T
        </button>
      </div>
    </section>
  );
}
