import React from 'react';

import Btn from '../../../../components/btn/Btn.tsx';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand.ts';
import { changeOrderHndlr } from './changeOrderHndlr.ts';

import cssList from '../../../../components/list/List.module.css';
import cssListOfList from './ListOfList.module.css';

type Props = {
  children?: React.ReactNode;
  parrent: 'menu' | 'lol' | 'le';
  hndlrButton: () => void;
};

let fetchDataZusFlag = false;
export default function ListOfList({ children, parrent, hndlrButton }: Props) {
  //Zustand

  const { page, setPage } = useUiState();
  const { dataZus, setDataZus, fetchDataZus } = zustandData();
  const { setOrderListEditZus } = zustandOrderListEdit();
  const [attention, setAttention] = React.useState<string>('');

  const toEdit = (order) => {
    setPage('le');
    setOrderListEditZus(order);
  };

  //! wrong way!
  React.useEffect(() => {
    if (!fetchDataZusFlag) fetchDataZus();
    fetchDataZusFlag = true;
  }, [fetchDataZus]);

  // ckick on "go" makes attention to empty list
  //TODO change to shaking
  const clickHndlr = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const textContent = target.textContent;
    if (textContent === '!go') {
      setAttention(cssListOfList.attention);
      setTimeout(() => {
        setAttention('');
      }, 1000);
    } else {
      setAttention('');
    }
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', clickHndlr);
    return () => {
      document.removeEventListener('mousedown', clickHndlr);
    };
  }, []);

  return dataZus.map((list: object, index: number) => (
    <section
      key={index}
      className={
        cssList.containerList +
        (page === 'auth' ? ' ' + 'off' + ' ' : '') +
        ' ' +
        (page !== 'le' ? cssList.lolHeight + ' ' + cssList.lolMinHeight : cssList.leHeight + ' ')
      }
    >
      <Btn parrent='lol' type='exit' hndlr={hndlrButton} listOrder={list.order} />
      <Btn parrent='lol' type='edit' hndlr={() => toEdit(list.order)} />
      <div
        onClick={() => {
          if (page === 'lol')
            changeOrderHndlr({ dataZus, setDataZus, order: list.order }), setPage('menu');
        }}
        className={cssListOfList.flopWrap + ' ' + (page !== 'le' ? 'flopOn' : 'flopOff')}
      >
        <h1 className={cssListOfList.h1 + ' ' + attention}>
          {list.listName}
          {/* arrow buttons */}
          {index === 0 ? children : null}
        </h1>
        <h2 className={cssListOfList.h2}>
          <div className={cssListOfList.h2Text + ' color2'}>word count:</div>
          <div className={cssListOfList.h3Value}>{list.wordCount}</div>
        </h2>
        <h3 className={cssListOfList.h3}>
          <div className={cssListOfList.h3Text + ' color2'}>game count:</div>
          <div className={cssListOfList.h3Value}>{list.gameCount}</div>
        </h3>
        {/* <div
          className={
            cssListOfList.line + ' bg-color3' + (parrent === 'menu' ? ' ' + cssList.lineMenu : '')
          }
        ></div> */}
      </div>
    </section>
  ));
}
