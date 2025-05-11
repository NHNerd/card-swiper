import React from 'react';

import Auth from './pages/auth/Auth.tsx';
import Menu from './pages/menu/Menu.tsx';
import LoL from './pages/lol/LoL.tsx';
import Le from './pages/le/Le.tsx';
import Session from './pages/session/Session.tsx';
import Settings from './pages/settings/Settings.tsx';
import Burger from './components/burger/Burger.tsx';
import Statistics from './pages/statistics/Statistics.tsx';

import { useUiState } from './zustand.ts';

import cssAppTest from './AppTest.module.css';

function App() {
  const { page } = useUiState();

  const scrollSectionLolRef = React.useRef<HTMLElement>(null);
  const scrollSectionLeRef = React.useRef<HTMLElement>(null);

  console.log('📕page: ', page);

  // refresh topScroll
  React.useEffect(() => {
    if (page === 'menu' && scrollSectionLolRef?.current) {
      scrollSectionLolRef?.current?.scrollTo({ top: 0 });
    }
    if ((page === 'lol' || page === 'menu') && scrollSectionLeRef?.current) {
      scrollSectionLeRef?.current?.scrollTo({ top: 0 });
    }
  }, [page, scrollSectionLolRef]);

  if (page === 'auth') return <Auth />;
  return (
    <>
      <Statistics />
      <Session />
      <LoL scrollSectionLolRef={scrollSectionLolRef} />
      <Le scrollSectionLeRef={scrollSectionLeRef} />
      <Menu />
      <Settings />
      <Burger />
    </>
  );
}

export default App;
