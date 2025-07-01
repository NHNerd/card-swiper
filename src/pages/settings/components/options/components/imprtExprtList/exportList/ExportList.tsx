import React from 'react';

import { zustandData } from '../../../../../../../zustand.ts';
import { sortHndlr, SortType } from './hndlrs/sortHndlr.ts';
import { exportTxt, exportCSV } from './hndlrs/exportHndlrs.ts';
import inputValidation from '../../../../../../../handlers/inputValidation';
import cssExportList from './ExportList.module.css';

type Props = {};

export default function ExportList({}: Props) {
  const { dataZus } = zustandData();

  const [inputVal, setInputVal] = React.useState<string>('');
  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [wrnngEmptyExport, setWrnngEmptyExport] = React.useState<string>('');
  const [listSorted, setListSorted] = React.useState([...dataZus]);
  const [listSearch, setlistSearch] = React.useState([...dataZus]);
  const [sortText, setSortText] = React.useState<SortType>('X ⇅');

  const inputRef = React.useRef<HTMLInputElement>(null);

  // Search
  React.useEffect(() => {
    if (inputVal.trim() === '') {
      setlistSearch([...dataZus]);
    } else {
      const filtered = dataZus.filter((item: unknown) =>
        item.listName.toLowerCase().includes(inputVal.toLowerCase())
      );
      setlistSearch(filtered);
    }
  }, [inputVal, dataZus]);

  const exportHndlr = (list: any) => {
    if (list.words.length === 0 || !list) {
      setWrnngEmptyExport(list.listName);

      setTimeout(() => {
        setWrnngEmptyExport('false');
      }, 800);

      return;
    }

    //* TXT -----------------------
    let text = '';
    list.words.map((word) => {
      text += `${word.word}: ${word.translate}\n`;
    });
    exportTxt(list.listName, text);

    // //* CSV -----------------------
    // const rows: [string, string][] = [];
    // list.words.map((word) => {
    //   rows.push([word.word, word.translate]);
    // });

    // exportCSV(list.listName, rows);
  };

  return (
    <footer className={cssExportList.exportContainer}>
      <div className={`${cssExportList.search}`}>
        <button
          onClick={() => sortHndlr(listSorted, setListSorted, sortText, setSortText, dataZus)}
          className={`${cssExportList.sort}`}
        >
          {sortText}
        </button>
        <input
          onChange={(e) => setInputVal(inputValidation(e.target.value))}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          ref={inputRef}
          type='text'
          value={inputVal}
          maxLength={20}
          className={cssExportList.searchInput}
        />
        <button
          className={`${cssExportList.searchImg} ${inputFocus && inputVal ? cssExportList.searchImgBlur : ''}`}
        ></button>
      </div>
      <section className={cssExportList.lists}>
        {(inputVal ? listSearch : listSorted).map((list, i) => {
          return (
            <React.Fragment key={list.listName}>
              <div className={cssExportList.list}>
                {list.listName}

                <div className={cssExportList.wordCountContainer}>
                  <div className={'color2'}>word count:&nbsp;</div>
                  <div>{list.wordCount}</div>
                </div>

                <button
                  onClick={() => exportHndlr(list)}
                  className={`${cssExportList.exportBtn} ${
                    list.words.length ? '' : cssExportList.exportBtnEmpty
                  }`}
                ></button>
                <div
                  className={`${cssExportList.emptyWarning} ${
                    wrnngEmptyExport === list.listName ? '' : cssExportList.emptyWarningOff
                  }`}
                  text-data='Empty'
                >
                  Empty!
                </div>
              </div>

              {i < listSearch.length - 1 && <div className={cssExportList.lineList}></div>}
            </React.Fragment>
          );
        })}
      </section>
      {/* <div>pop up</div> */}
    </footer>
  );
}
