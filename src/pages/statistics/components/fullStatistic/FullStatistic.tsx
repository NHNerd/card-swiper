import React from 'react';

import { secToHMS } from '../chart/hndlrs/secToHMS';

import cssFullStatistic from './FullStatistic.module.css';

import { zustandData } from '../../../../zustand';

export default function FullStatistic({
  page,
  timeRange,
  wordAddClc,
  wordsRepClc,
  sessionClc,
  timeClc,
  knowPrsntClc,
  sessionAvgClc,
  comboAvgClc,
}) {
  const { dataZus } = zustandData();

  // console.log('👺FS👺');

  return (
    <>
      <div className={`${cssFullStatistic.container} ${page !== 'statistics' ? cssFullStatistic.off : ''}`}>
        <header className={cssFullStatistic.header}>Range statistics</header>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>words added:</div>
          <div className={`${cssFullStatistic.value} ${cssFullStatistic.wordsAdded}`}>
            {wordAddClc[timeRange]}
          </div>
        </h3>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>words repiated:</div>
          <div className={`${cssFullStatistic.value} ${cssFullStatistic.wordsRep}`}>{wordsRepClc[timeRange]}</div>
        </h3>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>sessions:</div>
          <div className={`${cssFullStatistic.value} ${cssFullStatistic.session}`}>{sessionClc[timeRange]}</div>
        </h3>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>know answers:</div>
          <div className={`${cssFullStatistic.value} `}>{knowPrsntClc[timeRange] + '%'}</div>
        </h3>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>avreg session time:</div>
          <div className={cssFullStatistic.value}>{secToHMS(sessionAvgClc[timeRange])}</div>
        </h3>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>avreg combo:</div>
          <div className={cssFullStatistic.value}>{comboAvgClc[timeRange]}</div>
        </h3>
        <h3 className={cssFullStatistic.stringContainer}>
          <div className={cssFullStatistic.text + ' color2'}>total time:</div>
          <div className={`${cssFullStatistic.value} ${cssFullStatistic.time}`}>
            {secToHMS(timeClc[timeRange])}
          </div>
        </h3>
        <hr></hr>
        <header className={cssFullStatistic.header}>
          Total statistics
          <h3 className={cssFullStatistic.stringContainer}>
            <div className={cssFullStatistic.text + ' color2'}>days:</div>
            <div className={`${cssFullStatistic.value} ${cssFullStatistic.wordsAdded}`}>0</div>
          </h3>
        </header>
      </div>
    </>
  );
}
