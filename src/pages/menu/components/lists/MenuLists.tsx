import React from 'react';

import listOfList from '../../../../components/listOfList/ListOfList.tsx';
import BtnArrow from '../../../../components/btnArrow/BtnArrow.tsx';

// import cssMenuLists from './cssMenuLists.module.css';

type Props = {};

export default function Lists({}: Props) {
  return (
    <listOfList parrent='menu'>
      Tupo Namesss
      <div>teds</div>
      <BtnArrow direct='top' />
      <BtnArrow direct='left' />
      <BtnArrow direct='right' />
    </listOfList>
  );
}
