import { useState } from 'react';

import Menu from './pages/menu/Menu.tsx';
import LoL from './pages/lol/LoL.tsx';
import Le from './pages/le/Le.tsx';
import Session from './pages/session/Session.tsx';
import Burger from './components/burger/Burger.tsx';
import { useUiState } from './zustand.ts';

import cssAppTest from './AppTest.module.css';

function App() {
  const { page, setPage } = useUiState();

  return (
    <>
      <Session />
      {page === 'session' ? null : (
        <>
          <LoL /> <Le />
        </>
      )}

      <Menu />
      <Burger />
    </>
  );
}

export default App;
