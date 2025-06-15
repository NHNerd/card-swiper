import React from 'react';
import { useUiState } from '../../zustand.ts';

import cssSettings from './Settings.module.css';

type Props = {
  setAllDateLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Settings({ setAllDateLoaded }: Props) {
  const { page, setPage } = useUiState();

  const hndlrLogout = () => {
    //* Хорошо было бы оставлять то что не смогло отправится на сервер
    //* Но тогда нужно переделывать логику сохранения этих врменных данных на LS добавляя туда userId,
    //* чтобы елси потом другой user зайдет чужой кещ кому надо по id полетел.
    localStorage.clear();
    setAllDateLoaded(false);

    setPage('auth');
  };
  return (
    <div>
      <div className={`${cssSettings.settingsBg} ${page === 'settings' ? '' : cssSettings.off}`}>
        settings
        <button onClick={hndlrLogout} className={`${cssSettings.logout}`}>
          log out
        </button>
      </div>
    </div>
  );
}
