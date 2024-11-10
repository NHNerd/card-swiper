import React from 'react';

import { useUiState } from '../../../../zustand';

import cssGo from './Go.module.css';

type Props = {
  isWords;
};

export default function Go({ isWords }: Props) {
  const { page, setPage } = useUiState();

  let classes: string = cssGo.container;
  let text: string = 'go';
  let hndlrClick: React.MouseEventHandler<HTMLButtonElement> | undefined = () => setPage('session');

  if (!isWords) {
    classes = cssGo.container + ' ' + cssGo.noWords;
    hndlrClick = undefined;
    text = '!go';
  }

  return (
    <div className={cssGo.wrap + ' ' + (page === 'menu' || page === 'settings' ? cssGo.on : cssGo.off)}>
      <button className={classes} onClick={hndlrClick}>
        {text}
      </button>
    </div>
  );
}
