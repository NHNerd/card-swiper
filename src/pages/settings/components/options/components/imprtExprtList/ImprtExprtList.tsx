import React from 'react';

import { zustandData } from '../../../../../../zustand.ts';
import { sortHndlr } from './hndlrs/sortHndlr.ts';
import { exportTxt, exportCSV } from './hndlrs/exportHndlrs.ts';
import cssImprtExprtList from './ImprtExprtList.module.css';

type Props = {};

export default function ImprtExprtList({}: Props) {
  const { dataZus } = zustandData();

  const [inputVal, setInputVal] = React.useState<string>('');
  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [listSorted, setListSorted] = React.useState([...dataZus]);
  const [listSearch, setlistSearch] = React.useState([...dataZus]);
  const [sortText, setSortText] = React.useState<'a-z ↓' | 'z-a ↑' | 'time ↓' | 'time ↑'>('a-z ↓');

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
    if (list.words.length === 0 || !list) return console.log('🫗🫗🫗', 'empty list');
    // //* TXT -----------------------
    // let text = '';
    // list.words.map((word) => {
    //   text += `${word.word}: ${word.translate}\n`;
    // });
    // exportTxt(list.listName, text);

    //* CSV -----------------------
    const rows: [string, string][] = [];
    list.words.map((word) => {
      rows.push([word.word, word.translate]);
    });

    exportCSV(list.listName, rows);
  };

  const [content, setContent] = React.useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setContent(text);
      }
    };

    reader.readAsText(file);
  };
  console.log(content);

  return (
    <div className={cssImprtExprtList.container}>
      <h1 className={`${cssImprtExprtList.importHeader}`}>Import</h1>
      <footer className={cssImprtExprtList.importContainer}>
        <div className={cssImprtExprtList.drop}></div>
        <div className={cssImprtExprtList.importLine}></div>
        <div className={cssImprtExprtList.open}>
          <input
            type='file'
            accept='.txt'
            onChange={handleFileChange}
            className={cssImprtExprtList.inputFile}
          ></input>
        </div>
      </footer>

      <div className={cssImprtExprtList.line}></div>

      <h1 className={cssImprtExprtList.exportHeader}>Export</h1>
      <footer className={cssImprtExprtList.exportContainer}>
        <div className={`${cssImprtExprtList.search}`}>
          <button
            onClick={() => sortHndlr(listSorted, setListSorted, sortText, setSortText)}
            className={`${cssImprtExprtList.sort}`}
          >
            {sortText}
          </button>
          <input
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            ref={inputRef}
            type='text'
            value={inputVal}
            maxLength={20}
            className={cssImprtExprtList.searchInput}
          />
          <button
            className={`${cssImprtExprtList.searchImg} ${
              inputFocus && inputVal ? cssImprtExprtList.searchImgBlur : ''
            }`}
          ></button>
        </div>
        <section className={cssImprtExprtList.lists}>
          {(inputVal ? listSearch : listSorted).map((list, i) => {
            return (
              <React.Fragment key={list.listName}>
                <div className={cssImprtExprtList.list}>
                  {list.listName}
                  {/* <div className={cssImprtExprtList.wordCount}>
                    {list.words.length ? list.words.length : 'empty'}
                  </div> */}

                  {i < listSearch.length - 1 && (
                    <div className={cssImprtExprtList.wordCountContainer}>
                      <div className={'color2'}>word count:&nbsp;</div>
                      <div>{list.wordCount}</div>
                    </div>
                  )}
                  <button onClick={() => exportHndlr(list)} className={cssImprtExprtList.exportBtn}></button>
                </div>

                {i < listSearch.length - 1 && <div className={cssImprtExprtList.lineList}></div>}
              </React.Fragment>
            );
          })}
        </section>
      </footer>
    </div>
  );
}
