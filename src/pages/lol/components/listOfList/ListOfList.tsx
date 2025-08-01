import React from 'react';

import Btn from '../../../../components/btn/Btn.tsx';
import { useUiState, zustandData, zustandOrderListEdit } from '../../../../zustand.ts';
import { changeOrderHndlr } from './changeOrderHndlr.ts';

import cssList from '../../../../components/list/List.module.css';
import cssListOfList from './ListOfList.module.css';
import ScrollFooter from '../../../../components/list/listFooter/ScrollFooter.tsx';

type Props = {
  scrollSectionLolRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  parrent: 'menu' | 'lol' | 'le';
  hndlrButton: () => void;
};

export default function ListOfList({ scrollSectionLolRef, children, parrent, hndlrButton }: Props) {
  //Zustand

  const { page, setPage } = useUiState();
  const { dataZus, setDataZus } = zustandData();
  const { setOrderListEditZus } = zustandOrderListEdit();
  const [attention, setAttention] = React.useState<string>('');

  const toEdit = (order) => {
    setPage('le');
    setOrderListEditZus(order);
  };

  // click on "go" makes attention to empty list
  //TODO change to shaking
  const clickHndlr = (event: MouseEvent) => {
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

  if (!dataZus) return <div>EMPTY</div>;

  return (
    <>
      {dataZus.map((list: object, index: number) => (
        <section
          key={index}
          className={
            cssList.containerList +
            (page === 'auth' || page === 'statistics' ? ' ' + 'off' + ' ' : '') +
            ' ' +
            (page !== 'le' ? cssList.lolHeight + ' ' + cssList.lolMinHeight : cssList.leHeight + ' ')
          }
        >
          <Btn parrent='lol' type='exit' hndlr={hndlrButton} listOrder={list.order} />
          <Btn parrent='lol' type='edit' hndlr={() => toEdit(list.order)} />
          <div
            onClick={() => {
              if (page === 'lol') changeOrderHndlr({ dataZus, setDataZus, order: list.order }), setPage('menu');
            }}
            className={cssListOfList.flopWrap + ' ' + (page !== 'le' ? 'flopOn' : 'flopOff')}
          >
            <h1
              className={cssListOfList.h1 + ' ' + attention + ' ' + (list.wordCount ? '' : cssListOfList.h1Empty)}
            >
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
            {/* bg-color3 ${parrent === 'menu' ? cssListOfList.lineMenu : ''} */}
            <div
              className={`${cssListOfList.line} ${
                page !== 'menu' && index !== dataZus.length - 1 ? cssListOfList.lineOn : cssListOfList.lineOff
              }`}
            ></div>
          </div>
        </section>
      ))}
      <ScrollFooter scrollSectionRef={scrollSectionLolRef} />
    </>
  );
}
