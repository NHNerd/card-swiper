import { useUiState } from '../../zustand';

import cssBurger from './Burger.module.css';

export default function Burger({}: Props) {
  const { page, setPage } = useUiState();

  return (
    <button className={cssBurger.container} onClick={() => setPage('menu')}>
      <div className={cssBurger.line}></div>
    </button>
  );
}
