import React from 'react';

import ImportList from './importList/ImportList.tsx';
import ExportList from './exportList/ExportList.tsx';
import Popup from '../../../../../../components/popup/Popup.tsx';
import { aboutImport, aboutExport } from './abouts/abouts.tsx';
import { zustandData } from '../../../../../../zustand.ts';

import cssImprtExprtList from './ImprtExprtList.module.css';

type Props = {
  setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupChild: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

export default function ImprtExprtList({ setPopupIsOpen, setPopupChild }: Props) {
  const { dataZus } = zustandData();

  return (
    <div className={cssImprtExprtList.container}>
      <h1 className={`${cssImprtExprtList.importHeader}`}>
        Import
        <button
          onClick={() => {
            setPopupIsOpen(true);
            setPopupChild(aboutImport);
          }}
          className={`${cssImprtExprtList.importHeaderAbout}`}
        >
          ?
        </button>
      </h1>
      <ImportList />
      <h1 className={cssImprtExprtList.exportHeader}>
        Export
        <button
          onClick={() => {
            setPopupIsOpen(true);
            setPopupChild(aboutExport);
          }}
          className={`${cssImprtExprtList.exportHeaderAbout}`}
        >
          ?
        </button>
      </h1>

      <ExportList />
    </div>
  );
}
