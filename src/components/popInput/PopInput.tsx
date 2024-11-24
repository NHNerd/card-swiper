import React from 'react';
import Btn from '../../components/btn/Btn';
import cssPopInput from './PopInput.module.css';

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
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  //   const [inputVal, setInputVal] = React.useState('');

  const hndlrSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (placeholderText === 'Enter the game count') {
      if (/^\d*$/.test(e.target.value)) {
        setNewInputVal(Number(e.target.value));
      }
      console.log('Enter Number!');
      return;
    }
    setNewInputVal(e.target.value);
  };

  React.useEffect(() => {
    if (isOpen) {
      setNewInputVal(oldInputVal);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, 20);
      }, 30);
    }
  }, [isOpen]);

  return (
    <>
      <section
        className={`${cssPopInput.container} ${isOpen ? '' : cssPopInput.off}`}
        onClick={() => (setIsOpen(false), setTrySubmitEmpty(false))}
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
            }`}
            maxLength={20}
            placeholder={placeholderText}
          />
          <section className={`${cssPopInput.btnContainer}`}>
            <Btn parrent='le' type='tick' hndlr={() => hndlrSubmit(inputRef)} />
          </section>
        </div>
      </section>
    </>
  );
}
// inputRef
