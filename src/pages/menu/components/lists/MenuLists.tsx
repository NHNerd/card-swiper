import React from 'react';

import List from '../../../../components/listLol/ListLoL.tsx';
import BtnArrow from '../../../../components/btnArrow/BtnArrow.tsx';

import cssMenuLists from './cssMenuLists.module.css';

type Props = {};

export default function Lists({}: Props) {
  return (
    <List>
      Tupo Namesss
      <div>teds</div>
      <BtnArrow direct='top' />
      <BtnArrow direct='left' />
      <BtnArrow direct='right' />
    </List>
  );
}
