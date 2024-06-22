import React from 'react';

import { useUiState } from '../../zustand.ts';
import Card from './components/card/Card.tsx';
import Bar from './components/bar/Bar.tsx';
import ListOfList from '../../components/listOfList/ListOfList.tsx';

import cssSession from './Session.module.css';

type Props = {};

export default function Session({}: Props) {
  const { page, setPage } = useUiState();
  const ContainerSessionRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={ContainerSessionRef}
        id={cssSession.session}
        className={page === 'session' ? cssSession.on : cssSession.off}
      >
        <Bar />
        <Card ContainerSessionRef={ContainerSessionRef} />
      </div>
    </>
  );
}
