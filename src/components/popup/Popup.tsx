import React from 'react';

import { useUiState } from '../../zustand.ts';

import cssPopup from './Popup.module.css';

type Props = {
  isOpen: boolean;
  setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  child: unknown;
};

export default function Popup({ isOpen, setPopupIsOpen, child }: Props) {
  const { page } = useUiState();

  React.useEffect(() => {
    if (page === 'menu') {
      setPopupIsOpen(false);
    }
  }, [page]);

  const blurBG = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        onClick={() => setPopupIsOpen(false)}
        ref={blurBG}
        className={`${cssPopup.blurBG} ${isOpen ? '' : cssPopup.off}`}
      ></div>
      <div className={`${cssPopup.containerOn} ${isOpen ? cssPopup.on : cssPopup.off}`}>
        <div className={cssPopup.container}>
          <button onClick={() => setPopupIsOpen(false)} className={cssPopup.exite}>
            x
          </button>
          {child}

          {/* <>
            <h1 style={{ marginBottom: '1rem' }}>Portability🔓</h1>
            <p>You can export individual lists or all lists at once.</p>
            <p style={{ marginBottom: '2rem' }}>
              All your saved knowledge stays in your hands — you're never locked into this app. ❤
            </p>

            <h1 style={{ marginBottom: '1rem' }}>Export Formats💾</h1>
            <div style={{ lineHeight: '1.6' }}>
              <p>
                <b style={{ textShadow: '1px 1px 0.1px white' }}>1) .txt</b> – A simple plain text format.
                <br />
                Can be opened with any basic text editor.
              </p>

              <p>
                <b style={{ textShadow: '1px 1px 0.1px white' }}>2) .json</b> – For advanced users who know their
                way around structured data.
              </p>

              <p>
                <b style={{ textShadow: '1px 1px 0.1px white' }}>3) .csv</b> – Spreadsheet-friendly format.
                <br />
                Can be opened with any spreadsheet software like Google Sheets or Excel.
              </p>

              <p>
                <b style={{ textShadow: '1px 1px 0.1px white' }}>4) Google Sheets</b> – Save your list directly to
                your Google Sheets account.
              </p>
            </div>
          </> */}
        </div>
      </div>
    </>
  );
}
