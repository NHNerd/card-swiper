import React from 'react';
import { useUiState } from '../../zustand.ts';
import cssSettings from './Settings.module.css';

type Props = {};

export default function Settings({}: Props) {
  const { page, setPage } = useUiState();

  return (
    <div>
      <div className={`${cssSettings.settingsBg} ${page === 'settings' ? '' : cssSettings.off}`}>
        settings
      </div>
    </div>
  );
}
