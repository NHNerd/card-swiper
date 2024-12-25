import React from 'react';
import { useUiState, zustandData, zustandOrderListEdit } from '../../zustand.ts';
import Card from './components/card/Card.tsx';
import LastCard from './components/lastCard/LastCard.tsx';
import Bar from './components/bar/Bar.tsx';
import DataSession from './components/data/Data.tsx';
import Footer from './components/footer/Footer.tsx';
import { wordStatisticLS } from './bussines/wordStatisticLS.ts';
import { patchWordFielCorrectWrongdMany } from '../../axios/words.ts';
import sotByRatio from '../../business/word/sotByRatio.ts';

import cssSession from './Session.module.css';

type Props = {};

export default function Session({}: Props) {
  const { page, setPage } = useUiState();
  const { dataZus, setDataZus } = zustandData((state) => state); // Получаем состояние zustandData
  const { orderListEditZus } = zustandOrderListEdit();

  const [time, setTime] = React.useState<number>(0);
  const [end, setEnd] = React.useState(false);

  const [know, setKnow] = React.useState<boolean>(false);
  const [dontKnow, setDontKnow] = React.useState<boolean>(false);
  const [translate, setTranslate] = React.useState<boolean>(false);

  const [wordStatus, setWordStatus] = React.useState<object[]>([]);
  const [statusEnd, setStatusEnd] = React.useState<object>({ know: 0, dontKnow: 0 });

  const [combo, setCombo] = React.useState<number>(0);
  const [maxCombo, setMaxCombo] = React.useState<number>(0);

  const [gameWords, setGameWords] = React.useState<any[]>([]); //
  const [gameWordsPrev, setGameWordsPrev] = React.useState<any[]>([]);

  const ContainerSessionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (page === 'menu' && (time !== 0 || gameWordsPrev.length !== 0)) {
      //* clear
      setTime(0);
      setEnd(false);
      setKnow(false);
      setDontKnow(false);
      setTranslate(false);
      setWordStatus([]);
      setStatusEnd({ know: 0, dontKnow: 0 });
      setCombo(0);
      setMaxCombo(0);
      setGameWords(dataZus[0].words);
      setGameWordsPrev([]);

      console.log('clear in time exite before session ended');
    }
  }, [page]);

  React.useEffect(() => {
    // refresh game words
    if (dataZus && dataZus.length > 0 && dataZus[0].words && gameWordsPrev.length === 0) {
      setGameWords([...dataZus[0].words]);
    }
  }, [dataZus]);

  React.useEffect(() => {
    // end of  ession

    if (gameWords?.length === 0 && page == 'session' && !end) {
      wordStatus.map((item) => {
        if (item.know) {
          setStatusEnd((prev) => ({
            ...prev,
            know: prev.know + 1,
          }));
        } else {
          setStatusEnd((prev) => ({
            ...prev,
            dontKnow: prev.dontKnow + 1,
          }));
        }
      });
      wordStatus.sort((a, b) => ('' + a.word_id).localeCompare(b.word_id));

      console.log('end of session');
      // LS
      const [listWordsNewDTO] = wordStatisticLS(wordStatus);
      // DZ
      const dataZusCopy: any = [...dataZus];
      dataZusCopy[orderListEditZus].words.sort((a, b) => ('' + a._id).localeCompare(b._id));

      dataZusCopy[orderListEditZus].words.forEach((word: any, i: number) => {
        wordStatus[i].know ? (word.correct += 1) : (word.wrong += 1);
      });
      sotByRatio(dataZusCopy[orderListEditZus].words);
      setDataZus(dataZusCopy);
      // DB
      patchWordFielCorrectWrongdMany(listWordsNewDTO);

      setEnd(true);
    }
  }, [gameWords]);

  //!
  if ((!gameWords || !dataZus[0]?.words || gameWords?.length === 0) && page !== 'session') return null;

  return (
    <>
      <div
        ref={ContainerSessionRef}
        id={cssSession.session}
        className={page === 'session' ? cssSession.on : cssSession.off}
      >
        <Bar gameWords={gameWords} />
        <DataSession gameWords={gameWords} time={time} setTime={setTime} end={end} combo={combo} />

        <LastCard wordStatus={wordStatus} statusEnd={statusEnd} maxCombo={maxCombo} end={end} />
        <Card
          ContainerSessionRef={ContainerSessionRef}
          gameWords={gameWords}
          setGameWords={setGameWords}
          time={time}
          know={know}
          dontKnow={dontKnow}
          translate={translate}
        />
        <Footer
          gameWords={gameWords}
          setGameWords={setGameWords}
          know={know}
          setKnow={setKnow}
          dontKnow={dontKnow}
          setDontKnow={setDontKnow}
          translate={translate}
          setTranslate={setTranslate}
          gameWordsPrev={gameWordsPrev}
          setGameWordsPrev={setGameWordsPrev}
          wordStatus={wordStatus}
          setWordStatus={setWordStatus}
          combo={combo}
          setCombo={setCombo}
          maxCombo={maxCombo}
          setMaxCombo={setMaxCombo}
          end={end}
          setEnd={setEnd}
        />
      </div>
    </>
  );
}
