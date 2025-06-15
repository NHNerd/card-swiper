import React from 'react';
import { useUiState } from '../../zustand.ts';
import About from './components/about/About.tsx';
import Options from './components/options/Options.tsx';
import ForkSettings from './components/forkSettings/forkSettings.tsx';

import cssSettings from './Settings.module.css';

type Props = {
  setAllDateLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Settings({ setAllDateLoaded }: Props) {
  const { page, setPage } = useUiState();
  const [expandedOptn, setExpandedOptn] = React.useState<boolean>(false);

  // const hndlrLogout = () => {
  //   //* Хорошо было бы оставлять то что не смогло отправится на сервер
  //   //* Но тогда нужно переделывать логику сохранения этих врменных данных на LS добавляя туда userId,
  //   //* чтобы елси потом другой user зайдет чужой кещ кому надо по id полетел.
  //   localStorage.clear();
  //   setAllDateLoaded(false);

  //   setPage('auth');
  // };
  return (
    <>
      <section className={`${cssSettings.settingsBg} ${page === 'settings' ? '' : cssSettings.off}`}>
        <header className={cssSettings.header}>
          <About />
        </header>

        <main className={cssSettings.body}>
          <Options
            page={page}
            setAllDateLoaded={setAllDateLoaded}
            setPage={setPage}
            expandedOptn={expandedOptn}
            setExpandedOptn={setExpandedOptn}
          />
        </main>
        <footer className={`${cssSettings.footer} ${expandedOptn ? cssSettings.footerOff : ''}`}>
          <ForkSettings page={page} expandedOptn={expandedOptn} />
        </footer>
      </section>
    </>
  );
}
