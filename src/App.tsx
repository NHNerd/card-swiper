import Auth from './pages/auth/Auth.tsx';
import Menu from './pages/menu/Menu.tsx';
import LoL from './pages/lol/LoL.tsx';
import Le from './pages/le/Le.tsx';
import Session from './pages/session/Session.tsx';
import Settings from './pages/settings/Settings.tsx';
import Burger from './components/burger/Burger.tsx';

import { useUiState } from './zustand.ts';

import cssAppTest from './AppTest.module.css';

function App() {
  const { page, setPage } = useUiState();

  console.log(page);

  if (page === 'auth') return <Auth />;
  return (
    <>
      <Session />
      <LoL />
      <Le />
      <Menu />
      <Settings />
      <Burger />
    </>
  );
}

export default App;
