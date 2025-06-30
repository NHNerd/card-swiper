import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand';
import { addWord, wordRefreshLSAfterDB } from '../../../../business/word/addWord';
import { putNewWord } from '../../../../axios/words';
import PopInput from '../../../../components/popInput/PopInput';
import { patchAddWordDays } from '../../../../axios/statistic';
import dateToLocalUtcOffset from '../../../../handlers/dateToLocalUtcOffset';
import nowDateUTCandOffset from '../../../../handlers/nowDateUTCandOffset';

import cssForkLe from './ForkLe.module.css';
//TODO find property place for css for 2 pages
import cssForkLoL from '../../../lol/components/forkLol/ForkLoL.module.css';

type Props = {};

export default function ForkLoL({ setWordAddedUpdated }: Props) {
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const { orderListEditZus } = zustandOrderListEdit();

  const [actionStatus, setActionStatus] = React.useState<{ l: boolean; r: boolean }>({
    l: false,
    r: false,
  });

  // pop up props
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [newInputVal, setNewInputVal] = React.useState<string>('');
  const [newWord, setNewWord] = React.useState<string>('');
  const [trySubmitEmpty, setTrySubmitEmpty] = React.useState<boolean>(false);

  const addLogicWord = (inputRightRef: string) => {
    const allWords = JSON.parse(localStorage.getItem('card-swiper:allWords'));
    const listWords = allWords.filter((item: any) => item.listId === dataZus[orderListEditZus].listId);
    if (listWords && listWords.some((item) => item.word === inputRightRef)) {
      console.log('Word: "' + inputRightRef + '" already exists!');
      return null;
    }

    setIsOpen(true);
    setNewWord(inputRightRef);
  };

  //* word: string, translate: string, listId: any
  const hndlrSubmit = React.useCallback(
    (inputRef: any) => {
      // const hndlrSubmit = (inputRef: any) => {
      if (newInputVal === '') {
        setTrySubmitEmpty(true);
        setTimeout(() => {
          setTrySubmitEmpty(false);
        }, 1000);
        return;
      }

      const listId = dataZus[orderListEditZus].listId;
      const createDate = nowDateUTCandOffset();

      // LS
      const addWordresult = addWord(listId, createDate, newWord, inputRef.current.value);
      // word alreadu existe!
      if (addWordresult === null) {
        setIsOpen(false);
        setTrySubmitEmpty(false);
        inputRef.current?.setSelectionRange(0, 0);
        inputRef.current?.blur();
        return;
      }
      const [newWordObj, newListWords, otherWords]: any | null = addWordresult;
      //* -------------------- start
      const toDay = dateToLocalUtcOffset(new Date());
      let wordAdded: object[] = JSON.parse(localStorage.getItem('card-swiper:wordAdded'));
      if (!wordAdded) {
        wordAdded = [{ date: toDay, wordAdded: 1 }];
        localStorage.setItem('card-swiper:wordAdded', JSON.stringify(wordAdded));
      } else {
        if (toDay === wordAdded[wordAdded.length - 1].date) wordAdded[wordAdded.length - 1].wordAdded += 1;
        else wordAdded.push({ date: toDay, wordAdded: 1 });
        localStorage.setItem('card-swiper:wordAdded', JSON.stringify(wordAdded));
      }
      //* -------------------- end
      // DZ
      const dataZusCopy: any = [...dataZus];
      dataZusCopy[orderListEditZus].wordCount += 1;
      dataZusCopy[orderListEditZus].words = [newWordObj, ...dataZus[orderListEditZus].words];
      setDataZus(dataZusCopy);
      // DB
      putNewWord(listId, createDate, newWord, inputRef.current.value)
        .then((newWordFromDB) => {
          wordRefreshLSAfterDB(newWordFromDB, newListWords, otherWords);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      const updateWordAdd = async () => {
        const update = await patchAddWordDays(wordAdded);
        if (update.days != null) {
          setWordAddedUpdated(new Date());
          localStorage.removeItem('card-swiper:wordAdded');
        }
      };
      updateWordAdd();

      //Clear
      setIsOpen(false);
      setTrySubmitEmpty(false);
      inputRef.current?.setSelectionRange(0, 0);
      inputRef.current?.blur();
    },
    [dataZus, setDataZus, setWordAddedUpdated, newInputVal, newWord, orderListEditZus]
  );

  return (
    <>
      <Fork
        isOn={page == 'le' ? true : false}
        leftChild={<div className={cssForkLoL.search + (actionStatus.l ? ' ' + cssForkLoL.imgOff : '')}> </div>}
        rightChild={<div className={cssForkLoL.add + (actionStatus.r ? ' ' + cssForkLoL.imgOff : '')}></div>}
        actionStatus={actionStatus}
        setActionStatus={setActionStatus}
        addLogic={addLogicWord}
      ></Fork>
      <PopInput
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        oldInputVal=''
        newInputVal={newInputVal}
        setNewInputVal={setNewInputVal}
        hndlrSubmit={hndlrSubmit}
        trySubmitEmpty={trySubmitEmpty}
        setTrySubmitEmpty={setTrySubmitEmpty}
        placeholderText='Enter the translate'
      />
    </>
  );
}
