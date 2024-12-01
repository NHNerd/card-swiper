import React from 'react';

import Fork from '../../../../components/fork/Fork';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand';
import { addWord, wordRefreshLSAfterDB } from '../../../../business/word/addWord';
import { putNewWord } from '../../../../axios/words';
import PopInput from '../../../../components/popInput/PopInput';

import cssForkLe from './ForkLe.module.css';
//TODO find property place for css for 2 pages
import cssForkLoL from '../../../lol/components/forkLol/ForkLoL.module.css';

type Props = {};

export default function ForkLoL({}: Props) {
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

  //* word: string, translate: string, listId: any
  const addLogicWord = (inputRightRef) => {
    setIsOpen(true);
    setNewWord(inputRightRef.value);
  };

  const hndlrSubmit = (inputRef: any) => {
    if (newInputVal === '') {
      setTrySubmitEmpty(true);
      setTimeout(() => {
        setTrySubmitEmpty(false);
      }, 1000);
      return;
    }

    const listId = dataZus[orderListEditZus].listId;
    // LS
    const [newWordObj, newListWords, otherWords] = addWord(listId, newWord, inputRef.current.value);
    // DZ
    const dataZusCopy: any = [...dataZus];
    dataZusCopy[orderListEditZus].words = [newWordObj, ...dataZus[orderListEditZus].words];
    setDataZus(dataZusCopy);
    // DB
    putNewWord(listId, newWord, inputRef.current.value)
      .then((newWordFromDB) => {
        wordRefreshLSAfterDB(newWordFromDB, newListWords, otherWords);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setIsOpen(false);
    setTrySubmitEmpty(false);
    inputRef.current?.setSelectionRange(0, 0);
    inputRef.current?.blur();
  };

  return (
    <>
      <Fork
        isOn={page == 'le' ? true : false}
        leftChild={
          <div className={cssForkLoL.search + (actionStatus.l ? ' ' + cssForkLoL.imgOff : '')}> </div>
        }
        rightChild={
          <div className={cssForkLoL.add + (actionStatus.r ? ' ' + cssForkLoL.imgOff : '')}></div>
        }
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
