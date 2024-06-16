import React from 'react';

import ListOfList from '../../components/listOfList/ListOfList.tsx';
// import List from './components/listLol/ListLoL.tsx';
import ForkLoL from './components/forkLol/ForkLoL.tsx';
import Btnback from '../../components/btnBack/Btnback.tsx';

import { useUiState } from '../../zustand.ts';
import '../../components/container.css';
import cssLoL from './LoL.module.css';

type Props = {};
interface DataItem {
  id: number;
  name: string;
}

export default function LoL({}: Props) {
  //Zustand
  const { page } = useUiState();

  const [opacity, setOpacity] = React.useState(cssLoL.opacity1);

  React.useEffect(() => {
    if (page === 'menu') {
      setOpacity(cssLoL.opacity0);
    } else {
      setTimeout(() => {
        setOpacity(cssLoL.opacity1);
      }, 250);
    }
  }, [page]);

  // console.log('Lol');
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

  if (!listNames) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Btnback />
      <div className={cssLoL.containerLol + ' ' + (page !== 'le' ? cssLoL.lol : cssLoL.le)}>
        <ForkLoL />

        <div className={cssLoL.scrollFade}></div>

        <section
          className={
            cssLoL.scrollWrap + ' ' + (page !== 'le' ? opacity + ' ' + 'scrollWrapOn' : 'scrollWrapOff')
          }
        >
          <ListOfList parrent={'lol'}></ListOfList>

          {/* <List parrent={'lol'}></List> */}
        </section>
        {/* <section className={cssLoL.footer + ' footerColor'}></section> */}
      </div>
    </>
  );
}
