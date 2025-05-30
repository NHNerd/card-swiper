import React from 'react';
import { useUiState, zustandData, zustandOrderListEdit } from '../../zustand.ts';
import Card from './components/card/Card.tsx';
import LastCard from './components/lastCard/LastCard.tsx';
import Bar from './components/bar/Bar.tsx';
import DataSession from './components/data/Data.tsx';
import Footer from './components/footer/Footer.tsx';
import { wordStatisticLS } from './bussines/wordStatisticLS.ts';
import { listStatisticLS } from './bussines/listStatisticLS.ts';
import { patchWordFielCorrectWrongdMany } from '../../axios/words.ts';
import { patchListSessionCount } from '../../axios/list.ts';
import { patchSessionDays } from '../../axios/statistic.ts';
import { sessionAddStatistic } from '../../business/statistic/session.ts';

import sotByRatio from '../../business/word/sotByRatio.ts';

import cssSession from './Session.module.css';

type Props = {
  endSession: boolean;
  setEndSession: React.Dispatch<React.SetStateAction<boolean>>;
  setStatistic: React.Dispatch<React.SetStateAction<any>>;
};

export default function Session({ endSession, setEndSession, setStatistic }: Props) {
  const { page, setPage } = useUiState();
  const { dataZus, setDataZus } = zustandData((state) => state); // Получаем состояние zustandData
  const { orderListEditZus } = zustandOrderListEdit();

  const [time, setTime] = React.useState<number>(0);

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
      setEndSession(false);
      setKnow(false);
      setDontKnow(false);
      setTranslate(false);
      setWordStatus([]);
      setStatusEnd({ know: 0, dontKnow: 0 });
      setCombo(0);
      setMaxCombo(0);
      setGameWords(dataZus[0].words);
      setGameWordsPrev([]);

      // console.log('clear in time exite before session ended');
    }
  }, [page]);

  React.useEffect(() => {
    // refresh game words
    if (dataZus && dataZus.length > 0 && dataZus[0].words && gameWordsPrev.length === 0) {
      setGameWords([...dataZus[0].words]);
    }
  }, [dataZus]);

  React.useEffect(() => {
    //* end of  session

    if (gameWords?.length === 0 && page == 'session' && !endSession) {
      let correct = 0;
      let wrong = 0;

      wordStatus.map((item) => {
        if (item.know) {
          correct += 1;
          setStatusEnd((prev) => ({
            ...prev,
            know: prev.know + 1,
          }));
        } else {
          wrong += 1;
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
      const [listNewDTO] = listStatisticLS();
      const sessionStatistic: any[] = sessionAddStatistic(time, maxCombo, correct, wrong);
      // DZ
      const dataZusCopy: any = [...dataZus];
      dataZusCopy[orderListEditZus].words.sort((a, b) => ('' + a._id).localeCompare(b._id));

      dataZusCopy[orderListEditZus].words.forEach((word: any, i: number) => {
        wordStatus[i].know ? (word.correct += 1) : (word.wrong += 1);
      });
      sotByRatio(dataZusCopy[orderListEditZus].words);
      dataZusCopy[0].sessionCount = listNewDTO.sessionCount;
      setDataZus(dataZusCopy);
      // DB
      patchWordFielCorrectWrongdMany(listWordsNewDTO);
      patchListSessionCount(listNewDTO);

      const asyncGetStatistic = async () => {
        const FreshStatistic = await patchSessionDays(sessionStatistic);

        setStatistic(FreshStatistic);
      };
      asyncGetStatistic();

      setEndSession(true);
    }
  }, [gameWords]);

  //!
  if ((!gameWords || !dataZus[0]?.words || gameWords?.length === 0) && page !== 'session') return null;

  return (
    <div
      ref={ContainerSessionRef}
      id={cssSession.session}
      className={page === 'session' ? cssSession.on : cssSession.off}
    >
      <Bar gameWords={gameWords} />
      <DataSession gameWords={gameWords} time={time} setTime={setTime} end={endSession} combo={combo} />

      <LastCard wordStatus={wordStatus} statusEnd={statusEnd} maxCombo={maxCombo} end={endSession} />
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
        end={endSession}
        setEnd={setEndSession}
      />
    </div>
  );
}
