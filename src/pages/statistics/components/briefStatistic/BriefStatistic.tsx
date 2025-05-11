import React from 'react';

import cssBriefStatistic from './BriefStatistic.module.css';

import { zustandData, useUiState } from '../../../../zustand';

export default function BriefStatistic({ wordsRepClc }) {
  const { dataZus } = zustandData();
  const { page, setPage } = useUiState();

  const [hardes, setHardes] = React.useState<string>('...');

  return (
    <div
      className={`${cssBriefStatistic.container} ${page === 'statistics' ? cssBriefStatistic.off : ''}`}
    >
      <div className={`${cssBriefStatistic.stringContainer} ${cssBriefStatistic.spaceBetween}`}>
        <h3 className={cssBriefStatistic.stringContainer}>
          <div className={cssBriefStatistic.text + ' color2'}>words rep:</div>
          <div className={cssBriefStatistic.value}>{wordsRepClc.w}</div>
        </h3>
        <h3 className={cssBriefStatistic.stringContainer}>
          <div className={cssBriefStatistic.text + ' color2'}>hardes:</div>
          <div className={cssBriefStatistic.value}>{hardes}</div>
        </h3>
      </div>
    </div>
  );
}
