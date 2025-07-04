import React from 'react';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand';
import { patchListField } from '../../../../axios/list';
import PopInput from '../../../../components/popInput/PopInput';

import cssFooter from './Footer.module.css';

type Props = {};

export default function Footer({}: Props) {
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const { orderListEditZus } = zustandOrderListEdit();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [newInputVal, setNewInputVal] = React.useState<number | ''>(10);
  const [trySubmitEmpty, setTrySubmitEmpty] = React.useState<boolean>(false);

  const gameCountAlertText = React.useRef('');

  const hndlrGameCountEdit = async () => {
    setIsOpen(true);
  };

  const GCAlert = (text: string): void => {
    gameCountAlertText.current = text;
    setTimeout(() => {
      gameCountAlertText.current = '';
    }, 1500);
  };

  const sbmtEmptyHndlr = (setTrySubmitEmpty: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setTrySubmitEmpty(true);
    setTimeout(() => {
      setTrySubmitEmpty(false);
    }, 1000);
  };

  const hndlrSubmit = (inputRef: any) => {
    if (isNaN(newInputVal)) {
      console.log('Enter Number, not Text!');
      return;
    }
    if (newInputVal > dataZus[orderListEditZus]?.words.length) {
      setNewInputVal(dataZus[orderListEditZus]?.words.length);
      GCAlert('max game count <= words count');

      return;
    } else if (newInputVal === '') {
      sbmtEmptyHndlr(setTrySubmitEmpty);
      return;
    } else if (newInputVal == 0) {
      setNewInputVal(1);
      GCAlert('min game count >= 1');

      sbmtEmptyHndlr(setTrySubmitEmpty);
      return;
    }

    if (dataZus[orderListEditZus].gameCount !== newInputVal) {
      const listsLS = JSON.parse(localStorage.getItem('card-swiper:allLists'));

      //? ISO 8601 (0 UTC - Z)
      const newTime = new Date().toISOString();

      //DZ
      dataZus[orderListEditZus].gameCount = +newInputVal;
      setDataZus(dataZus);
      // LS
      listsLS[orderListEditZus].gameCount = +newInputVal;
      listsLS[orderListEditZus].updateGameCount = newTime;
      localStorage.setItem('card-swiper:allLists', JSON.stringify(listsLS));
      // DB
      patchListField(listsLS[orderListEditZus]._id, +newInputVal, newTime);
    }

    gameCountAlertText.current = '';
    setIsOpen(false);
    setTrySubmitEmpty(false);
    inputRef.current?.setSelectionRange(0, 0);
    inputRef.current?.blur();
  };

  return (
    <>
      <div className={cssFooter.containerFooter + ' ' + (page == 'le' ? cssFooter.on : cssFooter.off)}>
        <div className={cssFooter.left}>
          <h2 className={cssFooter.wordCount}>{dataZus[orderListEditZus]?.words?.length || 0}</h2>
          <h2 className={cssFooter.wordText}>word count</h2>
        </div>
        <div className={cssFooter.right}>
          <h2 className={cssFooter.gameCount}>{dataZus[orderListEditZus]?.gameCount || 0}</h2>
          <h2 className={cssFooter.gameText}>game count</h2>
          <button className={cssFooter.gameCountButton} onClick={hndlrGameCountEdit}></button>
        </div>
      </div>
      <PopInput
        parrent={'gameCount'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        oldInputVal={dataZus[orderListEditZus].gameCount}
        newInputVal={newInputVal}
        setNewInputVal={setNewInputVal}
        hndlrSubmit={hndlrSubmit}
        trySubmitEmpty={trySubmitEmpty}
        setTrySubmitEmpty={setTrySubmitEmpty}
        placeholderText='Enter the game count'
        gameCountAlertText={gameCountAlertText.current}
      >
        <div
          className={`${cssFooter.gameCountAlert} ${
            gameCountAlertText.current === '' ? cssFooter.gameCountAlertOff : ''
          }`}
        >
          {gameCountAlertText.current}
        </div>
      </PopInput>
    </>
  );
}
