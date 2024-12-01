import React from 'react';
import Btn from '../../../../components/btn/Btn';
import cssTextArea from './TextArea.module.css';

// import { putNewList } from '../../axios/list';
// import { addList, refreshLSAterDB } from '../../business/list/addList.ts';
// import { zustandData } from '../../zustand.ts';

export default function TextArea({
  isOpen,
  oldTextareaVal,
  newTextareaVal,
  setNewTextareaVal,
  trySubmitEmptyTranslate,
  switchIsWord,
  setSwitchIsWord,
  textareaRef,
}) {
  const hndlrChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = event.target.value;
    const maxRowLength = 20;

    // Разделяем текст на строки, включая пользовательские переносы
    const lines = newText.split('\n');

    const formattedLines = lines.map((line) => {
      let formattedLine = '';
      for (let i = 0; i < line.length; i += maxRowLength) {
        formattedLine += line.slice(i, i + maxRowLength) + (i + maxRowLength < line.length ? '\n' : '');
      }
      return formattedLine;
    });

    if (
      !(!formattedLines[formattedLines.length - 2] && !(formattedLines.length === 1)) &&
      formattedLines.length <= 8
    ) {
      const formattedText = formattedLines.join('\n');
      setNewTextareaVal(formattedText);
    }
  };
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <>
      <textarea
        ref={textareaRef}
        className={`${cssTextArea.textarea} ${
          trySubmitEmptyTranslate ? cssTextArea.emptyInputWarning : cssTextArea.emptyInputWarningOff
        } ${switchIsWord || !isOpen ? cssTextArea.off : cssTextArea.on}`}
        cols={20}
        rows={8}
        // 7 переносов строки
        maxLength={167}
        value={newTextareaVal}
        onChange={hndlrChangeTextarea}
        placeholder='Enter new translate'
      ></textarea>
      <div className={switchIsWord ? `${cssTextArea.btnOn}` : `${cssTextArea.btnOff}`}>
        <Btn parrent='le' type='word' hndlr={() => setSwitchIsWord(true)} />
      </div>
      <div className={switchIsWord ? `${cssTextArea.btnOff}` : `${cssTextArea.btnOn}`}>
        <Btn parrent='le' type='translate' hndlr={() => setSwitchIsWord(false)} />
      </div>
    </>
  );
}
