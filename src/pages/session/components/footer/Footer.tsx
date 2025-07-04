import React from 'react';

import Btn from '../../../../components/btn/Btn';
import { useUiState } from '../../../../zustand.ts';

import cssFooter from './Footer.module.css';

type Props = {
  gameWords: any[];
  setGameWords: any;
  know: boolean;
  setKnow: React.Dispatch<React.SetStateAction<boolean>>;
  dontKnow: boolean;
  setDontKnow: React.Dispatch<React.SetStateAction<boolean>>;
  translate: boolean;
  setTranslate: React.Dispatch<React.SetStateAction<boolean>>;
  gameWordsPrev;
  setGameWordsPrev;
  wordStatus;
  setWordStatus;
  combo;
  setCombo;
  maxCombo;
  setMaxCombo;
  end;
  setEnd;
  hndlrKnow: (timeOut: number) => void;
  hndlrDontKnow: (timeOut: number) => void;
};

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
  hndlrKnow,
  hndlrDontKnow,
}: Props) {
  const { page, setPage } = useUiState();

  const hndlrWordStatus = (status: boolean) => {
    setWordStatus((prev) => {
      // Проверяем, есть ли уже объект с таким word_id в массиве
      const isWordExists = prev.some((item) => item.word_id === gameWords[gameWords.length - 1]._id);
      if (isWordExists) return prev;

      const current = [...prev, { word_id: gameWords[gameWords.length - 1]._id, know: status }];
      return current;
    });
  };

  const hndlrPrevious = () => {
    if (know || dontKnow || end) return;
    console.log('Previous');
    setCombo(0);

    const lastPrev = gameWordsPrev.slice(-1);
    const OtherPrev = gameWordsPrev.slice(0, gameWordsPrev.length - 1);

    //TODO need check if (prev word === lastPrev word) return
    setGameWords((prev) => {
      // console.log(prev[prev.length - 1]?.word, '|', lastPrev[0]?.word);
      return [...prev, ...lastPrev];
    });
    setGameWordsPrev(OtherPrev);

    if (translate) setTranslate(false);
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
          <Btn parrent='session' type='exitSession' hndlr={() => hndlrDontKnow(350)} />
          <Btn parrent='session' type='tickSession' hndlr={() => hndlrKnow(350)} />
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
