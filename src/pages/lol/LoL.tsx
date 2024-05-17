import React from 'react';

import Lists from '../../components/listLol/ListLoL.tsx';
import List from '../../components/listLol/ListLoL.tsx';
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

  //Zustand
  const { page } = useUiState();

  console.log(page);

  if (!listNames) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Btnback />
      <div className={cssLoL.containerLol + ' ' + (page == 'lol' ? cssLoL.lol : cssLoL.le)}>
        <ForkLoL />

        <div className={cssLoL.scrollFade}></div>

        <section
          className={cssLoL.scrollWrap + ' ' + (page == 'lol' ? 'scrollWrapOn' : 'scrollWrapOff')}
        >
          <List parrent={'lol'}></List>
        </section>
        {/* <section className={cssLoL.footer + ' footerColor'}></section> */}
      </div>
    </>
  );
}
