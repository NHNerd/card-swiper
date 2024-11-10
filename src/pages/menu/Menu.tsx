import React from 'react';

import Statistic from './components/statistic/Statistic.tsx';
import Go from './components/go/Go.tsx';

import ListOfList from '../lol/components/listOfList/ListOfList.tsx';
import BtnArrow from '../../components/btnArrow/BtnArrow.tsx';
import { useUiState, zustandData } from '../../zustand.ts';
import listsOrderRefresh from '../../business/list/listsRefresh.ts';
import debounce from '../../handlers/throttle.ts';

import '../../components/container.css';
import cssMenu from './Menu.module.css';

type Props = {};

// wrapping "refreshing allLists in localstorage" into debounce
const debounceListsOrderRefresh = debounce(listsOrderRefresh, 500);

export default function Menu({}: Props) {
  const { page, setPage } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const [opacity, setOpacity] = React.useState('');

  function btnArrowTopHndlr() {
    setPage('lol');
  }
  function btnArrowLeftHndlr() {
    const delited = dataZus.splice(dataZus.length - 1, 1);
    delited[0].order = 0;
    const newData = [];
    for (let i = 0; i < dataZus.length; i++) {
      newData.push(dataZus[i]);
      dataZus[i].order = i + 1;
    }
    newData.unshift(...delited);
    setDataZus(newData);

    //refreshing allLists in localstorage & MD
    debounceListsOrderRefresh(newData);
  }
  function btnArrowRightHndlr() {
    const delited = dataZus.splice(0, 1);
    delited[0].order = dataZus.length;
    const newData = [];
    for (let i = 0; i < dataZus.length; i++) {
      newData.push(dataZus[i]);
      dataZus[i].order = i;
    }
    newData.push(...delited);
    setDataZus(newData);

    //refreshing allLists in localstorage & MD
    debounceListsOrderRefresh(newData);
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
  // if (!dataZus[0].words) return null;
  return (
    <>
      {/* <div id='figmaMenuRef'></div> */}
      <Go isWords={Array.isArray(dataZus[0]?.words) && dataZus[0].words.length > 0} />
      <div
        className={
          cssMenu.footer +
          ' ' +
          // changong top to bottom returns ancorrect animation
          (page === 'menu' || page === 'settings'
            ? cssMenu.menu + ' ' + cssMenu.anchorMenu
            : page === 'session'
            ? cssMenu.session
            : cssMenu.lol + ' ' + cssMenu.anchorLol + ' ' + opacity)
        }
      >
        <ListOfList parrent='menu'>
          <BtnArrow onClick={btnArrowTopHndlr} direct='top' />
          <BtnArrow onClick={btnArrowLeftHndlr} direct='left' />
          {/* <BtnArrow onClick={debounce(testtt, 1000)} direct='left' /> */}
          <BtnArrow onClick={btnArrowRightHndlr} direct='right' />
        </ListOfList>
      </div>
    </>
  );
}
