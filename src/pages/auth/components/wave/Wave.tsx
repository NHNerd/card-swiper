import React from 'react';

import cssWave from './Wave.module.css';

type Props = {};

export default function Wave({}: Props) {
  return (
    <>
      <div className={cssWave.resize}>
        <svg className={cssWave.wave} viewBox='0 0 800 400' preserveAspectRatio='none'>
          <path fill='#ce74e027' />
        </svg>
        <svg className={cssWave.waveClone} viewBox='0 0 800 400' preserveAspectRatio='none'>
          <path fill='#ce74e027' />
        </svg>
        <svg className={cssWave.wave2} viewBox='0 0 800 400' preserveAspectRatio='none'>
          <path fill='#ce74e027' />
        </svg>
        <svg className={cssWave.wave2Clone} viewBox='0 0 800 400' preserveAspectRatio='none'>
          <path fill='#ce74e027' />
        </svg>
        <div className={cssWave.fade}></div>
      </div>
    </>
  );
}
