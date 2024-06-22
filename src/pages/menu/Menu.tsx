import React from 'react';

import Statistic from './components/statistic/Statistic.tsx';
import Go from './components/go/Go.tsx';

import ListOfList from '../../components/listOfList/ListOfList.tsx';
import BtnArrow from '../../components/btnArrow/BtnArrow.tsx';
import { useUiState, zustandData } from '../../zustand.ts';

import '../../components/container.css';
import cssMenu from './Menu.module.css';

type Props = {};

export default function Menu({}: Props) {
  const { page, setPage } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const [opacity, setOpacity] = React.useState('');

  function btnArrowTopHndlr() {
    setPage('lol');
  }
  function btnArrowLeftHndlr() {
    const delited = dataZus.splice(dataZus.length - 1, 1);
    delited[0][1].order = 0;
    const newData = [];
    for (let i = 0; i < dataZus.length; i++) {
      newData.push(dataZus[i]);
      dataZus[i][1].order = i + 1;
    }
    newData.unshift(...delited);
    setDataZus(newData);
  }
  function btnArrowRightHndlr() {
    const delited = dataZus.splice(0, 1);
    delited[0][1].order = dataZus.length;
    const newData = [];
    for (let i = 0; i < dataZus.length; i++) {
      newData.push(dataZus[i]);
      dataZus[i][1].order = i;
    }
    newData.push(...delited);
    setDataZus(newData);
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
          <BtnArrow onClick={btnArrowLeftHndlr} direct='left' />
          <BtnArrow onClick={btnArrowRightHndlr} direct='right' />
        </ListOfList>
      </div>
    </>
  );
}
