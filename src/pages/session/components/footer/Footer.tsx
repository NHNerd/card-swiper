import React from 'react';

import Btn from '../../../../components/btn/Btn';

import cssFooter from './Footer.module.css';

export default function Footer({
  gameWords,
  setGameWords,
  setKnow,
  setDontKnow,
  translate,
  setTranslate,
  gameWordsPrev,
  setGameWordsPrev,
}) {
  const hndlrDontKnow = () => {
    console.log(`don't know`);

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
    console.log('know');

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
    console.log('Previous');

    const lastPrev = gameWordsPrev.slice(-1);
    const OtherPrev = gameWordsPrev.slice(0, gameWordsPrev.length - 1);

    // console.log(
    //   'last: ',
    //   lastPrev[lastPrev.length - 1]?.word,
    //   'gameWords: ',
    //   gameWords[gameWords.length - 1]?.word
    // );
    //TODO need check if (prev word === lastPrev word) return
    setGameWords((prev) => [...prev, ...lastPrev]);
    setGameWordsPrev(OtherPrev);

    setTranslate(false);
  };
  const hndlrTranslate = () => {
    console.log('Translate ');
    setTranslate(!translate);
  };
  return (
    <section className={cssFooter.footer}>
      <div className={cssFooter.wrapBtn}>
        <Btn parrent='session' type='exitSession' hndlr={hndlrDontKnow} />
        <Btn parrent='session' type='tickSession' hndlr={hndlrKnow} />
        <button className={cssFooter.previous} onClick={hndlrPrevious} />
        <button className={cssFooter.translate} onClick={hndlrTranslate}>
          translate
        </button>
      </div>
    </section>
  );
}
