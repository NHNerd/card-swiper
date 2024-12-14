import React from 'react';

import ListOfList from './components/listOfList/ListOfList.tsx';
import ForkLoL from './components/forkLol/ForkLoL.tsx';
import Btnback from '../../components/btnBack/Btnback.tsx';

import DeletePopUp from '../deletePopUp/DeletePopUp.tsx';

import { useUiState, zustandData } from '../../zustand.ts';
import hndlrRemoveList from './hndlrs/hndlrRemoveList.ts';
import { remove } from '../../axios/list.ts';
import debounce from '../../handlers/throttle.ts';

import '../../components/container.css';
import cssLoL from './LoL.module.css';

type Props = {
  scrollSectionLolRef: React.RefObject<HTMLElement>;
};
interface DataItem {
  id: number;
  name: string;
}

// wrapping "refreshing allLists in localstorage" into debounce
const debouncePutRefreshOrders = debounce(remove, 500);

export default function LoL({ scrollSectionLolRef }: Props) {
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

  const hndlrDeleteList = (listOrder: number) => {
    setDeletedListOrder(listOrder);

    if (dataZus[listOrder]?.wordCount > 0) {
      // if list have words open popup
      setIsDeletePopUp(true);
    } else {
      // else immediately delete

      // state
      const [dataZusNew] = hndlrRemoveList(dataZus, listOrder);
      setDataZus(dataZusNew);
      // LS
      const dataLS = JSON.parse(localStorage.getItem('card-swiper:allLists'));
      const [dataLSNew, removedListLS, updateOrder] = hndlrRemoveList(dataLS, listOrder);
      localStorage.setItem('card-swiper:allLists', JSON.stringify(dataLSNew));
      // LS Flag - not apdated(DB)
      const removedLists = JSON.parse(localStorage.getItem('card-swiper:removedLists')) || [];
      // Chek doublicats(only unique _id)
      if (!removedLists.some((item) => item._id === removedListLS._id)) {
        removedLists.push({ _id: removedListLS._id });
      }
      localStorage.setItem('card-swiper:removedLists', JSON.stringify(removedLists));
      // DB

      debouncePutRefreshOrders(removedListLS._id, updateOrder);
    }
  };

  if (page === 'auth') {
    return null;
    // } else if (!listNames) {
    //   return <div>Загрузка...</div>;
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
            ref={scrollSectionLolRef}
            id='scrollSectionLol'
            className={cssLoL.scrollWrap + ' ' + (page !== 'le' ? 'scrollWrapOn' : 'scrollWrapOff')}
          >
            <ListOfList
              scrollSectionLolRef={scrollSectionLolRef}
              parrent={'lol'}
              hndlrButton={hndlrDeleteList}
            ></ListOfList>

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
