import React from 'react';

import Statistic from './components/statistic/Statistic.tsx';
import Go from './components/go/Go.tsx';
import List from '../../components/listLol/ListLoL.tsx';
import BtnArrow from '../../components/btnArrow/BtnArrow.tsx';
// import MenuLists from './components/lists/MenuLists.tsx';

import '../../components/container.css';
import cssMenu from './Menu.module.css';

type Props = {};

function btnArrowHndlr() {
  console.log('click: btnArrow');
}

export default function Menu({}: Props) {
  return (
    <>
      <div id='figmaMenuRef'></div>

      <div className='container'>
        <section className={cssMenu.header + ' headerColor'}>
          <Statistic />
        </section>
        <section className={cssMenu.main + ' mainColor'}>
          <Go />
        </section>
        <section className={cssMenu.footer + ' footerColor'}>
          <List parrent={'menu'}>
            <BtnArrow onClick={btnArrowHndlr} direct='top' />
            <BtnArrow onClick={btnArrowHndlr} direct='left' />
            <BtnArrow onClick={btnArrowHndlr} direct='right' />
          </List>
        </section>
      </div>
    </>
  );
}
