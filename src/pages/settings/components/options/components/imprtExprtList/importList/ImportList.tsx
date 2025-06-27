import React from 'react';
import { putNewList } from '../../../../../../../axios/list.ts';
import { putNewBulkWord } from '../../../../../../../axios/words.ts';
import { splitFilename, txtValidation } from './hndlrs/hndlrs.ts';

import { zustandData } from '../../../../../../../zustand.ts';

import cssImportList from './ImportList.module.css';

type Props = {};

export default function ImportList({}: Props) {
  const { dataZus } = zustandData();

  const [file, setFile] = React.useState<{ name: string; content: string }>({ name: ' ', content: ' ' });
  const [fileWarning, setFileWarning] = React.useState<
    '' | 'Name' | 'NameExiste' | 'Text' | 'NameText' | 'Success'
  >('');
  const [successText, setSuccessText] = React.useState<string>('');

  const wordsErr = React.useRef<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') setFile({ name: file.name, content: text });
    };
    reader.readAsText(file);
  };

  React.useEffect(() => {
    if (file.name === ' ') {
      setFileWarning('');
      setSuccessText('');
      return;
    }

    wordsErr.current = '';

    const { fileNameOnly, fileExt } = splitFilename(file.name);

    let warningStatus = '';
    if (fileNameOnly === '') warningStatus += 'Name';

    // name Validation📐
    for (let i = 0; i < dataZus.length; i++) {
      if (dataZus[i].listName === fileNameOnly) {
        setFileWarning('NameExiste');
        setSuccessText(`List - ${fileNameOnly} already exist :(`);
        return;
      }
    }
    if (fileExt === 'txt') {
      // content Validation📐
      const { unicWords, wordsErrLocal, wordErrCounter } = txtValidation(file.content, wordsErr.current);
      wordsErr.current = wordsErrLocal;

      if (unicWords.size === 0) warningStatus += 'Text';
      if (warningStatus.length !== 0) {
        setFileWarning(warningStatus);
        setSuccessText('');
        return;
      }

      //TODO IMPORT DATA
      // console.log(file.name, unicWords);

      setFileWarning('Success');
      setSuccessText(
        wordErrCounter ? `Success ${unicWords.size} from ${unicWords.size + wordErrCounter} :)` : 'Success all :)'
      );
    } else {
      console.log('❌', 'uncorrect file extension');
    }
  }, [file]);

  return (
    <>
      <footer className={cssImportList.importContainer}>
        <div className={cssImportList.drop}></div>
        <div className={cssImportList.importLine}></div>
        <div className={cssImportList.open}>
          <input
            type='file'
            accept='.txt'
            onChange={handleFileChange}
            className={cssImportList.inputFile}
          ></input>
        </div>
      </footer>
      <div className={cssImportList.line}>
        <div className={cssImportList[`fileEmpty${fileWarning}`]}>{successText}</div>

        <section
          className={`${fileWarning === 'Success' && wordsErr.current !== '' ? '' : cssImportList.uncorectOff}`}
        >
          <div className={cssImportList.uncorectHeader}>Uncorect strokes:</div>
          <div className={`${cssImportList.uncorect}`}>
            <div
              onClick={() => {
                //Clear
                wordsErr.current = '';
                setSuccessText('');
                setFileWarning('');
                setFile({ name: ' ', content: ' ' });
              }}
              className={cssImportList.uncorectExite}
            >
              X
            </div>
            <div className={cssImportList.uncorectMain} style={{ whiteSpace: 'pre-line' }}>
              {wordsErr.current}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
