import React from 'react';

import Statistic from './components/statistic/Statistic.tsx';
import Go from './components/go/Go.tsx';
import List from '../../components/list/List.tsx';
import BtnArrow from '../../components/btnArrow/BtnArrow.tsx';
import MenuLists from './components/lists/MenuLists.tsx';

import cssMenu from './Menu.module.css';

type Props = {};

export default function Menu({}: Props) {
  return (
    <>
      <div id='figmaMenuRef'></div>
      <div className={cssMenu.container}>
        <section className={cssMenu.header + ' headerColor'}>
          <Statistic />
        </section>
        <section className={cssMenu.main + ' mainColor'}>
          <Go />
        </section>
        <section className={cssMenu.footer + ' footerColor'}>
          <MenuLists />
        </section>
      </div>
    </>
  );
}
