import React from 'react';

import ListOfList from './components/listOfList/ListOfList.tsx';
import ForkLoL from './components/forkLol/ForkLoL.tsx';
import Btnback from '../../components/btnBack/Btnback.tsx';

import DeletePopUp from '../deletePopUp/DeletePopUp.tsx';

import { useUiState, zustandData } from '../../zustand.ts';
import hndlrRemoveList from './hndlrs/hndlrRemoveList.ts';
import { putRefreshOrders } from '../../axios/list.ts';
import debounce from '../../handlers/throttle.ts';

import '../../components/container.css';
import cssLoL from './LoL.module.css';

type Props = {};
interface DataItem {
  id: number;
  name: string;
}

// wrapping "refreshing allLists in localstorage" into debounce
const debounceListsRefresh = debounce(putRefreshOrders, 500);

export default function LoL({}: Props) {
  //Zustand
  const { page } = useUiState();
  const { dataZus, setDataZus } = zustandData();

  const [opacity, setOpacity] = React.useState(cssLoL.opacity1);

  const [isDeletePopUp, setIsDeletePopUp] = React.useState<boolean>(false);
  const [deletedListOrder, setDeletedListOrder] = React.useState<number>(0);

  React.useEffect(() => {
    if (page === 'menu' || page === 'session' || page === 'settings') {
      setOpacity(cssLoL.opacity0);
    } else {
      setTimeout(() => {
        setOpacity(cssLoL.opacity1);
      }, 250);
    }
  }, [page]);

  const [data, setData] = React.useState<string[] | null>(null);
  const [listNames, setlistNames] = React.useState<string[] | null>(null);
  React.useEffect(() => {
    fetch('/temp/data-example/data.json')
      .then((response) => response.json())
      .then((fetchedData) => {
        if (JSON.stringify(fetchedData) !== JSON.stringify(data)) {
          setData(fetchedData);
          setlistNames(Object.keys(fetchedData.lists));
        }
      })
      .catch((error) => console.error('Error loading the data:', error));
  }, []);

  const hndlrDeleteList = (listOrder: number) => {
    setDeletedListOrder(listOrder);

    if (dataZus[listOrder].wordCount) {
      setIsDeletePopUp(true);
    } else {
      // state

      const [dataZusNew, removedListDZ] = hndlrRemoveList(dataZus, listOrder);
      setDataZus(dataZusNew);

      const dataLS = JSON.parse(localStorage.getItem('allLists'));
      const [dataLSNew, removedListLS] = hndlrRemoveList(dataLS, listOrder);
      // LS
      localStorage.setItem('allLists', JSON.stringify(dataLSNew));
      // DB
      debounceListsRefresh(dataLSNew, removedListLS);
    }
  };

  if (page === 'auth') {
    return null;
  } else if (!listNames) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        <Btnback />
        <div
          className={
            cssLoL.containerLol + ' ' + (page !== 'le' ? cssLoL.lol : cssLoL.le) + ' ' + opacity
          }
        >
          <ForkLoL />

          <div className={cssLoL.scrollFade}></div>

          <section
            className={cssLoL.scrollWrap + ' ' + (page !== 'le' ? 'scrollWrapOn' : 'scrollWrapOff')}
          >
            <ListOfList parrent={'lol'} hndlrButton={hndlrDeleteList}></ListOfList>

            {/* <List parrent={'lol'}></List> */}
          </section>
          {/* <section className={cssLoL.footer + ' footerColor'}></section> */}

          <DeletePopUp
            isDeletePopUp={isDeletePopUp}
            setIsDeletePopUp={setIsDeletePopUp}
            deletedListOrder={deletedListOrder}
          />
        </div>
      </>
    );
  }
}
