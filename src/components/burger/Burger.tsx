import { useUiState } from '../../zustand';

import cssBurger from './Burger.module.css';

export default function Burger({}: Props) {
  const { page, setPage } = useUiState();

  return (
    <button
      className={cssBurger.container + (page === 'auth' ? ' ' + 'off' : '')}
      onClick={() => setPage(page === 'menu' ? 'settings' : 'menu')}
    >
      <div className={`${cssBurger.line} ${cssBurger[page]} `}></div>
    </button>
  );
}
