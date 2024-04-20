import React from 'react';

import List from '../../../../components/list/List';
import BtnArrow from '../../../../components/btnArrow/BtnArrow.tsx';

import cssMenuLists from './cssMenuLists.module.css';

type Props = {};

export default function Lists({}: Props) {
  return (
    <List>
      Tupo Name
      <BtnArrow direct='top' />
      <BtnArrow direct='left' />
      <BtnArrow direct='right' />
    </List>
  );
}
