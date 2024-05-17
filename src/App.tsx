import { useState } from 'react';

import Menu from './pages/menu/Menu.tsx';

import LoL from './pages/lol/LoL.tsx';
import Le from './pages/le/Le.tsx';

import cssAppTest from './AppTest.module.css';

function App() {
  return (
    <>
      {/* <Menu /> */}
      {/* <LoL /> */}
      <div id={cssAppTest.testWarpLol}>
        <LoL />
        <Le />
      </div>
      <div id={cssAppTest.testWarpLe}>{<Le />}</div>
    </>
  );
}

export default App;
