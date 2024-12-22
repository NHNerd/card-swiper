import React from 'react';
import { useUiState } from '../../zustand.ts';

import cssSettings from './Settings.module.css';

type Props = {};

export default function Settings({}: Props) {
  const { page, setPage } = useUiState();

  const hndlrLogout = () => {
    localStorage.removeItem('card-swiper:email');
    localStorage.removeItem('card-swiper:userId');
    localStorage.removeItem('card-swiper:allLists');
    localStorage.removeItem('card-swiper:allWords');
    // localStorage.removeItem('card-swiper:removedWords');
    // localStorage.removeItem('card-swiper:removedLists');
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
