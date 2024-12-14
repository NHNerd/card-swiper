import React from 'react';
import ListLe from './components/listLe/ListLe.tsx';
import ForkLoL from './components/forkLe/ForkLe.tsx';
import ListName from './components/listName/ListName.tsx';
import Footer from './components/footer/Footer.tsx';
import PopInput from '../../components/popInput/PopInput.tsx';
import TextArea from './components/textArea/TextArea.tsx';
import { editWord } from '../../business/word/addWord.ts';
import { patchWordField, remove } from '../../axios/words.ts';
import { useUiState, zustandData, zustandOrderListEdit } from '../../zustand.ts';

import cssLe from './Le.module.css';

type Props = {
  scrollSectionLeRef: React.RefObject<HTMLElement>;
};

export default function Le({ scrollSectionLeRef }: Props) {
  //Zustand
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const { orderListEditZus } = zustandOrderListEdit();

  const [currentWord, setCurrentWord] = React.useState<string>('');
  const [currentTranslate, setCurrentTranslate] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [newInputVal, setNewInputVal] = React.useState<string>('');
  const [newTextareaVal, setNewTextareaVal] = React.useState('');
  const [trySubmitEmpty, setTrySubmitEmpty] = React.useState<boolean>(false);
  const [trySubmitEmptyTranslate, setTrySubmitEmptyTranslate] = React.useState<boolean>(false);
  const [switchIsWord, setSwitchIsWord] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const submitClear = (inputRef: any) => {
    setIsOpen(false);
    setTrySubmitEmpty(false);
    setTrySubmitEmptyTranslate(false);
    inputRef.current?.setSelectionRange(0, 0);
    inputRef.current?.blur();
    textareaRef.current?.setSelectionRange(0, 0);
    textareaRef.current?.blur();
    setSwitchIsWord(false);
  };

  const hndlrSubmit = (inputRef: any) => {
    if (newTextareaVal === '' && newInputVal === '') {
      setTimeout(() => {
        setTrySubmitEmpty(true);
        setTrySubmitEmptyTranslate(true);
      }, 0);
      setTimeout(() => {
        setTrySubmitEmpty(false);
        setTrySubmitEmptyTranslate(false);
      }, 1000);

      return;
    } else {
      if (newTextareaVal === '') {
        setSwitchIsWord(false);

        setTimeout(() => {
          setTrySubmitEmptyTranslate(true);
        }, 500);
        setTimeout(() => {
          setTrySubmitEmptyTranslate(false);
        }, 1500);

        return;
      }

      if (newInputVal === '') {
        setSwitchIsWord(true);

        setTimeout(() => {
          setTrySubmitEmpty(true);
        }, 500);
        setTimeout(() => {
          setTrySubmitEmpty(false);
        }, 1500);

        return;
      }
    }

    if (currentTranslate === newTextareaVal && currentWord === newInputVal) {
      console.log('not change');
      submitClear(inputRef);
      return;
    }
    // if (currentWord === newInputVal) {
    //   console.log(currentWord, "- it's old word");
    //   submitClear(inputRef);
    //   return;
    // }

    // !logic
    //? ISO 8601 (0 UTC - Z)
    const newTime = new Date().toISOString();
    //DZ
    const dataZusCopy = [...dataZus];
    let _id = '';
    let updateWord = new Date('2023-12-01T20:00:37.659Z');
    let updateTranslate = new Date('2023-12-01T20:00:37.659Z');
    dataZusCopy[orderListEditZus].words.map((item: any) => {
      if (item.word === currentWord) {
        if (currentWord !== newInputVal) {
          item.word = newInputVal;
          item.updateWord = newTime;
        }
        if (currentTranslate !== newTextareaVal) {
          item.translate = newTextareaVal;
          item.updateTranslate = newTime;
        }

        _id = item._id;
        updateWord = new Date(item.updateWord);
        updateTranslate = new Date(item.updateTranslate);
      }
    });
    setDataZus(dataZusCopy);
    // LS
    editWord(newInputVal, currentWord, newTextareaVal, newTime);
    // DB
    patchWordField(_id, newInputVal, newTextareaVal, updateWord, updateTranslate);

    submitClear(inputRef);
  };

  const hndlrDeleteWord = (listOrder: number) => {
    const currentWord = dataZus[orderListEditZus].words[listOrder];

    // state
    dataZus[orderListEditZus].words.splice(listOrder, 1);
    setDataZus(dataZus);
    // LS
    const wordsLS = JSON.parse(localStorage.getItem('card-swiper:allWords'));
    const wordsLSNew = wordsLS.filter((word: any) => word._id !== currentWord._id);
    localStorage.setItem('card-swiper:allWords', JSON.stringify(wordsLSNew));

    // LS Flag - not apdated(DB)
    const removedWords = JSON.parse(localStorage.getItem('card-swiper:removedWords')) || [];
    // Chek doublicats(only unique _id)
    if (!removedWords.some((item) => item._id === currentWord._id)) {
      removedWords.push({ _id: currentWord._id });
    }
    localStorage.setItem('card-swiper:removedWords', JSON.stringify(removedWords));

    // DB
    remove(currentWord._id);
  };

  return (
    <>
      {/* <div className={cssLe.warpLe}> */}
      {/* <div className={cssLe.warpLe + ' ' + cssLe.opacity0}> */}
      <div className={cssLe.warpLe + ' ' + (page === 'le' ? cssLe.opacity1 : cssLe.opacity0)}>
        <ListName />
        <ForkLoL />

        <Footer />
        <div className={cssLe.scrollFade}></div>
        <section
          ref={scrollSectionLeRef}
          className={cssLe.scrollWrap + ' ' + (page == 'le' ? 'scrollWrapOn' : 'scrollWrapOff')}
        >
          <ListLe
            scrollSectionLeRef={scrollSectionLeRef}
            parrent={'le'}
            setCurrentWord={setCurrentWord}
            setCurrentTranslate={setCurrentTranslate}
            setIsOpen={setIsOpen}
            hndlrDelBtn={hndlrDeleteWord}
          />
        </section>
      </div>
      <PopInput
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        oldInputVal={currentWord}
        newInputVal={newInputVal}
        setNewInputVal={setNewInputVal}
        hndlrSubmit={hndlrSubmit}
        trySubmitEmpty={trySubmitEmpty}
        setTrySubmitEmpty={setTrySubmitEmpty}
        placeholderText='Enter new translate'
        switchIsWord={switchIsWord}
        setSwitchIsWord={setSwitchIsWord}
        setNewTextareaVal={setNewTextareaVal}
        currentTranslate={currentTranslate}
        textareaRef={textareaRef}
        TextArea={
          <TextArea
            isOpen={isOpen}
            oldTextareaVal={currentTranslate}
            newTextareaVal={newTextareaVal}
            setNewTextareaVal={setNewTextareaVal}
            trySubmitEmptyTranslate={trySubmitEmptyTranslate}
            switchIsWord={switchIsWord}
            setSwitchIsWord={setSwitchIsWord}
            textareaRef={textareaRef}
          />
        }
      />
    </>
  );
}
