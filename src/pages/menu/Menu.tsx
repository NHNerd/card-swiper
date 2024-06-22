import React from 'react';

import Statistic from './components/statistic/Statistic.tsx';
import Go from './components/go/Go.tsx';

import ListOfList from '../../components/listOfList/ListOfList.tsx';
import BtnArrow from '../../components/btnArrow/BtnArrow.tsx';
import { useUiState } from '../../zustand.ts';

import '../../components/container.css';
import cssMenu from './Menu.module.css';

type Props = {};

function btnArrowHndlr() {
  console.log('click: btnArrow');
}

export default function Menu({}: Props) {
  const { page, setPage } = useUiState();
  const [opacity, setOpacity] = React.useState('');

  function btnArrowTopHndlr() {
    setPage('lol');
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (page === 'menu') {
        setOpacity('');
      } else {
        setOpacity(cssMenu.opacity0);
      }
    }, 250);
  }, [page]);

  return (
    <>
      {/* <div id='figmaMenuRef'></div> */}
      <Go />
      <div
        className={
          cssMenu.footer +
          ' ' +
          // changong top to bottom returns ancorrect animation
          (page === 'menu'
            ? cssMenu.menu + ' ' + cssMenu.anchorMenu
            : page === 'session'
            ? cssMenu.session
            : cssMenu.lol + ' ' + cssMenu.anchorLol + ' ' + opacity)
        }
      >
        <ListOfList parrent='menu'>
          <BtnArrow onClick={btnArrowTopHndlr} direct='top' />
          <BtnArrow onClick={btnArrowHndlr} direct='left' />
          <BtnArrow onClick={btnArrowHndlr} direct='right' />
        </ListOfList>
      </div>
    </>
  );
}
