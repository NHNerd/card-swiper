import React from 'react';
import Btn from '../../components/btn/Btn';
import inputValidation from '../../handlers/inputValidation';
import cssPopInput from './PopInput.module.css';
// import TextArea from '../../pages/le/components/textArea/TextArea';

// import { putNewList } from '../../axios/list';
// import { addList, refreshLSAterDB } from '../../business/list/addList.ts';
// import { zustandData } from '../../zustand.ts';

export default function PopInput({
  isOpen,
  setIsOpen,
  oldInputVal,
  newInputVal,
  setNewInputVal,
  hndlrSubmit,
  trySubmitEmpty,
  setTrySubmitEmpty,
  placeholderText,
  TextArea,
  switchIsWord,
  setSwitchIsWord,
  setNewTextareaVal,
  currentTranslate,
  textareaRef,
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLInputElement>(null);

  const [isMouseDownOnInput, setIsMouseDownOnInput] = React.useState(false);

  const hndlrMouseDown = (e) => {
    if (
      (inputRef.current && inputRef.current.contains(e.target)) ||
      (textareaRef?.current && textareaRef?.current.contains(e.target))
    )
      setIsMouseDownOnInput(true);
    else setIsMouseDownOnInput(false);
  };

  React.useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    containerRef.current.addEventListener('mousedown', hndlrMouseDown);
    return () => containerRef.current.removeEventListener('mousedown', hndlrMouseDown);
  }, [isOpen]);

  const hndlrSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (placeholderText === 'Enter the game count') {
      if (/^\d*$/.test(e.target.value)) {
        Number(e.target.value);
      } else {
        console.log('Enter Number!');
        return;
      }
    }
    setNewInputVal(inputValidation(e.target.value));
  };

  React.useEffect(() => {
    if (isOpen) {
      setNewInputVal(oldInputVal);
      if (TextArea) {
        setNewTextareaVal(currentTranslate);
        setSwitchIsWord(false);
        return;
      }

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, 20);
      }, 40);
    }
  }, [isOpen]);

  const containerOnCLick = () => {
    // при выдилении текста в ипуте и mouseUp вне инпута срабатывал onClick на закрытие
    if (isMouseDownOnInput) return; // это фиксит

    setIsOpen(false);
    setTrySubmitEmpty(false);
  };
  return (
    <>
      <section
        ref={containerRef}
        className={`${cssPopInput.container} ${isOpen ? '' : cssPopInput.off}`}
        onClick={containerOnCLick}
        // onClick={() => (setIsOpen(false), setTrySubmitEmpty(false))}
      >
        {/* stopPropagation - не дает сработать нажатию на конетейнер сквозь элементы сверху  */}
        <div className={cssPopInput.inputContainer} onClick={(e) => e.stopPropagation()}>
          <input
            ref={inputRef}
            type='text'
            value={newInputVal}
            onChange={hndlrSetInput}
            className={`${cssPopInput.input} ${
              trySubmitEmpty ? cssPopInput.emptyInputWarning : cssPopInput.emptyInputWarningOff
            } ${TextArea ? (switchIsWord ? cssPopInput.inputOn : cssPopInput.inputOff) : ''}`}
            maxLength={20}
            placeholder={placeholderText}
          />
          {TextArea}
          <section className={`${cssPopInput.btnContainer}`}>
            <Btn parrent='le' type='tick' hndlr={() => hndlrSubmit(inputRef)} />
          </section>
        </div>
      </section>
    </>
  );
}
// inputRef
