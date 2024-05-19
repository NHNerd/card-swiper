import { useState } from 'react';

import Menu from './pages/menu/Menu.tsx';

import LoL from './pages/lol/LoL.tsx';
import Le from './pages/le/Le.tsx';
import Burger from './components/burger/Burger.tsx';

import cssAppTest from './AppTest.module.css';

function App() {
  return (
    <>
      <LoL />
      <Le />
      <Menu />
      <Burger />
    </>
  );
}

export default App;
