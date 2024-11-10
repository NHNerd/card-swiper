import React from 'react';

import Wave from '../wave/Wave';

import cssHeader from './Header.module.css';

type Props = {
  sign: string;
};

export default function Header({ sign }: Props) {
  return (
    <>
      <div className={cssHeader.header}>
        <Wave />
        <div className={cssHeader.text}>
          <div className={cssHeader.stroke1}>{sign === 'in' ? 'Welcome back to' : 'Welcome to'} </div>
          <div className={cssHeader.stroke2}>
            <div className={cssHeader.icon}>IMG</div>
            <div>card swiper!</div>
          </div>
        </div>
      </div>
    </>
  );
}
